(() => {
  const boot = () => {
    const body = document.body;
    const root = document.documentElement;
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    const mobileQuery = window.matchMedia('(max-width: 980px)');
    const compactLandscapeQuery = window.matchMedia('(max-width: 980px) and (max-height: 520px)');

    const closeMenu = () => {
      if (!navLinks || !menuBtn) return;
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    };

    const syncVisualViewportVars = () => {
      const viewport = window.visualViewport;
      const left = viewport?.offsetLeft || 0;
      const top = viewport?.offsetTop || 0;
      const width = viewport?.width || window.innerWidth;
      const height = viewport?.height || window.innerHeight;

      root.style.setProperty('--visible-vp-left', `${left}px`);
      root.style.setProperty('--visible-vp-top', `${top}px`);
      root.style.setProperty('--visible-vp-width', `${width}px`);
      root.style.setProperty('--visible-vp-height', `${height}px`);
    };

    const syncViewportClass = () => {
      body.classList.toggle('is-mobile-layout', mobileQuery.matches);
      body.classList.toggle('is-compact-landscape', compactLandscapeQuery.matches);
      if (!mobileQuery.matches) closeMenu();
      syncVisualViewportVars();
    };

    syncViewportClass();
    mobileQuery.addEventListener?.('change', syncViewportClass);
    compactLandscapeQuery.addEventListener?.('change', syncViewportClass);
    window.visualViewport?.addEventListener('resize', syncVisualViewportVars);
    window.visualViewport?.addEventListener('scroll', syncVisualViewportVars);
    window.addEventListener('orientationchange', syncVisualViewportVars);

    navLinks?.addEventListener('click', (event) => {
      if (!mobileQuery.matches) return;
      const target = event.target.closest('a, .nav-teacher-btn');
      if (target) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navLinks?.classList.contains('open')) {
        closeMenu();
        menuBtn?.focus();
      }
    });

    document.addEventListener('click', (event) => {
      if (!mobileQuery.matches || !navLinks?.classList.contains('open')) return;
      if (navLinks.contains(event.target) || menuBtn?.contains(event.target)) return;
      closeMenu();
    });

    const modalSelectors = ['#challengeModal', '#moduleModal', '#teacherModal', '#capstoneModal'];
    const modalNodes = modalSelectors.map(selector => document.querySelector(selector)).filter(Boolean);

    const syncModalState = () => {
      if (!mobileQuery.matches) {
        body.classList.remove('mobile-modal-open');
        body.style.removeProperty('overflow');
        return;
      }

      const anyOpen = modalNodes.some(node => node.classList.contains('show'));
      body.classList.toggle('mobile-modal-open', anyOpen);
      body.style.overflow = anyOpen ? 'hidden' : '';
    };

    const modalObserver = new MutationObserver(syncModalState);
    modalNodes.forEach(node => modalObserver.observe(node, { attributes: true, attributeFilter: ['class'] }));
    syncModalState();

    /*
      Compact landscape can expose a visual viewport that is smaller or shifted
      inside the layout viewport. Keep the same close button on the overlay, then
      anchor it to the visible viewport rather than to 100vw/layout coordinates.
    */
    const moduleModal = document.getElementById('moduleModal');
    const moduleClose = document.getElementById('moduleClose');
    const moduleCloseHome = moduleClose?.parentNode || null;
    const moduleCloseNext = moduleClose?.nextSibling || null;

    const positionCompactModuleClose = () => {
      if (!moduleClose || !compactLandscapeQuery.matches) return;
      const viewport = window.visualViewport;
      const visibleLeft = viewport?.offsetLeft || 0;
      const visibleTop = viewport?.offsetTop || 0;
      const visibleWidth = viewport?.width || window.innerWidth;
      const left = Math.max(8, visibleLeft + visibleWidth - 52);
      const top = Math.max(8, visibleTop + 12);

      moduleClose.style.setProperty('left', `${left}px`, 'important');
      moduleClose.style.setProperty('right', 'auto', 'important');
      moduleClose.style.setProperty('top', `${top}px`, 'important');
    };

    const clearCompactModuleClosePosition = () => {
      if (!moduleClose) return;
      moduleClose.style.removeProperty('left');
      moduleClose.style.removeProperty('right');
      moduleClose.style.removeProperty('top');
    };

    const syncCompactModuleClose = () => {
      if (!moduleModal || !moduleClose || !moduleCloseHome) return;

      if (compactLandscapeQuery.matches) {
        if (moduleClose.parentNode !== moduleModal) moduleModal.appendChild(moduleClose);
        moduleClose.classList.add('is-overlay-close');
        positionCompactModuleClose();
        return;
      }

      clearCompactModuleClosePosition();
      if (moduleClose.parentNode === moduleModal) {
        if (moduleCloseNext && moduleCloseNext.parentNode === moduleCloseHome) {
          moduleCloseHome.insertBefore(moduleClose, moduleCloseNext);
        } else {
          moduleCloseHome.appendChild(moduleClose);
        }
      }
      moduleClose.classList.remove('is-overlay-close');
    };

    syncCompactModuleClose();
    compactLandscapeQuery.addEventListener?.('change', syncCompactModuleClose);
    window.visualViewport?.addEventListener('resize', positionCompactModuleClose);
    window.visualViewport?.addEventListener('scroll', positionCompactModuleClose);

    /* Keep only the active step dot in view when the slideshow step changes. */
    const lessonContent = document.getElementById('moduleLessonContent');
    if (lessonContent) {
      const centerActiveDot = () => {
        if (!window.matchMedia('(max-width: 760px)').matches && !compactLandscapeQuery.matches) return;
        const activeDot = lessonContent.querySelector('.module-slide-dot.is-active');
        activeDot?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      };

      const lessonObserver = new MutationObserver((mutations) => {
        const dotChanged = mutations.some(mutation =>
          mutation.type === 'attributes' && mutation.target.classList?.contains('module-slide-dot')
        );
        if (dotChanged) centerActiveDot();
      });

      lessonObserver.observe(lessonContent, {
        subtree: true,
        attributes: true,
        attributeFilter: ['class']
      });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();

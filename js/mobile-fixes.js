(() => {
  const boot = () => {
    const body = document.body;
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    const mobileQuery = window.matchMedia('(max-width: 980px)');
    const compactLandscapeQuery = window.matchMedia('(max-width: 980px) and (max-height: 520px)');

    const closeMenu = () => {
      if (!navLinks || !menuBtn) return;
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    };

    const syncViewportClass = () => {
      body.classList.toggle('is-mobile-layout', mobileQuery.matches);
      body.classList.toggle('is-compact-landscape', compactLandscapeQuery.matches);
      if (!mobileQuery.matches) closeMenu();
    };

    syncViewportClass();
    mobileQuery.addEventListener?.('change', syncViewportClass);
    compactLandscapeQuery.addEventListener?.('change', syncViewportClass);

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
      Compact phone landscape has very little vertical space. Some browser hit-testing
      can place the lesson shell above the close control even when the X is visible.
      Move the SAME button onto the modal overlay while compact, then restore it on
      portrait/desktop. Existing click/focus listeners stay attached when a node moves.
    */
    const moduleModal = document.getElementById('moduleModal');
    const moduleClose = document.getElementById('moduleClose');
    const moduleCloseHome = moduleClose?.parentNode || null;
    const moduleCloseNext = moduleClose?.nextSibling || null;

    const syncCompactModuleClose = () => {
      if (!moduleModal || !moduleClose || !moduleCloseHome) return;

      if (compactLandscapeQuery.matches) {
        if (moduleClose.parentNode !== moduleModal) moduleModal.appendChild(moduleClose);
        moduleClose.classList.add('is-overlay-close');
        return;
      }

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

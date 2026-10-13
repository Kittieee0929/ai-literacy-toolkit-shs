(() => {
  const boot = () => {
    const body = document.body;
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    const mobileQuery = window.matchMedia('(max-width: 980px)');

    const closeMenu = () => {
      if (!navLinks || !menuBtn) return;
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    };

    const syncViewportClass = () => {
      body.classList.toggle('is-mobile-layout', mobileQuery.matches);
      if (!mobileQuery.matches) closeMenu();
    };

    syncViewportClass();
    mobileQuery.addEventListener?.('change', syncViewportClass);

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

    /* Keep the active slideshow dot visible on narrow screens. */
    const lessonContent = document.getElementById('moduleLessonContent');
    if (lessonContent) {
      const lessonObserver = new MutationObserver(() => {
        if (!window.matchMedia('(max-width: 760px)').matches) return;
        const activeDot = lessonContent.querySelector('.module-slide-dot.is-active');
        activeDot?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
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

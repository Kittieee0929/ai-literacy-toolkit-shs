(() => {
  const nav = document.getElementById('navLinks');
  if (!nav) return;

  const links = [...nav.querySelectorAll('a[href^="#"]')];
  if (!links.length) return;

  const storageKey = 'aiToolkitHeaderVisited';
  let visited = new Set();

  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (Array.isArray(saved)) visited = new Set(saved.filter(Boolean));
  } catch (_) {}

  const pageFromLink = (link) => (link.getAttribute('href') || '').replace(/^#/, '');

  const currentPage = () => {
    const bodyPage = document.body?.dataset?.activePage;
    if (bodyPage) return bodyPage;
    return (location.hash || '#home').replace(/^#/, '') || 'home';
  };

  const saveVisited = () => {
    try {
      localStorage.setItem(storageKey, JSON.stringify([...visited]));
    } catch (_) {}
  };

  const sync = (markCurrent = true) => {
    const current = currentPage();
    if (markCurrent && current) {
      visited.add(current);
      saveVisited();
    }

    links.forEach((link) => {
      const page = pageFromLink(link);
      const active = page === current;
      link.classList.toggle('active', active);
      link.classList.toggle('is-visited', visited.has(page));
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    const activeLink = links.find((link) => pageFromLink(link) === current);
    if (activeLink && window.matchMedia('(max-width: 1180px)').matches) {
      activeLink.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
    }
  };

  links.forEach((link) => {
    link.addEventListener('click', () => {
      const page = pageFromLink(link);
      if (page) {
        visited.add(page);
        saveVisited();
      }
      requestAnimationFrame(() => sync(false));
      setTimeout(() => sync(false), 80);
    });
  });

  const bodyObserver = new MutationObserver(() => sync());
  bodyObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ['data-active-page']
  });

  window.addEventListener('hashchange', () => sync());
  sync();
})();

/* A readable left navigation rail; page visits do not add badges. */
(() => {
  const nav = document.getElementById('navLinks');
  if (!nav) return;
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const sync = () => {
    const page = document.body.dataset.activePage || location.hash.slice(1) || 'home';
    links.forEach(link => {
      const active = link.hash === '#' + page;
      link.classList.toggle('active', active);
      link.classList.remove('is-visited');
      if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
    });
  };
  nav.addEventListener('keydown', event => {
    const index = links.indexOf(event.target);
    if (index < 0 || !['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? links.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length;
    links[next].focus();
  });
  new MutationObserver(sync).observe(document.body, {attributes:true, attributeFilter:['data-active-page']});
  window.addEventListener('hashchange', sync);
  sync();
})();

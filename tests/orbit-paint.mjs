import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage']
});

const context = await browser.newContext({ viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true });
const page = await context.newPage();
await page.goto('http://127.0.0.1:8000/', { waitUntil: 'networkidle' });
await page.waitForFunction(() => document.body.classList.contains('app-routing-ready'), null, { timeout: 5000 });
await page.waitForTimeout(400);
await page.click('.solar-planet[data-solar-page="guide"]', { timeout: 5000 });
await page.waitForFunction(() => document.body.dataset.activePage === 'guide', null, { timeout: 5000 });
await page.waitForTimeout(160);

const state = await page.evaluate(() => {
  const nav = document.getElementById('solarNav');
  const planet = nav.querySelector('.solar-planet[data-solar-page="guide"]');
  const core = nav.querySelector('.solar-core');
  const orbit = nav.querySelector('.solar-orbit');
  const styles = el => {
    const s = getComputedStyle(el);
    return {
      display: s.display,
      visibility: s.visibility,
      opacity: s.opacity,
      zIndex: s.zIndex,
      filter: s.filter,
      color: s.color,
      background: s.background,
      borderColor: s.borderColor,
      pointerEvents: s.pointerEvents,
      position: s.position
    };
  };
  return {
    bodyClass: document.body.className,
    activePage: document.body.dataset.activePage,
    navState: nav.dataset.state,
    nav: styles(nav),
    planet: styles(planet),
    core: styles(core),
    orbit: styles(orbit),
    mobileModalOpen: document.body.classList.contains('mobile-modal-open'),
    openModule: !!document.querySelector('.module-modal.show'),
    openTeacher: !!document.querySelector('.teacher-modal.show'),
    openCapstone: !!document.querySelector('.capstone-modal.show'),
    openGeneric: !!document.querySelector('.modal.show')
  };
});

console.log(JSON.stringify(state, null, 2));
const navVisible = state.nav.display !== 'none' && state.nav.visibility !== 'hidden' && Number(state.nav.opacity) > 0.5;
const planetVisible = state.planet.display !== 'none' && state.planet.visibility !== 'hidden' && Number(state.planet.opacity) > 0.5;
await browser.close();
if (!navVisible || !planetVisible) process.exit(1);

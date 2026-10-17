import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('mobile-qa-artifacts');
fs.mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: 'orbit-iphone-se-ish', width: 360, height: 740 },
  { name: 'orbit-iphone-14-ish', width: 390, height: 844 },
  { name: 'orbit-large-phone', width: 430, height: 932 },
  { name: 'orbit-phone-landscape', width: 844, height: 390 }
];

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage']
});

let failed = false;
const report = [];

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: true,
    hasTouch: true
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });

  await page.goto('http://127.0.0.1:8000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(250);

  const checks = [];
  const assert = (name, ok, detail = '') => {
    checks.push({ name, ok, detail });
    if (!ok) failed = true;
  };

  const topNav = await page.evaluate(() => ({
    duplicateLinksVisible: [...document.querySelectorAll('#navLinks > a')].some(a => getComputedStyle(a).display !== 'none'),
    teacherVisible: getComputedStyle(document.getElementById('teacherModeBtn')).display !== 'none',
    menuVisible: getComputedStyle(document.getElementById('menuBtn')).display !== 'none'
  }));
  assert('duplicate upper tabs are removed', !topNav.duplicateLinksVisible, JSON.stringify(topNav));
  assert('Teacher Mode remains available', topNav.teacherVisible, JSON.stringify(topNav));
  assert('old menu control is hidden', !topNav.menuVisible, JSON.stringify(topNav));

  await page.click('.solar-planet[data-solar-page="guide"]', { timeout: 5000 });
  await page.waitForTimeout(120);

  const orbit = await page.evaluate(() => {
    const nav = document.getElementById('solarNav');
    const r = nav.getBoundingClientRect();
    const vv = window.visualViewport;
    const offsetLeft = vv?.offsetLeft || 0;
    const offsetTop = vv?.offsetTop || 0;
    const width = vv?.width || window.innerWidth;
    const height = vv?.height || window.innerHeight;
    const planets = [...nav.querySelectorAll('.solar-planet[data-solar-page]')];
    const active = nav.querySelector('.solar-planet.is-active');

    const hitChecks = planets.map(planet => {
      const pr = planet.getBoundingClientRect();
      const x = pr.left + pr.width / 2;
      const y = pr.top + pr.height / 2;
      const hit = document.elementFromPoint(x, y);
      return {
        page: planet.dataset.solarPage,
        width: pr.width,
        height: pr.height,
        hit: hit === planet || planet.contains(hit)
      };
    });

    return {
      page: document.body.dataset.activePage,
      state: nav.dataset.state,
      position: getComputedStyle(nav).position,
      rect: { left:r.left, right:r.right, top:r.top, bottom:r.bottom, width:r.width, height:r.height },
      screenRect: {
        left:r.left - offsetLeft,
        right:r.right - offsetLeft,
        top:r.top - offsetTop,
        bottom:r.bottom - offsetTop,
        width:r.width,
        height:r.height
      },
      viewport: { width, height, offsetLeft, offsetTop },
      activePage: active?.dataset.solarPage || null,
      activeLabelOpacity: active?.querySelector('i') ? getComputedStyle(active.querySelector('i')).opacity : null,
      planetCount: planets.length,
      hitChecks
    };
  });

  const sr = orbit.screenRect;
  assert('Guide orbit tab routes correctly', orbit.page === 'guide' && orbit.activePage === 'guide', JSON.stringify(orbit));
  assert('orbit remains fixed circular navigation', orbit.state === 'docked' && orbit.position === 'fixed', JSON.stringify(orbit));
  assert('orbit is close to square', Math.abs(sr.width - sr.height) <= 4, JSON.stringify(sr));
  assert('orbit uses compact navigation size', sr.width <= 250 && sr.height <= 250, JSON.stringify(sr));
  assert('orbit fully fits visible screen', sr.left >= -1 && sr.top >= -1 && sr.right <= orbit.viewport.width + 1 && sr.bottom <= orbit.viewport.height + 1, `${JSON.stringify(sr)} viewport=${JSON.stringify(orbit.viewport)}`);
  assert('all seven orbit tabs are present', orbit.planetCount === 7, `count=${orbit.planetCount}`);
  assert('all orbit tabs have usable touch targets', orbit.hitChecks.every(x => x.width >= 28 && x.height >= 28 && x.hit), JSON.stringify(orbit.hitChecks));
  assert('current section label is visible', Number(orbit.activeLabelOpacity) > 0.8 || vp.height <= 520, `opacity=${orbit.activeLabelOpacity}`);
  assert('no browser errors', errors.length === 0, errors.join(' | '));

  await page.screenshot({ path: path.join(outDir, `${vp.name}-guide-orbit.png`), fullPage: false });
  report.push({ viewport: vp, topNav, orbit, errors, checks });
  await context.close();
}

await browser.close();
fs.writeFileSync(path.join(outDir, 'orbit-results.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report.map(r => ({ viewport:r.viewport, orbit:r.orbit, checks:r.checks })), null, 2));
if (failed) process.exit(1);

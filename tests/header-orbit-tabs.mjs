import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('mobile-qa-artifacts');
fs.mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: 'header-tabs-iphone-se', width: 360, height: 740 },
  { name: 'header-tabs-iphone-14', width: 390, height: 844 },
  { name: 'header-tabs-large-phone', width: 430, height: 932 },
  { name: 'header-tabs-landscape', width: 844, height: 390 },
  { name: 'header-tabs-desktop', width: 1440, height: 900 }
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
    isMobile: vp.width < 1000,
    hasTouch: vp.width < 1000
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });

  await page.goto('http://127.0.0.1:8000/', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.body.classList.contains('app-routing-ready'), null, { timeout: 5000 });
  await page.waitForTimeout(180);

  const checks = [];
  const assert = (name, ok, detail = '') => {
    checks.push({ name, ok, detail });
    if (!ok) failed = true;
  };

  const home = await page.evaluate(() => {
    const links = [...document.querySelectorAll('#navLinks > a')];
    const header = document.querySelector('.site-header');
    const nav = document.getElementById('navLinks');
    const teacher = document.getElementById('teacherModeBtn');
    const menu = document.getElementById('menuBtn');
    const solar = document.getElementById('solarNav');
    const rect = el => {
      const r = el?.getBoundingClientRect();
      return r ? { left:r.left, right:r.right, top:r.top, bottom:r.bottom, width:r.width, height:r.height } : null;
    };
    return {
      page: document.body.dataset.activePage,
      docWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
      viewportWidth: window.innerWidth,
      header: rect(header),
      nav: rect(nav),
      navOverflowX: nav ? getComputedStyle(nav).overflowX : null,
      linkCount: links.length,
      links: links.map(link => ({
        text: link.textContent.trim(),
        display: getComputedStyle(link).display,
        rect: rect(link),
        before: getComputedStyle(link, '::before').content,
        active: link.classList.contains('active'),
        current: link.getAttribute('aria-current')
      })),
      teacherVisible: !!teacher && getComputedStyle(teacher).display !== 'none',
      menuHidden: !!menu && getComputedStyle(menu).display === 'none',
      solarDisplay: solar ? getComputedStyle(solar).display : null,
      solarState: solar?.dataset.state || null
    };
  });

  assert('seven customized upper tabs are visible', home.linkCount === 7 && home.links.every(x => x.display !== 'none' && x.rect?.width >= 38 && x.rect?.height >= 30), JSON.stringify(home.links));
  assert('upper tabs expose orbit-style icons', home.links.every(x => x.before && x.before !== 'none' && x.before !== 'normal'), JSON.stringify(home.links.map(x => ({text:x.text,before:x.before}))));
  assert('Start is the active upper tab on Home', home.links.some(x => x.text === 'Start' && x.active && x.current === 'page'), JSON.stringify(home.links));
  assert('Teacher Mode remains available', home.teacherVisible, JSON.stringify(home));
  assert('old hamburger stays hidden', home.menuHidden, JSON.stringify(home));
  assert('Home still keeps the large solar map', home.solarDisplay !== 'none' && home.solarState === 'expanded', JSON.stringify(home));
  if (vp.width < 1000) {
    assert('mobile page has no horizontal body overflow', home.bodyWidth <= home.viewportWidth + 2 && home.docWidth <= home.viewportWidth + 2, `${home.bodyWidth}/${home.docWidth}/${home.viewportWidth}`);
  }

  await page.click('#navLinks > a[href="#guide"]', { timeout: 5000 });
  await page.waitForFunction(() => document.body.dataset.activePage === 'guide', null, { timeout: 5000 });
  await page.waitForTimeout(100);

  const guide = await page.evaluate(() => {
    const guideLink = document.querySelector('#navLinks > a[href="#guide"]');
    const homeLink = document.querySelector('#navLinks > a[href="#home"]');
    const solar = document.getElementById('solarNav');
    return {
      page: document.body.dataset.activePage,
      guideActive: guideLink?.classList.contains('active') || false,
      guideCurrent: guideLink?.getAttribute('aria-current') || null,
      guideVisited: guideLink?.classList.contains('is-visited') || false,
      homeVisited: homeLink?.classList.contains('is-visited') || false,
      solarDisplay: solar ? getComputedStyle(solar).display : null
    };
  });

  assert('upper Guide tab performs routing', guide.page === 'guide' && guide.guideActive && guide.guideCurrent === 'page', JSON.stringify(guide));
  assert('visited state is preserved in upper tabs', guide.guideVisited && guide.homeVisited, JSON.stringify(guide));
  assert('large orbit hides away from Home to avoid duplicate navigation', guide.solarDisplay === 'none', JSON.stringify(guide));

  await page.click('#navLinks > a[href="#modules"]', { timeout: 5000 });
  await page.waitForFunction(() => document.body.dataset.activePage === 'modules', null, { timeout: 5000 });
  await page.waitForTimeout(80);
  await page.evaluate(() => document.querySelector('.module-link[data-module="1"]')?.click());
  await page.waitForSelector('#moduleModal.show', { timeout: 5000 });

  const moduleFits = await page.evaluate(() => {
    const modal = document.getElementById('moduleModal');
    const shell = modal?.querySelector('.module-shell');
    const close = document.getElementById('moduleClose');
    const sr = shell?.getBoundingClientRect();
    const cr = close?.getBoundingClientRect();
    return {
      shell: sr ? { left:sr.left, right:sr.right, top:sr.top, bottom:sr.bottom } : null,
      close: cr ? { left:cr.left, right:cr.right, top:cr.top, bottom:cr.bottom, width:cr.width, height:cr.height } : null,
      width: window.innerWidth,
      height: window.innerHeight
    };
  });

  assert('module still fits after header redesign', !!moduleFits.shell && moduleFits.shell.left >= -1 && moduleFits.shell.right <= moduleFits.width + 1 && moduleFits.shell.top >= -1 && moduleFits.shell.bottom <= moduleFits.height + 1, JSON.stringify(moduleFits));
  assert('module close remains usable', !!moduleFits.close && moduleFits.close.width >= 32 && moduleFits.close.height >= 32 && moduleFits.close.left >= -1 && moduleFits.close.right <= moduleFits.width + 1, JSON.stringify(moduleFits));
  await page.click('#moduleClose');
  await page.waitForTimeout(60);

  await page.screenshot({ path: path.join(outDir, `${vp.name}-upper-orbit-tabs.png`), fullPage: false });
  assert('no browser errors', errors.length === 0, errors.join(' | '));

  report.push({ viewport: vp, home, guide, moduleFits, errors, checks });
  await context.close();
}

await browser.close();
fs.writeFileSync(path.join(outDir, 'header-orbit-tabs-results.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report.map(r => ({ viewport:r.viewport, checks:r.checks })), null, 2));
if (failed) process.exit(1);

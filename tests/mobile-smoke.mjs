import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('mobile-qa-artifacts');
fs.mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: 'iphone-se-ish', width: 360, height: 740 },
  { name: 'iphone-14-ish', width: 390, height: 844 },
  { name: 'large-phone', width: 430, height: 932 },
  { name: 'phone-landscape', width: 844, height: 390 }
];

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage']
});

const results = [];
let failed = false;

for (const vp of viewports) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', err => errors.push(`pageerror: ${err.message}`));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(`console: ${msg.text()}`); });

  await page.goto('http://127.0.0.1:8000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  const home = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    docWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
    header: (() => {
      const r = document.querySelector('.site-header')?.getBoundingClientRect();
      return r ? { left:r.left, right:r.right, top:r.top, bottom:r.bottom } : null;
    })(),
    mobileCssLoaded: !![...document.styleSheets].find(s => (s.href || '').includes('style.css')),
    mobileClass: document.body.classList.contains('is-mobile-layout')
  }));

  const checks = [];
  const assert = (name, ok, detail='') => {
    checks.push({ name, ok, detail });
    if (!ok) failed = true;
  };

  assert('no document horizontal overflow', home.docWidth <= vp.width + 2, `${home.docWidth} > ${vp.width}`);
  assert('no body horizontal overflow', home.bodyWidth <= vp.width + 2, `${home.bodyWidth} > ${vp.width}`);
  assert('header stays within viewport', !!home.header && home.header.left >= -1 && home.header.right <= vp.width + 1, JSON.stringify(home.header));
  assert('mobile helper activated', vp.width <= 980 ? home.mobileClass : true, `mobileClass=${home.mobileClass}`);

  // Mobile menu
  await page.click('#menuBtn');
  await page.waitForTimeout(120);
  const menu = await page.evaluate(() => {
    const el = document.querySelector('#navLinks');
    const r = el?.getBoundingClientRect();
    return el && r ? { open:el.classList.contains('open'), left:r.left, right:r.right, top:r.top, bottom:r.bottom, h:r.height } : null;
  });
  assert('menu opens', !!menu?.open, JSON.stringify(menu));
  assert('menu fits horizontally', !!menu && menu.left >= -1 && menu.right <= vp.width + 1, JSON.stringify(menu));
  await page.keyboard.press('Escape');

  // Module modal
  await page.evaluate(() => document.querySelector('.module-link[data-module="1"]')?.click());
  await page.waitForSelector('#moduleModal.show', { timeout: 5000 });
  await page.waitForTimeout(250);
  const moduleState = await page.evaluate(() => {
    const shell = document.querySelector('.module-shell');
    const r = shell?.getBoundingClientRect();
    const stepNav = document.querySelector('.module-step-nav');
    const dots = document.querySelector('.module-slide-dots');
    const lesson = document.querySelector('#moduleLessonContent');
    return {
      rect: r ? { left:r.left, right:r.right, top:r.top, bottom:r.bottom, width:r.width, height:r.height } : null,
      stepNavDisplay: stepNav ? getComputedStyle(stepNav).display : null,
      dotsOverflowX: dots ? getComputedStyle(dots).overflowX : null,
      lessonScrollWidth: lesson?.scrollWidth || 0,
      lessonClientWidth: lesson?.clientWidth || 0
    };
  });
  assert('module shell fits horizontally', !!moduleState.rect && moduleState.rect.left >= -1 && moduleState.rect.right <= vp.width + 1, JSON.stringify(moduleState.rect));
  assert('module lesson has no horizontal overflow', moduleState.lessonScrollWidth <= moduleState.lessonClientWidth + 2, `${moduleState.lessonScrollWidth}/${moduleState.lessonClientWidth}`);
  if (vp.width <= 760) assert('duplicate module side nav hidden on phone', moduleState.stepNavDisplay === 'none', `display=${moduleState.stepNavDisplay}`);
  await page.screenshot({ path: path.join(outDir, `${vp.name}-module.png`), fullPage: false });
  await page.click('#moduleClose');
  await page.waitForTimeout(100);

  // Decision Lab modal
  await page.evaluate(() => document.querySelector('#challengeBtn')?.click());
  await page.waitForSelector('#challengeModal.show', { timeout: 5000 });
  await page.waitForTimeout(150);
  const decision = await page.evaluate(() => {
    const box = document.querySelector('#challengeModal .modal-content');
    const r = box?.getBoundingClientRect();
    return r ? { left:r.left, right:r.right, top:r.top, bottom:r.bottom, width:r.width, height:r.height } : null;
  });
  assert('Decision Lab modal fits horizontally', !!decision && decision.left >= -1 && decision.right <= vp.width + 1, JSON.stringify(decision));
  await page.screenshot({ path: path.join(outDir, `${vp.name}-decision.png`), fullPage: false });
  await page.click('#modalClose');

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: path.join(outDir, `${vp.name}-home.png`), fullPage: true });

  assert('no browser console/page errors', errors.length === 0, errors.join(' | '));
  results.push({ viewport: vp, home, menu, moduleState, decision, errors, checks });
  await context.close();
}

await browser.close();
fs.writeFileSync(path.join(outDir, 'results.json'), JSON.stringify(results, null, 2));
console.log(JSON.stringify(results.map(r => ({ viewport:r.viewport, checks:r.checks, errors:r.errors })), null, 2));
if (failed) process.exit(1);

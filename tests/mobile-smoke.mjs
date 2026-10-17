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

  const home = await page.evaluate(() => {
    const getRect = el => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { left:r.left, right:r.right, top:r.top, bottom:r.bottom, width:r.width, height:r.height };
    };
    const hero = document.querySelector('#home');
    const ribbon = document.querySelector('.hero-ribbon');
    const visual = document.querySelector('.hero-visual-zone');
    const footer = document.querySelector('footer');
    const solar = document.querySelector('#solarNav');
    return {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      visualViewportWidth: window.visualViewport?.width || window.innerWidth,
      visualViewportHeight: window.visualViewport?.height || window.innerHeight,
      visualViewportOffsetLeft: window.visualViewport?.offsetLeft || 0,
      visualViewportOffsetTop: window.visualViewport?.offsetTop || 0,
      docWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
      docHeight: document.documentElement.scrollHeight,
      header: getRect(document.querySelector('.site-header')),
      hero: getRect(hero),
      heroComputed: hero ? { minHeight:getComputedStyle(hero).minHeight, height:getComputedStyle(hero).height, paddingTop:getComputedStyle(hero).paddingTop, paddingBottom:getComputedStyle(hero).paddingBottom } : null,
      heroCopy: getRect(document.querySelector('.hero-copy')),
      visual: getRect(visual),
      ribbon: getRect(ribbon),
      ribbonComputed: ribbon ? { position:getComputedStyle(ribbon).position, marginTop:getComputedStyle(ribbon).marginTop, bottom:getComputedStyle(ribbon).bottom } : null,
      footer: getRect(footer),
      solar: getRect(solar),
      mobileClass: document.body.classList.contains('is-mobile-layout')
    };
  });

  const cssWidth = home.innerWidth;
  const visibleLeft = home.visualViewportOffsetLeft;
  const visibleTop = home.visualViewportOffsetTop;
  const visibleRight = visibleLeft + home.visualViewportWidth;
  const visibleBottom = visibleTop + home.visualViewportHeight;
  const compact = vp.width <= 760 || vp.height <= 520;
  const compactLandscape = vp.height <= 520;
  const checks = [];
  const assert = (name, ok, detail='') => {
    checks.push({ name, ok, detail });
    if (!ok) failed = true;
  };

  assert('no document horizontal overflow', home.docWidth <= cssWidth + 2, `${home.docWidth} > ${cssWidth}`);
  assert('no body horizontal overflow', home.bodyWidth <= cssWidth + 2, `${home.bodyWidth} > ${cssWidth}`);
  assert('header stays inside visible viewport', !!home.header && home.header.left >= visibleLeft - 1 && home.header.right <= visibleRight + 1, `${JSON.stringify(home.header)} visible=${visibleLeft}-${visibleRight}`);
  assert('mobile helper activated', cssWidth <= 980 ? home.mobileClass : true, `mobileClass=${home.mobileClass}`);

  if (compact) {
    const gap = home.ribbon && home.visual ? home.ribbon.top - home.visual.bottom : 0;
    assert('home has no excessive dead gap before ribbon', gap <= 180, `gap=${gap}px; visual=${JSON.stringify(home.visual)} ribbon=${JSON.stringify(home.ribbon)} hero=${JSON.stringify(home.hero)} computed=${JSON.stringify(home.heroComputed)}`);
  }

  await page.click('#menuBtn');
  await page.waitForTimeout(120);
  const menu = await page.evaluate(() => {
    const el = document.querySelector('#navLinks');
    const r = el?.getBoundingClientRect();
    return el && r ? { open:el.classList.contains('open'), left:r.left, right:r.right, top:r.top, bottom:r.bottom, h:r.height } : null;
  });
  assert('menu opens', !!menu?.open, JSON.stringify(menu));
  assert('menu fits visible viewport', !!menu && menu.left >= visibleLeft - 1 && menu.right <= visibleRight + 1, `${JSON.stringify(menu)} visible=${visibleLeft}-${visibleRight}`);
  await page.keyboard.press('Escape');

  await page.evaluate(() => document.querySelector('.module-link[data-module="1"]')?.click());
  await page.waitForSelector('#moduleModal.show', { timeout: 5000 });
  await page.waitForTimeout(250);
  const moduleState = await page.evaluate(() => {
    const shell = document.querySelector('.module-shell');
    const r = shell?.getBoundingClientRect();
    const stepNav = document.querySelector('.module-step-nav');
    const dots = document.querySelector('.module-slide-dots');
    const lesson = document.querySelector('#moduleLessonContent');
    const close = document.getElementById('moduleClose');
    const cr = close?.getBoundingClientRect();
    const vv = window.visualViewport;
    let closeHit = null;
    let closeOwnsHit = false;
    if (close && cr) {
      const x = cr.left + cr.width / 2;
      const y = cr.top + cr.height / 2;
      const hit = document.elementFromPoint(x, y);
      const cs = getComputedStyle(close);
      const shellStyle = shell ? getComputedStyle(shell) : null;
      const offsetLeft = vv?.offsetLeft || 0;
      const offsetTop = vv?.offsetTop || 0;
      const visualWidth = vv?.width || window.innerWidth;
      const visualHeight = vv?.height || window.innerHeight;
      const screenRect = {
        left: cr.left - offsetLeft,
        right: cr.right - offsetLeft,
        top: cr.top - offsetTop,
        bottom: cr.bottom - offsetTop,
        width: cr.width,
        height: cr.height
      };
      closeOwnsHit = hit === close || close.contains(hit);
      closeHit = {
        rect: { left:cr.left, right:cr.right, top:cr.top, bottom:cr.bottom, width:cr.width, height:cr.height },
        screenRect,
        center: { x, y },
        touchCenter: { x: x - offsetLeft, y: y - offsetTop },
        visualViewport: { offsetLeft, offsetTop, width:visualWidth, height:visualHeight },
        fullyVisible: screenRect.left >= 0 && screenRect.top >= 0 && screenRect.right <= visualWidth && screenRect.bottom <= visualHeight,
        hitTag: hit?.tagName || null,
        hitId: hit?.id || null,
        hitClass: typeof hit?.className === 'string' ? hit.className : null,
        parentTag: close.parentElement?.tagName || null,
        parentId: close.parentElement?.id || null,
        position: cs.position,
        zIndex: cs.zIndex,
        pointerEvents: cs.pointerEvents,
        display: cs.display,
        visibility: cs.visibility,
        opacity: cs.opacity,
        shellPosition: shellStyle?.position || null,
        shellZIndex: shellStyle?.zIndex || null
      };
    }
    return {
      rect: r ? { left:r.left, right:r.right, top:r.top, bottom:r.bottom, width:r.width, height:r.height } : null,
      stepNavDisplay: stepNav ? getComputedStyle(stepNav).display : null,
      dotsOverflowX: dots ? getComputedStyle(dots).overflowX : null,
      lessonScrollWidth: lesson?.scrollWidth || 0,
      lessonClientWidth: lesson?.clientWidth || 0,
      closeHit,
      closeOwnsHit
    };
  });
  assert('module shell fits visible viewport', !!moduleState.rect && moduleState.rect.left >= visibleLeft - 1 && moduleState.rect.right <= visibleRight + 1 && moduleState.rect.top >= visibleTop - 1 && moduleState.rect.bottom <= visibleBottom + 1, `${JSON.stringify(moduleState.rect)} visible=${visibleLeft},${visibleTop}-${visibleRight},${visibleBottom}`);
  assert('module lesson has no horizontal overflow', moduleState.lessonScrollWidth <= moduleState.lessonClientWidth + 2, `${moduleState.lessonScrollWidth}/${moduleState.lessonClientWidth}`);
  if (compact) assert('duplicate module side nav hidden in compact layout', moduleState.stepNavDisplay === 'none', `display=${moduleState.stepNavDisplay}`);
  assert('module close owns its DOM hit target', moduleState.closeOwnsHit, JSON.stringify(moduleState.closeHit));
  assert('module close is fully inside visible viewport', !!moduleState.closeHit?.fullyVisible, JSON.stringify(moduleState.closeHit));
  await page.screenshot({ path: path.join(outDir, `${vp.name}-module.png`), fullPage: false });

  let closeActionWorked = false;
  try {
    if (compactLandscape && moduleState.closeHit?.touchCenter) {
      await page.touchscreen.tap(moduleState.closeHit.touchCenter.x, moduleState.closeHit.touchCenter.y);
    } else {
      await page.click('#moduleClose', { timeout: 5000 });
    }
    await page.waitForTimeout(120);
    closeActionWorked = !(await page.locator('#moduleModal').evaluate(el => el.classList.contains('show')));
  } catch (err) {
    assert('module close responds to user input', false, err.message);
    await page.evaluate(() => document.getElementById('moduleClose')?.click());
    await page.waitForTimeout(100);
  }
  assert('module closes after user input', closeActionWorked || !(await page.locator('#moduleModal').evaluate(el => el.classList.contains('show'))), JSON.stringify(moduleState.closeHit));

  await page.evaluate(() => document.querySelector('#challengeBtn')?.click());
  await page.waitForSelector('#challengeModal.show', { timeout: 5000 });
  await page.waitForTimeout(150);
  const decision = await page.evaluate(() => {
    const box = document.querySelector('#challengeModal .modal-content');
    const r = box?.getBoundingClientRect();
    return r ? { left:r.left, right:r.right, top:r.top, bottom:r.bottom, width:r.width, height:r.height } : null;
  });
  assert('Decision Lab modal fits visible viewport', !!decision && decision.left >= visibleLeft - 1 && decision.right <= visibleRight + 1 && decision.top >= visibleTop - 1 && decision.bottom <= visibleBottom + 1, `${JSON.stringify(decision)} visible=${visibleLeft},${visibleTop}-${visibleRight},${visibleBottom}`);
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
console.log(JSON.stringify(results.map(r => ({ viewport:r.viewport, moduleClose:r.moduleState.closeHit, checks:r.checks, errors:r.errors })), null, 2));
if (failed) process.exit(1);

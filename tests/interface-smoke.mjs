import { chromium } from 'playwright-core';
import fs from 'node:fs';

const output = 'mobile-qa-artifacts';
fs.mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const viewports = [{ width: 360, height: 740 }, { width: 390, height: 844 }, { width: 430, height: 932 }, { width: 844, height: 390 }, { width: 1440, height: 900 }];
const results = [];
let failed = false;
try {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport, isMobile: viewport.width < 1000, hasTouch: viewport.width < 1000 });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const checks = [];
    const check = (name, ok, detail) => { checks.push({ name, ok, detail }); if (!ok) failed = true; };
    const navigate = async hash => {
      if (!(await page.locator(`#navLinks > a[href="${hash}"]`).isVisible())) await page.locator('#menuBtn').click();
      await page.locator(`#navLinks > a[href="${hash}"]`).click();
      await page.waitForFunction(route => document.body.dataset.activePage === route, hash.slice(1));
    };
    await page.goto('http://127.0.0.1:8000/', { waitUntil: 'networkidle' });
    await page.waitForSelector('body.app-routing-ready');
    const home = await page.evaluate(() => ({ width: innerWidth, docWidth: document.documentElement.scrollWidth, bodyWidth: document.body.scrollWidth }));
    check('home fits viewport', home.docWidth <= home.width + 2 && home.bodyWidth <= home.width + 2, home);
    if (viewport.width <= 960) await page.locator('#menuBtn').click();
    const links = page.locator('#navLinks > a');
    check('all seven pages are accessible', await links.count() === 7 && (await links.all()).length === 7 && await links.nth(6).isVisible());
    await page.locator('#navLinks > a[href="#guide"]').click();
    await page.waitForFunction(() => document.body.dataset.activePage === 'guide');
    check('Guide exposes active route', await page.locator('#navLinks > a[href="#guide"]').getAttribute('aria-current') === 'page');
    await navigate('#modules');
    await page.locator('#studioModuleSearch').fill('privacy');
    check('search finds only Data Privacy', await page.locator('#modules .module-card:visible').count() === 1 && await page.locator('#module-5').isVisible());
    await page.locator('#studioModuleSearch').fill('zz-no-matching-module');
    check('no-result search is explained', (await page.locator('.studio-search-count').innerText()).includes('No modules found'));
    await page.getByRole('button', { name: 'Clear module search' }).click();
    check('clear restores all seven modules', await page.locator('#modules .module-card:visible').count() === 7);
    await page.locator('.module-link[data-module="1"]').click();
    await page.waitForSelector('#moduleModal.show .module-slide.is-active');
    const lesson = await page.evaluate(() => {
      const shell = document.querySelector('.module-shell').getBoundingClientRect();
      const close = document.querySelector('#moduleClose').getBoundingClientRect();
      const content = document.querySelector('#moduleLessonContent');
      const hit = document.elementFromPoint(close.left + close.width / 2, close.top + close.height / 2);
      return { width: innerWidth, height: innerHeight, shell: { left: shell.left, right: shell.right, top: shell.top, bottom: shell.bottom }, closeWorks: Boolean(hit?.closest('#moduleClose')), overflow: content.scrollWidth - content.clientWidth };
    });
    check('lesson fits viewport', lesson.shell.left >= -1 && lesson.shell.right <= lesson.width + 1 && lesson.shell.top >= -1 && lesson.shell.bottom <= lesson.height + 1 && lesson.overflow <= 2, lesson);
    check('lesson close can be reached', lesson.closeWorks, lesson);
    await page.locator('#moduleClose').click();
    await navigate('#home');
    await page.locator('#studioTextToggle').click();
    check('larger text can be enabled', await page.locator('#studioTextToggle').getAttribute('aria-pressed') === 'true');
    await page.locator('#studioTextToggle').click();
    await page.locator('#heroChallengeBtn').click();
    check('new case requires diagnosis', await page.locator('#challengeAnswers button:enabled').count() === 0 && await page.locator('#nextChallenge').isDisabled());
    await page.getByRole('button', { name: 'Capability limits + human judgment', exact: true }).click();
    await page.getByRole('button', { name: 'Explain that fluent output can come from learned patterns and prediction, so human-like wording does not prove human understanding.', exact: true }).click();
    await page.waitForSelector('.lab-consequence-panel:not([hidden])');
    check('responsible answer gets feedback', (await page.locator('#answerFeedback').innerText()).includes('Good decision'));
    await page.locator('#nextChallenge').click();
    check('next case requires its own diagnosis', await page.locator('#challengeAnswers button:enabled').count() === 0 && await page.locator('#nextChallenge').isDisabled());
    await page.locator('#modalClose').click();
    await page.screenshot({ path: `${output}/${viewport.width}x${viewport.height}-home.png` });
    check('no page errors', errors.length === 0, errors);
    results.push({ viewport, checks });
    await context.close();
  }
} finally {
  await browser.close();
  fs.writeFileSync(`${output}/interface-results.json`, JSON.stringify(results, null, 2));
}
console.log(JSON.stringify(results, null, 2));
if (failed) process.exitCode = 1;

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
    if (!(await page.locator('#navLinks > a[href="#guide"]').isVisible())) await page.locator('#menuBtn').click();
    check('original space background is visible', await page.locator('.ambient-scene').isVisible());
    check('original solar map is visible on Home', await page.locator('#solarNav').isVisible());
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
    await page.waitForSelector('#moduleModal.show .simple-panel:not([hidden])');
    check('lesson has exactly four sections', await page.locator('.module-step-nav [data-simple-step]').count() === 4);
    const stageNames = ['Discussion', 'Real-Life Scenarios', 'Quiz', 'Assessment'];
    for (let index = 0; index < stageNames.length; index++) {
      await page.locator(`[data-simple-step="${index}"]`).click();
      check(`${stageNames[index]} opens directly`, await page.locator('.simple-panel:visible > h3').innerText() === stageNames[index]);
      check(`${stageNames[index]} is the only active menu item`, await page.locator('.module-step-nav [aria-current="step"]').count() === 1 && await page.locator(`[data-simple-step="${index}"]`).getAttribute('aria-current') === 'step');
    }
    await page.locator('[data-simple-step="0"]').click();
    check('discussion is expanded', (await page.locator('#simple-stage-discussion').innerText()).split(/\s+/).length >= 1100);
    check('video and YouTube link are retained', await page.locator('video[controls]').count() === 1 && (await page.locator('.video-credit a').getAttribute('href')).includes('youtube.com/watch?v='));
    await page.locator('[data-simple-step="1"]').click();
    check('three real-life scenarios', await page.locator('.simple-scenario').count() === 3);
    await page.locator('[data-simple-step="2"]').click();
    await page.locator('input[name="quiz-0"][value="1"]').check();
    check('quiz gives immediate feedback', (await page.locator('.simple-quiz .simple-question-feedback:visible').innerText()).startsWith('Correct.'));
    await page.getByRole('button', { name: 'Next: Assessment →', exact: true }).click();
    check('Next and side menu agree', await page.locator('[data-simple-step="3"]').getAttribute('aria-current') === 'step' && await page.locator('.module-step-nav [aria-current="step"]').count() === 1);
    await page.getByRole('button', { name: 'Submit assessment', exact: true }).click();
    check('missing answers are explained', (await page.locator('.simple-assessment-result').innerText()).includes('Choose an answer for each'));
    for (let index = 0; index < 3; index++) await page.locator(`input[name="assessment-${index}"][value="0"]`).check();
    await page.getByRole('button', { name: 'Submit assessment', exact: true }).click();
    check('incorrect answers receive feedback and can be retried', await page.locator('.simple-assessment .simple-question-feedback:visible').count() === 3 && !(await page.locator('.simple-completion').isVisible()));
    for (const [index, answer] of [2, 0, 1].entries()) await page.locator(`input[name="assessment-${index}"][value="${answer}"]`).check();
    await page.getByRole('button', { name: 'Submit assessment', exact: true }).click();
    await page.getByRole('button', { name: 'Complete lesson', exact: true }).click();
    check('successful assessment completes the module', await page.getByRole('button', { name: '✓ Lesson completed', exact: true }).isDisabled());
    await page.locator('[data-simple-step="0"]').click();
    const lesson = await page.evaluate(() => {
      const shell = document.querySelector('.module-shell').getBoundingClientRect();
      const close = document.querySelector('#moduleClose').getBoundingClientRect();
      const content = document.querySelector('#moduleLessonContent');
      const hit = document.elementFromPoint(close.left + close.width / 2, close.top + close.height / 2);
      return { width: innerWidth, height: innerHeight, shell: { left: shell.left, right: shell.right, top: shell.top, bottom: shell.bottom }, closeWorks: Boolean(hit?.closest('#moduleClose')), overflow: content.scrollWidth - content.clientWidth };
    });
    check('lesson fits viewport', lesson.shell.left >= -1 && lesson.shell.right <= lesson.width + 1 && lesson.shell.top >= -1 && lesson.shell.bottom <= lesson.height + 1 && lesson.overflow <= 2, lesson);
    check('lesson close can be reached', lesson.closeWorks, lesson);
    await page.screenshot({ path: `${output}/${viewport.width}x${viewport.height}-discussion.png` });
    await page.locator('#moduleClose').click();
    await navigate('#progress');
    check('completion updates the passport', (await page.locator('#progressTitle').innerText()).includes('1 of 7'));
    await page.locator('[data-progress-module="1"]').click();
    await page.locator('[data-simple-step="3"]').click();
    check('practice answers survive closing and reopening', await page.locator('input[name="assessment-0"][value="2"]').isChecked() && await page.locator('input[name="assessment-1"][value="0"]').isChecked() && await page.locator('input[name="assessment-2"][value="1"]').isChecked());
    await page.locator('[data-simple-step="3"]').press('ArrowUp');
    check('section menu works with the keyboard', await page.locator('[data-simple-step="2"]').getAttribute('aria-current') === 'step');
    await page.locator('#moduleClose').click();
    if (viewport.width >= 1000) {
      for (let module = 2; module <= 7; module++) {
        await page.locator(`[data-progress-module="${module}"]`).click();
        for (let index = 0; index < 4; index++) {
          await page.locator(`[data-simple-step="${index}"]`).click();
          check(`Module ${module}: ${stageNames[index]} opens`, await page.locator('.simple-panel:visible > h3').innerText() === stageNames[index] && await page.locator('.module-step-nav [aria-current="step"]').count() === 1);
        }
        check(`Module ${module}: three assessment questions`, await page.locator('.simple-assessment .simple-question').count() === 3);
        await page.locator('[data-simple-step="0"]').click();
        check(`Module ${module}: expanded discussion`, (await page.locator('#simple-stage-discussion').innerText()).split(/\s+/).length >= 1100);
        await page.locator('#moduleClose').click();
      }
    }
    await navigate('#about');
    check('About page is restored', await page.locator('#about .about-copy').isVisible());
    check('developer is credited', (await page.locator('#about .research-card').innerText()).includes('Aerojohn Joshua G. Pancho'));
    await navigate('#resources');
    check('Resources and glossary are restored', await page.locator('#resources').isVisible() && await page.locator('#glossary').isVisible());
    check('resource links remain available', await page.locator('#resources a[href^="https://"]').count() >= 5);
    if (!(await page.locator('#teacherModeBtn').isVisible())) await page.locator('#menuBtn').click();
    await page.locator('#teacherModeBtn').click();
    check('Teacher Mode opens', await page.locator('#teacherModal.show').isVisible());
    await page.keyboard.press('Escape');
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


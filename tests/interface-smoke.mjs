import {chromium} from 'playwright-core';
import fs from 'node:fs';
const output='mobile-qa-artifacts';fs.mkdirSync(output,{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/usr/bin/google-chrome',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const viewports=[{width:360,height:740},{width:390,height:844},{width:430,height:932},{width:844,height:390},{width:1440,height:900}];
const results=[];let failed=false;
try{
 for(const viewport of viewports){
  const context=await browser.newContext({viewport,isMobile:viewport.width<1000,hasTouch:viewport.width<1000});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));const checks=[];
  const check=(name,ok,detail)=>{checks.push({name,ok,detail});if(!ok)failed=true;};
  const nav=async route=>{await page.locator(`#navLinks a[href="#${route}"]`).click();await page.waitForFunction(r=>document.body.dataset.page===r,route);};
  const stage=async n=>{await page.locator(`[data-simple-step="${n}"]`).click();};
  const fits=()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2&&document.body.scrollWidth<=innerWidth+2);
  try{
   await page.goto('http://127.0.0.1:8000/',{waitUntil:'domcontentloaded'});
   await page.waitForSelector('.plain-lesson-card',{state:'attached'});
   check('home fits viewport',await fits());
   check('original space background is visible',await page.locator('.ambient-scene').isVisible());
   check('only three always-visible navigation links',await page.locator('#navLinks a:visible').count()===3);
   check('developer credit is present',(await page.locator('.plain-footer').innerText()).includes('Aerojohn Joshua G. Pancho'));
   await page.screenshot({path:`${output}/${viewport.width}x${viewport.height}-home.png`});
   await nav('lessons');check('lessons fit viewport',await fits());
   check('all seven lessons visible',await page.locator('.plain-lesson-card:visible').count()===7);
   await page.locator('#lessonSearch').fill('Checking Sources');
   check('search finds the requested lesson',await page.locator('.plain-lesson-card:visible').count()===1&&await page.locator('[data-lesson="3"]').isVisible());
   await page.locator('#lessonSearch').fill('zz-nothing');check('empty search is explained',(await page.locator('#searchStatus').innerText()).includes('No lessons found'));
   await page.locator('#clearSearch').click();
   await page.locator('#lessonCards [data-open-lesson="1"]').click();
   await page.waitForSelector('#moduleModal.show');
   const names=['Discussion','Real-Life Scenarios','Quiz','Assessment'];
   for(let i=0;i<4;i++){
    await stage(i);check(`${names[i]} opens directly`,(await page.locator('.simple-panel:visible>h3').innerText())===names[i]&&await page.locator('.module-step-nav [aria-current="step"]').count()===1);
   }
   await stage(0);
   check('detailed discussion exceeds 1100 words',(await page.locator('#simple-stage-discussion').innerText()).split(/\s+/).length>=1100);
   check('video has native controls and no autoplay',await page.locator('video').evaluate(v=>v.controls&&!v.autoplay&&v.preload==='none'&&v.src.includes('contentful-videos.code.org')));
   check('YouTube alternative is linked',(await page.locator('.video-credit a').getAttribute('href')).includes('youtube.com/watch?v='));
   await stage(1);check('three real-life examples',await page.locator('#simple-stage-scenarios .simple-scenario').count()===3);
   check('leaving discussion pauses the video',await page.locator('video').evaluate(v=>v.paused));
   await stage(2);await page.locator('input[name="quiz-0"][value="1"]').check();
   check('quiz feedback is immediate',(await page.locator('.simple-quiz .simple-question-feedback:visible').innerText()).startsWith('Correct.'));
   await stage(3);await page.getByRole('button',{name:'Submit assessment',exact:true}).click();
   check('missing answers are explained',(await page.locator('.simple-assessment-result').innerText()).includes('Choose an answer'));
   for(let i=0;i<3;i++)await page.locator(`input[name="assessment-${i}"][value="0"]`).check();
   await page.getByRole('button',{name:'Submit assessment',exact:true}).click();
   check('incorrect assessment cannot complete a lesson',!(await page.getByRole('button',{name:'Complete lesson',exact:true}).isVisible()));
   for(const [i,answer]of[2,0,1].entries())await page.locator(`input[name="assessment-${i}"][value="${answer}"]`).check();
   await page.getByRole('button',{name:'Submit assessment',exact:true}).click();
   await page.getByRole('button',{name:'Complete lesson',exact:true}).click();
   check('assessment unlocks completion',await page.getByRole('button',{name:'✓ Lesson completed',exact:true}).isDisabled());
   await stage(0);
   const dimensions=await page.evaluate(()=>{const s=document.querySelector('.module-shell').getBoundingClientRect(),c=document.querySelector('#moduleClose').getBoundingClientRect(),content=document.querySelector('#moduleLessonContent');return {fits:s.left>=-1&&s.right<=innerWidth+1&&s.top>=-1&&s.bottom<=innerHeight+1&&content.scrollWidth<=content.clientWidth+2,close:!!document.elementFromPoint(c.left+c.width/2,c.top+c.height/2)?.closest('#moduleClose')};});
   check('lesson fits viewport',dimensions.fits);check('close button is reachable',dimensions.close);
   await page.screenshot({path:`${output}/${viewport.width}x${viewport.height}-discussion.png`});
   await page.locator('#moduleClose').click();await nav('progress');
   check('progress fits viewport',await fits());check('completion is saved',(await page.locator('#progressTitle').innerText()).includes('1 of 7'));
   await page.locator('#progressLessons [data-open-lesson="1"]').click();await stage(3);
   check('assessment answers survive reopening',await page.locator('input[name="assessment-0"][value="2"]').isChecked());
   await page.locator('[data-simple-step="3"]').press('ArrowUp');
   check('keyboard section navigation works',await page.locator('[data-simple-step="2"]').getAttribute('aria-current')==='step');
   await page.locator('#moduleClose').press('Enter');
   if(viewport.width>=1000){
    for(let lesson=2;lesson<=7;lesson++){
     await page.locator(`#progressLessons [data-open-lesson="${lesson}"]`).click();
     for(let i=0;i<4;i++){await stage(i);check(`Lesson ${lesson}: ${names[i]} opens`,(await page.locator('.simple-panel:visible>h3').innerText())===names[i]);}
     check(`Lesson ${lesson}: separate quiz and assessment`,await page.locator('.simple-quiz .simple-question').count()===3&&await page.locator('.simple-assessment .simple-question').count()===3);
     await page.locator('#moduleClose').click();
    }
   }
   page.once('dialog',d=>d.dismiss());await page.locator('#resetProgress').click();
   check('cancel reset preserves progress',(await page.locator('#progressTitle').innerText()).includes('1 of 7'));
   await nav('home');await page.locator('#textSizeButton').click();check('larger text is available',await page.locator('#textSizeButton').getAttribute('aria-pressed')==='true');
   await page.reload();check('text preference survives reload',await page.locator('#textSizeButton').getAttribute('aria-pressed')==='true');
   await page.goto('http://127.0.0.1:8000/#modules');await page.waitForFunction(()=>document.body.dataset.page==='lessons');check('old lesson bookmarks still work',page.url().endsWith('#lessons'));
   check('no research branding',!(/\bresearch\b|respondents|Cronbach|SOP\s*\d/i.test(await page.locator('body').innerText())));
   check('no page errors',errors.length===0,errors);
  }catch(error){check('UI test completes',false,String(error));await page.screenshot({path:`${output}/${viewport.width}x${viewport.height}-failure.png`});}
  results.push({viewport,checks});await context.close();
 }
}finally{await browser.close();fs.writeFileSync(`${output}/interface-results.json`,JSON.stringify(results,null,2));}
console.log(JSON.stringify(results,null,2));if(failed)process.exitCode=1;

import {chromium} from 'playwright-core';
import fs from 'node:fs';
import vm from 'node:vm';
const data={window:{}};vm.runInNewContext(fs.readFileSync('js/lesson-data.js','utf8'),data);vm.runInNewContext(fs.readFileSync('js/more-lesson-data.js','utf8'),data);const lessons=data.window.AILiteracyLessons,moreLessons=data.window.AILiteracyMoreLessons;
const output='mobile-qa-artifacts';fs.mkdirSync(output,{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/usr/bin/google-chrome',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const viewports=[{width:360,height:740},{width:390,height:844},{width:430,height:932},{width:844,height:390},{width:1440,height:900}];const results=[];let failed=false;
try{for(const viewport of viewports){
 const context=await browser.newContext({viewport,isMobile:viewport.width<1000,hasTouch:viewport.width<1000});const page=await context.newPage();page.setDefaultTimeout(15000);const errors=[];page.on('pageerror',e=>errors.push(e.message));const checks=[];const check=(name,ok,detail)=>{checks.push({name,ok,detail});if(!ok)failed=true;};
 const nav=async route=>{const link=page.locator(`#navLinks a[href="#${route}"]`);if(!await link.isVisible())await page.locator('#menuBtn').click();await link.click();await page.waitForFunction(r=>document.body.dataset.activePage===r,route);};
 const section=async n=>{await page.locator(`[data-simple-step="${n}"]`).click();};
 const question=async(kind,n)=>{await page.locator(`.simple-${kind} .activity-question-nav button`).nth(n).click();};
 const answer=async(kind,index,q)=>{
  await question(kind,index);const scope=page.locator('.simple-'+kind);const type=q.type||'single';
  if(type==='single')await scope.locator(`input[name="${kind}-${index}"][value="${q.correct}"]`).check();
  if(type==='multi'){for(const a of q.correct)await scope.locator(`input[name="${kind}-${index}"][value="${a}"]`).check();}
  if(type==='match'){for(const [i,a]of q.correct.entries())await scope.locator('select').nth(i).selectOption(String(a));}
  if(type==='order'){
   for(let n=0;n<q.correct.length;n++){
    const text=q.items[q.correct[n]];
    for(let moves=0;moves<q.items.length;moves++){
     const current=await scope.locator('.order-item>span:first-child').allTextContents();const at=current.findIndex(x=>x.endsWith(text));if(at===n)break;
     await scope.getByRole('button',{name:'Move '+text+' up',exact:true}).click();
    }
   }
   await scope.getByRole('button',{name:'Confirm this order',exact:true}).click();
  }
  if(kind==='quiz'&&type!=='single')await scope.getByRole('button',{name:'Check answer',exact:true}).click();
 };
 try{
  await page.goto('http://127.0.0.1:8000/',{waitUntil:'domcontentloaded'});await page.waitForSelector('body.app-routing-ready');
  check('homepage fits viewport',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
  check('Aa setting removed',await page.locator('#studioTextToggle').count()===0);
  check('space background and solar map retained',await page.locator('.ambient-scene').isVisible()&&await page.locator('#solarNav').isVisible());
  await nav('guide');
  if(viewport.width>980){
   await page.waitForFunction(()=>{const nav=document.querySelector('#navLinks'),active=nav.querySelector('[aria-current="page"]'),other=nav.querySelector('a:not([aria-current])');return parseFloat(getComputedStyle(active).fontSize)>=18&&active.getBoundingClientRect().height>other.getBoundingClientRect().height;});
   const rail=await page.evaluate(()=>{const nav=document.querySelector('#navLinks'),active=nav.querySelector('[aria-current="page"]'),other=nav.querySelector('a:not([aria-current])'),header=document.querySelector('#siteHeader').getBoundingClientRect();return {left:header.left,width:header.width,active:active.getBoundingClientRect().height,other:other.getBoundingClientRect().height,font:parseFloat(getComputedStyle(active).fontSize)};});
   check('navigation is on the left and active tab expands',rail.left<30&&rail.width<280&&rail.active>rail.other&&rail.font>=18,rail);
  }
  check('visited ticks absent from navigation',await page.locator('#navLinks a.is-visited').count()===0&&await page.locator('.solar-planet.is-visited').count()===0);
  await nav('modules');check('domain shortcut labels have reading room',await page.locator('.toolkit-domain-map-grid button').evaluateAll(nodes=>nodes.every(n=>n.getBoundingClientRect().width>=140)));await page.locator('#studioModuleSearch').fill('privacy');check('module search works',await page.locator('#modules .module-card:visible').count()===1);await page.getByRole('button',{name:'Clear module search'}).click();
  await page.locator('.module-link[data-module="1"]').click();await page.waitForSelector('#moduleModal.show .simple-panel:not([hidden])');
  const names=['Discussion','Real-Life Scenarios','Quiz','Assessment'];for(let i=0;i<4;i++){await section(i);check(names[i]+' opens directly',(await page.locator('.simple-panel:visible>h3').innerText())===names[i]&&await page.locator('.module-step-nav [aria-current="step"]').count()===1);}
  await section(0);check('expanded discussion and two playable videos',(await page.locator('#simple-stage-discussion').innerText()).split(/\s+/).length>=1400&&await page.locator('video[controls]').count()===2);check('lesson references are included',await page.locator('.lesson-reference-list a').count()>=3);
  await section(2);check('ten foundation quiz questions',await page.locator('.simple-quiz .question-number').count()===10);
  await page.locator('input[name="quiz-0"][value="0"]').check();check('incorrect practice answer gets feedback',(await page.locator('.simple-quiz .activity-feedback').innerText()).includes('Review this response'));
  for(const [i,q]of lessons[1].quiz.entries())await answer('quiz',i,q);
  check('mixed quiz questions can all be answered correctly',(await page.locator('.simple-quiz .activity-score').innerText()).includes('10 of 10 correct'));
  await section(3);check('eight foundation assessment tasks',await page.locator('.simple-assessment .question-number').count()===8);
  await page.getByRole('button',{name:'Submit assessment',exact:true}).click();check('missing assessment answers are explained',(await page.locator('.simple-assessment .activity-score').innerText()).includes('Answer every task'));
  for(const [i,q]of lessons[1].assessment.entries())await answer('assessment',i,q);
  await question('assessment',0);await page.locator('input[name="assessment-0"][value="0"]').check();await page.getByRole('button',{name:'Submit assessment',exact:true}).click();
  check('incorrect assessment cannot complete',!(await page.getByRole('button',{name:'Complete lesson',exact:true}).isVisible()));
  await page.getByRole('button',{name:'Retry missed questions',exact:true}).click();check('retry keeps correct responses',(await page.locator('.simple-assessment .activity-status').first().innerText()).includes('7 answered'));
  await answer('assessment',0,lessons[1].assessment[0]);await page.getByRole('button',{name:'Submit assessment',exact:true}).click();await page.getByRole('button',{name:'Complete lesson',exact:true}).click();check('correct assessment completes lesson',await page.getByRole('button',{name:'Lesson completed',exact:true}).isDisabled());
  await section(0);
  const fit=await page.evaluate(()=>{const s=document.querySelector('.module-shell').getBoundingClientRect(),c=document.querySelector('#moduleClose').getBoundingClientRect(),b=document.querySelector('#moduleLessonContent');return {fits:s.left>=-1&&s.right<=innerWidth+1&&s.top>=-1&&s.bottom<=innerHeight+1&&b.scrollWidth<=b.clientWidth+2,close:!!document.elementFromPoint(c.left+c.width/2,c.top+c.height/2)?.closest('#moduleClose')};});check('lesson fits and close remains accessible',fit.fits&&fit.close,fit);
  await page.screenshot({path:`${output}/${viewport.width}x${viewport.height}-lesson.png`});await page.locator('#moduleClose').click();await nav('progress');check('original Progress integrates completion',(await page.locator('#progressTitle').innerText()).includes('1 of 7'));
  await page.locator('[data-progress-module="1"]').click();await section(3);await question('assessment',4);check('ordering answer survives reopening',(await page.locator('.simple-assessment .order-item>span:first-child').allTextContents()).every((v,i)=>v.endsWith(lessons[1].assessment[4].items[i])));await page.locator('#moduleClose').click();
  if(viewport.width>980){for(let id=2;id<=7;id++){await page.locator(`[data-progress-module="${id}"]`).click();for(let i=0;i<4;i++)await section(i);check(`Lesson ${id}: expanded content and activities`,await page.locator('video').count()===2&&await page.locator('.simple-quiz .question-number').count()===10&&await page.locator('.simple-assessment .question-number').count()===8);await page.locator('#moduleClose').click();}}
  await nav('modules');check('seven new lessons appear',await page.locator('.extra-lesson-card').count()===7);check('search counts all fourteen lessons',(await page.locator('.studio-search-count').innerText()).includes('14 of 14'));
  await page.locator('#studioModuleSearch').fill('privacy');check('search includes a follow-up lesson',await page.locator('.extra-lesson-card:visible').count()>=1);await page.getByRole('button',{name:'Clear module search'}).click();
  await page.locator('.extra-lesson-card [data-extra-lesson="8"]').click();check('new lesson opens in the original viewer',(await page.locator('#moduleModalTitle').innerText())===moreLessons[8].title);
  await section(0);check('follow-up has a descriptive discussion and two videos',(await page.locator('#simple-stage-discussion').innerText()).split(/\s+/).length>=800&&await page.locator('video').count()===2);
  await section(3);for(const [i,q]of moreLessons[8].assessment.entries())await answer('assessment',i,q);
  await page.getByRole('button',{name:'Submit assessment',exact:true}).click();await page.getByRole('button',{name:'Complete lesson',exact:true}).click();
  await page.getByRole('button',{name:'Next lesson →',exact:true}).click();check('follow-up Next opens the following lesson',(await page.locator('#moduleModalTitle').innerText())===moreLessons[9].title);await page.locator('#moduleClose').click();
  await nav('progress');check('combined and separate progress are saved',(await page.locator('#allLessonProgress').innerText()).includes('2 of 14')&&(await page.locator('#extraProgressTitle').innerText()).includes('1 of 7'));
  await page.locator('#progress [data-extra-lesson="8"]').click();await section(3);check('follow-up assessment completion survives reopening',await page.getByRole('button',{name:'Lesson completed',exact:true}).isDisabled());await page.locator('#moduleClose').click();
  if(viewport.width>980){await nav('modules');for(let id=9;id<=14;id++){await page.locator(`.extra-lesson-card [data-extra-lesson="${id}"]`).click();for(let i=0;i<4;i++)await section(i);check(`Follow-up lesson ${id} exposes all content`,await page.locator('video').count()===2&&await page.locator('.simple-quiz .question-number').count()===6&&await page.locator('.simple-assessment .question-number').count()===5);await page.locator('#moduleClose').click();}}
  await nav('about');check('About preserved',await page.locator('#about .about-copy').isVisible());await nav('resources');check('eight reference cards and glossary preserved',await page.locator('.reference-card').count()===8&&await page.locator('#glossary').isVisible());check('full citations and canonical links',(await page.locator('[data-reference="ng"] .reference-citation').innerText()).includes('100041')&&(await page.locator('[data-reference="privacy"] .reference-open').getAttribute('href')).includes('elibrary.judiciary.gov.ph'));
  if(!await page.locator('#teacherModeBtn').isVisible())await page.locator('#menuBtn').click();await page.locator('#teacherModeBtn').click();check('Teacher Mode preserved',await page.locator('#teacherModal.show').isVisible());await page.keyboard.press('Escape');
  await nav('home');await page.locator('#heroChallengeBtn').click();check('Decision Lab still opens',await page.locator('#challengeModal.show').isVisible());await page.locator('#modalClose').click();
  await page.screenshot({path:`${output}/${viewport.width}x${viewport.height}-home.png`});check('no page errors',errors.length===0,errors);
 }catch(e){check('UI checks finish',false,String(e));await page.screenshot({path:`${output}/${viewport.width}x${viewport.height}-failure.png`});}
 results.push({viewport,checks});await context.close();
}}finally{await browser.close();fs.writeFileSync(`${output}/interface-results.json`,JSON.stringify(results,null,2));}
console.log(JSON.stringify(results,null,2));if(failed)process.exitCode=1;

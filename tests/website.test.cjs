const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const sandbox={window:{}};
vm.runInNewContext(read('js/lesson-data.js'),sandbox);
vm.runInNewContext(read('js/simple-lessons.js'),sandbox);
const lessons=Object.values(sandbox.window.AILiteracyLessons);
const player=sandbox.window.AILiteracyPlayer;
test('seven detailed lessons use the requested four-part flow',()=>{
 assert.equal(lessons.length,7);
 assert.deepEqual(Array.from(player.stages),['Discussion','Real-Life Scenarios','Quiz','Assessment']);
 for(const lesson of lessons){
  const words=[lesson.intro,...lesson.parts.flat(),...lesson.objectives,...lesson.keyIdeas.map(x=>x.text)].join(' ').split(/\s+/).length;
  assert.ok(words>=1100,`Lesson ${lesson.id}: ${words} discussion words`);
  assert.equal(lesson.scenarios.length,3);
  for(const scenario of lesson.scenarios)for(const key of ['title','situation','action','why','question'])assert.ok(scenario[key]?.length>10);
  for(const questions of [lesson.quiz,lesson.assessment]){
   assert.equal(questions.length,3);
   for(const q of questions){assert.ok(q.question.length>20);assert.ok(q.options.length>=3);assert.ok(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<q.options.length);assert.ok(q.feedback.length>30);}
  }
  assert.equal(new Set([...lesson.quiz,...lesson.assessment].map(x=>x.question)).size,6,'Practice and assessment must have different questions');
 }
});
test('videos use verified official sources and matching YouTube links',()=>{
 for(const lesson of lessons){const v=lesson.video;assert.equal(new URL(v.src).hostname,'contentful-videos.code.org');assert.equal(new URL(v.youtube).searchParams.get('v'),v.youtubeId);assert.equal(v.creator,'Code.org');assert.ok(v.focus.length>30);}
});
test('grading rejects missing and coerced answers',()=>{
 const q=[{correct:0,options:['a','b']},{correct:1,options:['a','b']}];
 assert.equal(player.grade(q,[0,1]).passed,true);
 for(const answers of [[null,1],['0',1],[0],[],[0,0]])assert.equal(player.grade(q,answers).passed,false);
 assert.equal(player.grade([],[]).passed,false);
 assert.deepEqual(Array.from(player.normalizeAnswers(q,{'0':0,'1':1})),[null,null]);
 assert.deepEqual(Array.from(player.normalizeAnswers(q,[0,99])),[0,null]);
 assert.deepEqual(Array.from(player.normalizeAnswers(q,['0',-1])),[null,null]);
});
test('original pages and tools are retained alongside the revised lessons',()=>{
 const html=read('index.html');
 const nav=html.match(/<nav class="nav-links"[\s\S]*?<\/nav>/)[0];
 assert.equal((nav.match(/<a /g)||[]).length,7);
 for(const route of ['home','guide','modules','challenge','progress','about','resources'])assert.ok(nav.includes(`href="#${route}"`));
 for(const id of ['solarNav','teacherModeBtn','teacherModal','readinessResult','glossary','capstoneModal','resetToolkitBtn','printQuickGuideBtn'])assert.ok(html.includes(`id="${id}"`),id+' remains available');
 assert.match(html,/lesson-integration\.js/);assert.match(html,/script-base\.js/);
 assert.doesNotMatch(html,/plain-app\.js|plain-site\.css/);
 assert.equal((html.match(/data-simple-step=/g)||[]).length,4);
 assert.ok(read('js/finalizer.js').includes('Developed by Aerojohn Joshua G. Pancho'));
 assert.doesNotMatch(JSON.stringify(lessons),/\bresearch\b|respondents|Cronbach|validation results|SOP\s*\d/i);
});
test('legacy site forwards module selection and completion to the new lesson player',()=>{
 let received;const container={dataset:{},classList:{remove:()=>{}},closest:()=>({classList:{add:()=>{}}})};
 const context={window:{AILiteracyLessons:{2:{id:2,title:'Lesson 2'}},AILiteracyPlayer:{render:options=>{received=options;}}}};
 vm.runInNewContext(read('js/lesson-integration.js'),context);
 const done=()=>{};context.window.AIToolkitSimpleLessons.render({number:2,data:{old:true},container,onComplete:done,completed:true});
 assert.equal(received.data.id,2);assert.equal(received.onComplete,done);assert.equal(received.completed,true);assert.equal(container.dataset.simpleLesson,'true');
});

const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),sandbox={window:{}};
for(const p of ['references-data.js','lesson-data.js','more-lesson-data.js','simple-lessons.js'])vm.runInNewContext(read('js/'+p),sandbox);
const coreLessons=Object.values(sandbox.window.AILiteracyLessons),moreLessons=Object.values(sandbox.window.AILiteracyMoreLessons),lessons=[...coreLessons,...moreLessons],refs=sandbox.window.AILiteracyReferences,player=sandbox.window.AILiteracyPlayer;
test('fourteen lessons retain four sections and add varied practice',()=>{
 assert.equal(lessons.length,14);assert.equal(coreLessons.length,7);assert.equal(moreLessons.length,7);assert.deepEqual(Array.from(player.stages),['Discussion','Real-Life Scenarios','Quiz','Assessment']);
 for(const l of lessons){
  const words=[l.intro,...l.parts.flat(),...l.objectives,...l.keyIdeas.map(x=>x.text)].join(' ').split(/\s+/).length;
  assert.ok(words>=(l.id<=7?1400:800),`Lesson ${l.id}: ${words} words`);assert.equal(l.scenarios.length,4);assert.equal(l.quiz.length,l.id<=7?10:6);assert.equal(l.assessment.length,l.id<=7?8:5);
  assert.equal(new Set([...l.quiz,...l.assessment].map(q=>q.question)).size,l.quiz.length+l.assessment.length);
  assert.deepEqual(Array.from(new Set([...l.quiz,...l.assessment].map(q=>q.type||'single'))).sort(),['match','multi','order','single']);
  for(const q of [...l.quiz,...l.assessment]){assert.ok(q.feedback.length>30);assert.equal(player.grade([q],[q.correct]).passed,true,'authored correct answer must be valid');}
  assert.ok(l.references.length>=3);for(const id of l.references)assert.ok(refs[id]?.url);
 }
});
test('expanded totals are concrete and follow-up lessons remain in the seven domains',()=>{assert.equal(lessons.reduce((n,l)=>n+l.quiz.length+l.assessment.length,0),203);assert.equal(lessons.reduce((n,l)=>n+l.scenarios.length,0),56);for(const l of moreLessons)assert.ok(Number.isInteger(l.parentDomain)&&l.parentDomain>=1&&l.parentDomain<=7);assert.ok(read('js/script-base.js').includes('aiToolkitExtraLessons'));});
test('each lesson has two different playable videos with matching YouTube IDs',()=>{
 const sources=new Set();for(const l of lessons){assert.equal(l.videos.length,2);assert.equal(new Set(l.videos.map(v=>v.src)).size,2);for(const v of l.videos){assert.equal(new URL(v.src).hostname,'contentful-videos.code.org');assert.equal(new URL(v.youtube).searchParams.get('v'),v.youtubeId);assert.ok(v.focus.length>30);sources.add(v.src);}}
 assert.ok(sources.size>=12);
});
test('grading rejects coercion, duplicate selections, partial matches, and malformed ordering',()=>{
 const single={options:['a','b','c'],correct:0};for(const a of [null,'0',[],true,undefined])assert.equal(player.grade([single],[a]).passed,false);
 const multi={type:'multi',options:['a','b','c'],correct:[0,2]};assert.equal(player.grade([multi],[[2,0]]).passed,true);for(const a of [[0],[0,0,2],[0,1,2],['0',2],null])assert.equal(player.grade([multi],[a]).passed,false);
 const match={type:'match',pairs:['x','y','z'],options:['a','b','c'],correct:[2,0,1]};for(const a of [[2,null,1],[2,0],[2,0,0],['2',0,1]])assert.equal(player.grade([match],[a]).passed,false);
 const order={type:'order',items:['a','b','c','d'],correct:[0,1,2,3]};for(const a of [[0,1,2],[0,1,2,2],[3,2,1,0],['0',1,2,3]])assert.equal(player.grade([order],[a]).passed,false);
 assert.equal(player.grade([order],[[0,1,2,3]]).passed,true);assert.equal(player.grade([],[]).passed,false);
 assert.deepEqual(Array.from(player.normalizeAnswers([single],{0:0})),[null]);
});
test('all original sections remain and the Aa setting and visited badges are removed',()=>{
 const html=read('index.html'),nav=html.match(/<nav class="nav-links"[\s\S]*?<\/nav>/)[0];assert.equal((nav.match(/<a /g)||[]).length,7);
 for(const route of ['home','guide','modules','challenge','progress','about','resources'])assert.ok(nav.includes(`href="#${route}"`));
 for(const id of ['solarNav','teacherModeBtn','teacherModal','readinessResult','glossary','capstoneModal','resetToolkitBtn','printQuickGuideBtn'])assert.ok(html.includes(`id="${id}"`));
 assert.doesNotMatch(html,/id="studioTextToggle"|plain-app\.js|plain-site\.css/);assert.doesNotMatch(read('js/header-orbit-tabs.js'),/visited\.add|saveVisited/);assert.match(html,/readable-rail\.css/);assert.match(html,/lesson-integration\.js/);
 assert.equal(Object.keys(refs).length,8);for(const ref of Object.values(refs)){assert.ok(ref.citation.length>40);assert.equal(new URL(ref.url).protocol,'https:');}assert.ok(refs.ng.citation.includes('100041'));assert.ok(refs.long.citation.includes('1–16'));
});
test('legacy module selection still delegates completion and content to the new player',()=>{
 let received;const container={dataset:{},classList:{remove:()=>{}},closest:()=>({classList:{add:()=>{}}})},ctx={window:{AILiteracyLessons:{2:{id:2}},AILiteracyPlayer:{render:o=>{received=o;}}}};
 vm.runInNewContext(read('js/lesson-integration.js'),ctx);const done=()=>{};ctx.window.AIToolkitSimpleLessons.render({number:2,data:{old:true},container,onComplete:done,completed:true});assert.equal(received.data.id,2);assert.equal(received.onComplete,done);assert.equal(container.dataset.simpleLesson,'true');
});

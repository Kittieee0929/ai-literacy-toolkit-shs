(() => {
  'use strict';
  const stages = ['Discussion', 'Real-Life Scenarios', 'Quiz', 'Assessment'];
  const keys = ['discussion', 'scenarios', 'quiz', 'assessment'];
  const storageKey = 'aiLiteracyLessonStateV3';
  let controller, activeContainer;
  const el = (tag, className = '', text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const button = (text, callback, cls = 'simple-secondary') => {
    const node = el('button', cls, text); node.type = 'button'; node.addEventListener('click', callback); return node;
  };
  function paragraphs(parent, text) {
    let group = [];
    for (const sentence of text.split(/(?<=[.!?])\s+(?=[A-Z])/)) {
      group.push(sentence);
      if (group.join(' ').split(/\s+/).length >= 70) { parent.append(el('p', '', group.join(' '))); group = []; }
    }
    if (group.length) parent.append(el('p', '', group.join(' ')));
  }
  const topic = (parent, title, text) => {
    const block = el('section', 'simple-topic'); block.append(el('h4', '', title));
    if (text) paragraphs(block, text); parent.append(block); return block;
  };
  const same = (a, b) => Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((v, i) => v === b[i]);
  function normalizeAnswer(q, value) {
    const type = q.type || 'single';
    if (type === 'single') return Number.isInteger(value) && value >= 0 && value < q.options.length ? value : null;
    if (!Array.isArray(value)) return null;
    if (type === 'multi') return value.length && new Set(value).size === value.length && value.every(v => Number.isInteger(v) && v >= 0 && v < q.options.length) ? [...value].sort((a,b)=>a-b) : null;
    if (type === 'order') return value.length === q.items.length && new Set(value).size === value.length && value.every(v => Number.isInteger(v) && v >= 0 && v < q.items.length) ? [...value] : null;
    if (type === 'match') return q.pairs.map((_, i) => Number.isInteger(value[i]) && value[i] >= 0 && value[i] < q.options.length ? value[i] : null);
    return null;
  }
  const normalizeAnswers = (questions, answers) => questions.map((q, i) => normalizeAnswer(q, Array.isArray(answers) ? answers[i] : null));
  function isAnswered(q, answer) {
    const a = normalizeAnswer(q, answer);
    if ((q.type || 'single') === 'single') return Number.isInteger(a);
    return Array.isArray(a) && a.length > 0 && a.every(Number.isInteger);
  }
  function grade(questions, answers = []) {
    const results = questions.map((q, i) => {
      const a = normalizeAnswer(q, answers[i]);
      if (!isAnswered(q, a)) return false;
      if ((q.type || 'single') === 'single') return a === q.correct;
      return same(a, q.type === 'multi' ? [...q.correct].sort((x,y)=>x-y) : q.correct);
    });
    return {results, score:results.filter(Boolean).length, passed:results.length > 0 && results.every(Boolean)};
  }
  function readState() {
    try { const v = JSON.parse(localStorage.getItem(storageKey) || '{}'); return v && typeof v === 'object' && !Array.isArray(v) ? v : {}; } catch { return {}; }
  }
  function stop() { controller?.abort(); activeContainer?.querySelectorAll('video').forEach(v => v.pause()); }
  function render({data, container, navigation, progress, completed, onComplete, onNext, onFinish, hasNext}) {
    stop(); controller = new AbortController(); activeContainer = container;
    const saved = readState()[String(data.id)] || {};
    const quizAnswers = normalizeAnswers(data.quiz, saved.quizAnswers);
    const assessmentAnswers = normalizeAnswers(data.assessment, saved.assessmentAnswers);
    const checked = data.quiz.map((_,i) => Array.isArray(saved.checked) && saved.checked[i] === true);
    let submitted = saved.submitted === true && data.assessment.every((q,i) => isAnswered(q,assessmentAnswers[i]));
    let stage = Number.isInteger(saved.stage) && saved.stage >= 0 && saved.stage < 4 ? saved.stage : 0;
    let isCompleted = Boolean(completed);
    const canContinue = hasNext === undefined ? data.id < 7 : hasNext === true;
    const positions = {quiz:Number.isInteger(saved.quizIndex) ? Math.max(0,Math.min(data.quiz.length-1,saved.quizIndex)) : 0, assessment:Number.isInteger(saved.assessmentIndex) ? Math.max(0,Math.min(data.assessment.length-1,saved.assessmentIndex)) : 0};
    container.replaceChildren();
    const lesson = el('div','simple-lesson'), counter = el('p','simple-stage-counter'); counter.setAttribute('aria-live','polite'); lesson.append(counter);
    const panels = stages.map((title,i) => { const p = el('section','simple-panel'); p.id = 'simple-stage-'+keys[i]; const h=el('h3','simple-stage-title',title);h.id=p.id+'-title';h.tabIndex=-1;p.setAttribute('aria-labelledby',h.id);p.append(h);lesson.append(p);return p; });
    const saveNote = el('p','simple-save-note','Your answers and progress stay in this browser.');
    function save() {
      try { const all=readState();all[data.id]={stage,quizAnswers,assessmentAnswers,checked,submitted,quizIndex:positions.quiz,assessmentIndex:positions.assessment};localStorage.setItem(storageKey,JSON.stringify(all));saveNote.textContent='Your answers and progress stay in this browser.'; }
      catch { saveNote.textContent='This browser could not save your answers. You can still use the lesson.'; }
    }
    paragraphs(panels[0],data.intro);
    const goals=topic(panels[0],'What you will learn'), list=el('ul');data.objectives.forEach(v=>list.append(el('li','',v)));goals.append(list);
    const videos=data.videos || [data.video];
    function addVideo(v, index) {
      const watch=el('section','lesson-video');watch.append(el('p','video-eyebrow',`WATCH & THINK · VIDEO ${index+1} OF ${videos.length}`),el('h4','',v.title));
      const video=el('video');video.controls=true;video.playsInline=true;video.preload='none';video.poster=v.poster;video.src=v.src;video.tabIndex=0;video.setAttribute('aria-label',v.title+' — '+v.creator);
      const fallback=el('a','','Watch this video on YouTube');fallback.href=v.youtube;video.append(fallback);
      const credit=el('div','video-credit'),link=el('a','','Open on YouTube ↗');link.href=v.youtube;link.target='_blank';link.rel='noopener noreferrer';credit.append(el('span','','Video by '+v.creator),link);
      const error=el('p','video-error','The player could not load the video. Use its YouTube link to watch.');error.hidden=true;video.addEventListener('error',()=>{error.hidden=false;});
      video.addEventListener('play',()=>container.querySelectorAll('video').forEach(other=>{if(other!==video)other.pause();}));
      watch.append(video,credit,error);paragraphs(watch,v.focus);panels[0].append(watch);
    }
    data.parts.forEach(([title,text],i)=>{topic(panels[0],title,text);if(i===1)addVideo(videos[0],0);if(i===Math.min(9,data.parts.length-1)&&videos[1])addVideo(videos[1],1);});
    const ideas=topic(panels[0],'Key ideas in plain language');data.keyIdeas.forEach(v=>{ideas.append(el('h5','',v.title));paragraphs(ideas,v.text);});
    const routine=topic(panels[0],'A practical routine: '+data.routine.name,data.routine.description),checks=el('ul');data.routine.checklist.forEach(v=>checks.append(el('li','',v)));routine.append(checks);
    topic(panels[0],'The main idea to remember',data.takeaway);
    const references=topic(panels[0],'Sources for this lesson'),referenceList=el('ul','lesson-reference-list');
    for(const id of data.references||[]){const ref=window.AILiteracyReferences?.[id];if(!ref)continue;const li=el('li'),a=el('a','',ref.citation);a.href=ref.url;a.target='_blank';a.rel='noopener noreferrer';li.append(a);referenceList.append(li);}references.append(referenceList);
    paragraphs(panels[1],'See how the ideas apply at school, at work, and online. Think about your response, then compare it with the suggested approach.');
    data.scenarios.forEach((s,i)=>{const c=topic(panels[1],(i+1)+'. '+s.title,s.situation);c.classList.add('simple-scenario');c.append(el('h5','','A responsible response'));paragraphs(c,s.action);c.append(el('h5','','Why this matters'));paragraphs(c,s.why);paragraphs(c,s.question);});
    paragraphs(panels[2],`Try ${data.quiz.length} questions, one at a time. Choose answers, match ideas, and review immediate explanations. You can revisit any question.`);
    paragraphs(panels[3],`Apply the lesson to ${data.assessment.length} tasks. Work through the situations and submit when you are ready. You can review feedback and retry. Answer every task correctly to complete the lesson.`);
    buildActivity('quiz',data.quiz,quizAnswers,panels[2]);buildActivity('assessment',data.assessment,assessmentAnswers,panels[3]);
    const controls=el('div','simple-lesson-controls'),previous=button('← Previous',()=>showStage(stage-1,true)),next=button('Next →',()=>showStage(stage+1,true),'simple-primary');controls.append(previous,next);lesson.append(controls,saveNote);container.append(lesson);
    const navButtons=[...navigation.querySelectorAll('[data-simple-step]')];
    function showStage(index,focus=false){stage=Math.max(0,Math.min(index,3));panels.forEach((p,i)=>{p.hidden=i!==stage;});navButtons.forEach((b,i)=>{b.classList.toggle('active',i===stage);if(i===stage)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});counter.textContent=`Part ${stage+1} of 4 · ${stages[stage]}`;progress.style.width=((stage+1)*25)+'%';previous.disabled=stage===0;next.hidden=stage===3;next.textContent='Next: '+stages[Math.min(stage+1,3)]+' →';if(stage!==0)container.querySelectorAll('video').forEach(v=>v.pause());container.scrollTop=0;if(focus)panels[stage].querySelector('h3').focus({preventScroll:true});save();}
    navigation.addEventListener('click',event=>{const b=event.target.closest('[data-simple-step]');if(b)showStage(Number(b.dataset.simpleStep),true);},{signal:controller.signal});
    navigation.addEventListener('keydown',event=>{const b=event.target.closest('[data-simple-step]');if(!b||!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const i=Number(b.dataset.simpleStep),to=event.key==='Home'?0:event.key==='End'?3:Math.max(0,Math.min(3,i+(['ArrowUp','ArrowLeft'].includes(event.key)?-1:1)));showStage(to);navButtons[to].focus();},{signal:controller.signal});
    showStage(stage);
    function buildActivity(kind,questions,answers,panel){
      const practice=kind==='quiz',wrap=el('div','simple-'+kind),status=el('p','activity-status'),nav=el('div','activity-question-nav'),card=el('section','simple-question-card'),score=el('div','activity-score'),completion=el('div','simple-completion');status.setAttribute('role','status');score.setAttribute('role','status');score.tabIndex=-1;nav.setAttribute('aria-label',practice?'Quiz questions':'Assessment tasks');
      const complete=button(isCompleted?'Lesson completed':'Complete lesson',()=>{if(!submitted||!grade(questions,answers).passed)return;onComplete(data.id);isCompleted=true;complete.textContent='Lesson completed';complete.disabled=true;nextLesson.hidden=false;save();},'simple-primary');complete.disabled=isCompleted;
      const nextLesson=button(canContinue?'Next lesson →':'View my progress →',()=>canContinue?onNext():onFinish());nextLesson.hidden=!isCompleted;completion.append(complete,nextLesson);completion.hidden=!isCompleted;
      const retry=button('Retry missed questions',()=>{const outcome=grade(questions,answers);const first=outcome.results.findIndex(v=>!v);outcome.results.forEach((ok,i)=>{if(!ok)answers[i]=null;});submitted=false;positions[kind]=Math.max(0,first);save();draw(true);});
      const submit=button('Submit assessment',()=>{
        const missing=questions.findIndex((q,i)=>!isAnswered(q,answers[i]));
        if(missing>=0){positions[kind]=missing;submitted=false;draw(true);score.hidden=false;score.textContent='Answer every task before submitting. Task '+(missing+1)+' still needs an answer.';score.focus();return;}
        submitted=true;save();draw();score.focus();
      },'simple-primary');
      const navButtons=questions.map((_,i)=>{const b=button(String(i+1),()=>{positions[kind]=i;draw(true);save();},'question-number');b.setAttribute('aria-label',(practice?'Question ':'Task ')+(i+1));nav.append(b);return b;});
      wrap.append(status,nav,card,score);if(!practice)wrap.append(submit,retry,completion);panel.append(wrap);
      let feedback;
      function refresh(){
        const answered=questions.filter((q,i)=>isAnswered(q,answers[i])).length;
        status.textContent=(practice?'Question ':'Task ')+(positions[kind]+1)+' of '+questions.length+' · '+answered+' answered';
        navButtons.forEach((b,i)=>{b.classList.toggle('is-answered',isAnswered(questions[i],answers[i]));if(i===positions[kind])b.setAttribute('aria-current','true');else b.removeAttribute('aria-current');});
        const i=positions[kind],q=questions[i],outcome=grade(questions,answers),show=practice?checked[i]===true:submitted;
        feedback.hidden=!show;feedback.classList.toggle('is-correct',outcome.results[i]);feedback.replaceChildren();
        if(show){feedback.append(el('strong','',outcome.results[i]?'Correct.':'Review this response.'));paragraphs(feedback,q.feedback);const type=q.type||'single';let correct;if(type==='single')correct=q.options[q.correct];else if(type==='multi')correct=q.correct.map(j=>q.options[j]).join(' · ');else if(type==='match')correct=q.pairs.map((term,j)=>term+': '+q.options[q.correct[j]]).join(' · ');else correct=q.correct.map((j,n)=>(n+1)+'. '+q.items[j]).join(' ');feedback.append(el('p','', 'Strong response: '+correct));}
        if(practice){score.hidden=false;score.textContent=checked.filter((v,i)=>v&&outcome.results[i]).length+' of '+questions.length+' correct so far. Review the feedback and keep practising.';}
        else{score.hidden=!submitted;score.textContent=outcome.passed?questions.length+' of '+questions.length+' correct. You can now complete this lesson.':outcome.score+' of '+questions.length+' correct. Review the feedback and retry the tasks you missed.';retry.hidden=!submitted||outcome.passed;completion.hidden=!isCompleted&&!(submitted&&outcome.passed);}
      }
      function setAnswer(value){const i=positions[kind];answers[i]=normalizeAnswer(questions[i],value);if(practice)checked[i]=(questions[i].type||'single')==='single';else submitted=false;save();refresh();}
      function draw(focus=false){
        const i=positions[kind],q=questions[i],type=q.type||'single';card.replaceChildren();
        const heading=el('h4','',q.question);heading.tabIndex=-1;heading.id=kind+'-question-title';card.setAttribute('aria-labelledby',heading.id);
        card.append(el('p','question-type',({single:'Choose one answer',multi:'Choose all correct answers',match:'Match the ideas',order:'Put the steps in order'})[type]),heading);
        if(type==='single'||type==='multi')q.options.forEach((text,j)=>{const label=el('label','simple-option'),input=el('input');input.type=type==='multi'?'checkbox':'radio';input.name=kind+'-'+i;input.value=String(j);input.checked=type==='multi'?Array.isArray(answers[i])&&answers[i].includes(j):answers[i]===j;input.addEventListener('change',()=>{if(type==='single')setAnswer(j);else{const a=Array.isArray(answers[i])?[...answers[i]]:[];setAnswer(input.checked?[...a,j]:a.filter(v=>v!==j));}});label.append(input,el('span','',text));card.append(label);});
        if(type==='match')q.pairs.forEach((term,j)=>{const row=el('div','match-row'),label=el('label','',term),select=el('select');select.id=kind+'-match-'+j;select.setAttribute('aria-label','Match '+term);label.htmlFor=select.id;const blank=el('option','','Choose an explanation');blank.value='';select.append(blank);q.options.forEach((text,n)=>{const option=el('option','',text);option.value=String(n);select.append(option);});select.value=Number.isInteger(answers[i]?.[j])?String(answers[i][j]):'';select.addEventListener('change',()=>{const a=Array.isArray(answers[i])?[...answers[i]]:q.pairs.map(()=>null);a[j]=select.value===''?null:Number(select.value);setAnswer(a);});row.append(label,select);card.append(row);});
        if(type==='order'){
          let order=Array.isArray(answers[i])?[...answers[i]]:q.items.map((_,n)=>(n+2)%q.items.length);const ordered=el('ol','order-list');
          const paint=()=>{ordered.replaceChildren();order.forEach((item,n)=>{const row=el('li','order-item'),moves=el('span','order-buttons');row.append(el('span','',(n+1)+'. '+q.items[item]));for(const delta of [-1,1]){const move=button(delta<0?'↑':'↓',()=>{const target=n+delta;[order[n],order[target]]=[order[target],order[n]];setAnswer([...order]);paint();ordered.querySelectorAll('.order-item')[target].querySelector('button:not(:disabled)').focus();},'order-move');move.setAttribute('aria-label','Move '+q.items[item]+(delta<0?' up':' down'));move.disabled=n+delta<0||n+delta>=order.length;moves.append(move);}row.append(moves);ordered.append(row);});};paint();card.append(ordered,button('Confirm this order',()=>{setAnswer([...order]);orderNote.textContent='Order saved. You can still move the steps before submitting.';}));const orderNote=el('p','activity-status',isAnswered(q,answers[i])?'Order saved.':'Use the arrows to arrange the steps, then confirm your order.');orderNote.setAttribute('role','status');card.append(orderNote);
        }
        feedback=el('div','activity-feedback');feedback.setAttribute('role','status');card.append(feedback);
        if(practice&&type!=='single')card.append(button('Check answer',()=>{if(!isAnswered(q,answers[i])){feedback.hidden=false;feedback.textContent='Complete your response before checking this answer.';return;}checked[i]=true;save();refresh();},'simple-primary'));
        const actions=el('div','activity-actions'),back=button('← Previous '+(practice?'question':'task'),()=>{positions[kind]--;draw(true);save();}),forward=button(i===questions.length-1?(practice?'Go to Assessment →':'Review first task'):'Next '+(practice?'question':'task')+' →',()=>{if(i<questions.length-1)positions[kind]++;else if(practice){showStage(3,true);return;}else positions[kind]=0;draw(true);save();},'simple-primary');back.disabled=i===0;actions.append(back,forward);card.append(actions);refresh();if(focus)heading.focus({preventScroll:false});
      }
      draw();
    }
  }
  window.AILiteracyPlayer={render,stop,grade,normalizeAnswers,isAnswered,stages:[...stages]};
})();

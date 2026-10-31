/* Additional lessons extend the seven-domain trail without replacing its pages. */
(() => {
  'use strict';
  const boot = () => {
    const lessons = window.AILiteracyMoreLessons;
    if (!lessons) return;
    const ids = Object.keys(lessons).map(Number).sort((a,b)=>a-b);
    const extraKey = 'aiToolkitExtraLessons';
    const readIds = (key, valid) => {
      try { const value=JSON.parse(localStorage.getItem(key)||'[]');return Array.isArray(value)?[...new Set(value.filter(id=>Number.isInteger(id)&&valid.includes(id)))]:[]; } catch { return []; }
    };
    let completed = readIds(extraKey,ids), currentExtra=null, origin;
    const el=(tag,cls='',text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
    const modal=document.getElementById('moduleModal');
    const library=el('section','extra-lessons-section');library.id='moreLessons';library.setAttribute('aria-labelledby','moreLessonsTitle');
    const title=el('h3','','Seven more lessons to put it into practice');title.id='moreLessonsTitle';title.tabIndex=-1;
    library.append(el('p','extra-eyebrow','CONTINUE LEARNING · LESSONS 08–14'),title,el('p','','Choose a follow-up topic. Every lesson uses the same Discussion → Real-Life Scenarios → Quiz → Assessment flow.'));
    const grid=el('div','extra-lesson-grid');
    for(const id of ids){const data=lessons[id],card=el('article','extra-lesson-card');card.dataset.extraCard=id;
      card.append(el('span','extra-eyebrow','LESSON '+id+' · '+window.AILiteracyLessons[data.parentDomain].title),el('h4','',data.title),el('p','',data.tagline),el('p','extra-lesson-meta',`${data.quiz.length} quiz questions · ${data.assessment.length} assessment tasks · ${data.videos.length} videos`));
      const open=el('button','extra-lesson-open','Open lesson →');open.type='button';open.dataset.extraLesson=id;card.append(open);grid.append(card);
    }
    library.append(grid);document.querySelector('#modules .module-trail').after(library);
    const jump=el('button','extra-library-jump','Explore 7 more lessons ↓');jump.type='button';jump.addEventListener('click',()=>{library.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});title.focus({preventScroll:true});});document.querySelector('#modules .modules-intro').append(jump);
    const mainHeading=document.querySelector('#modules .modules-intro h2');if(mainHeading){const emphasis=el('em','','One way of thinking.');mainHeading.replaceChildren(document.createTextNode('Fourteen lessons.'),document.createElement('br'),emphasis);}
    const intro=document.querySelector('#modules .modules-intro > p');if(intro)intro.textContent='Fourteen lessons across seven connected domains. Start with a foundation module or explore a follow-up topic below. Every lesson includes discussion, real-life scenarios, a quiz, and a separate assessment.';
    const badge=document.querySelector('.final-learning-badge');if(badge)badge.textContent='14 lessons · 7 connected domains · interactive practice · progress saved on this device';
    document.querySelectorAll('#guide .guide-flow article')[2]?.querySelector('p')?.replaceChildren(document.createTextNode('Practise with questions, matching, and multiple-answer activities.'));
    document.querySelectorAll('#guide .guide-flow article')[3]?.querySelector('p')?.replaceChildren(document.createTextNode('Apply the ideas to new situations, then review feedback and retry.'));
    const summary=el('p','extra-progress-total');summary.id='allLessonProgress';summary.setAttribute('role','status');document.querySelector('#progress .progress-copy').append(summary);
    const progressSection=el('section','extra-progress-section');progressSection.setAttribute('aria-labelledby','extraProgressTitle');
    const progressTitle=el('h3');progressTitle.id='extraProgressTitle';const progressRows=el('div','extra-progress-list');
    progressSection.append(progressTitle,el('p','','Your follow-up lessons have their own saved completion records. You can open them in any order.'),progressRows);document.getElementById('progress').append(progressSection);
    const saveStatus=el('p','extra-save-status');saveStatus.setAttribute('role','status');progressSection.append(saveStatus);
    for(const id of ids){const b=el('button','extra-progress-row');b.type='button';b.dataset.extraLesson=id;b.append(el('span','',String(id).padStart(2,'0')),el('strong','',lessons[id].title),el('span','extra-progress-state','Open lesson →'));progressRows.append(b);}
    function update(){
      const core=readIds('aiToolkitCompletedModules',[1,2,3,4,5,6,7]);summary.textContent=`${core.length+completed.length} of 14 lessons completed · ${core.length} foundation modules and ${completed.length} follow-up lessons`;
      progressTitle.textContent=completed.length+' of 7 follow-up lessons completed';
      for(const id of ids){const done=completed.includes(id);grid.querySelector(`[data-extra-lesson="${id}"]`).textContent=done?'Review lesson →':'Open lesson →';progressRows.querySelector(`[data-extra-lesson="${id}"] .extra-progress-state`).textContent=done?'Completed':'Open lesson →';}
    }
    function open(id){
      const data=lessons[id];if(!data)return;
      if(!currentExtra)origin=document.activeElement;
      currentExtra=id;modal.dataset.extraLesson=String(id);modal.classList.add('simple-module');
      const container=document.getElementById('moduleLessonContent');container.dataset.simpleLesson='true';container.classList.remove('is-slide-module');
      document.getElementById('moduleModalKicker').textContent='FOLLOW-UP LESSON '+id+' / '+window.AILiteracyLessons[data.parentDomain].title.toUpperCase();
      document.getElementById('moduleModalTitle').textContent=data.title;document.getElementById('moduleModalTagline').textContent=data.tagline;document.getElementById('modulePosition').textContent='Follow-up lesson '+(ids.indexOf(id)+1)+' of '+ids.length;
      window.AILiteracyPlayer.render({data,container,navigation:document.querySelector('.module-step-nav'),progress:document.getElementById('moduleLessonProgress'),completed:completed.includes(id),hasNext:ids.indexOf(id)<ids.length-1,
        onComplete:()=>{if(!completed.includes(id))completed.push(id);try{localStorage.setItem(extraKey,JSON.stringify(completed));saveStatus.textContent='';}catch{saveStatus.textContent='This browser could not save completion. You can still use the lessons.';}update();},
        onNext:()=>open(ids[ids.indexOf(id)+1]),onFinish:()=>{document.getElementById('moduleClose').click();location.hash='#progress';}
      });
      modal.classList.add('show');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';document.getElementById('moduleClose').focus();
    }
    document.addEventListener('click',event=>{const button=event.target.closest('[data-extra-lesson]');if(button&&button.tagName==='BUTTON')open(Number(button.dataset.extraLesson));});
    new MutationObserver(()=>{if(currentExtra&&!modal.classList.contains('show')){currentExtra=null;delete modal.dataset.extraLesson;if(origin?.isConnected&&origin.getClientRects().length)origin.focus({preventScroll:true});}}).observe(modal,{attributes:true,attributeFilter:['class']});
    new MutationObserver(update).observe(document.getElementById('progressTitle'),{childList:true,characterData:true,subtree:true});
    window.addEventListener('storage',event=>{if(event.key===extraKey)completed=readIds(extraKey,ids);if([extraKey,'aiToolkitCompletedModules'].includes(event.key))update();});
    const search=document.getElementById('studioModuleSearch'),count=document.querySelector('.studio-search-count');
    function filter(){const term=search.value.trim().toLowerCase();let extraVisible=0;for(const card of grid.children){const visible=card.textContent.toLowerCase().includes(term);card.hidden=!visible;if(visible)extraVisible++;}library.hidden=extraVisible===0;const coreVisible=[...document.querySelectorAll('#modules .module-card')].filter(c=>!c.hidden).length;count.textContent=coreVisible+extraVisible?`${coreVisible+extraVisible} of 14 lessons`:'No lessons found. Try another word.';}
    search.addEventListener('input',filter);document.querySelector('.studio-module-search button').addEventListener('click',filter);
    document.querySelector('label[for="studioModuleSearch"]').textContent='Find a lesson';
    update();filter();
  };
  if(document.readyState==='complete')boot();else document.addEventListener('DOMContentLoaded',boot,{once:true});
})();

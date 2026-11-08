/* Additional lessons extend the seven-domain trail without replacing its pages. */
(() => {
  'use strict';
  const boot = () => {
    const lessons = window.AILiteracyMoreLessons;
    if (!lessons) return;
    const ids = Object.keys(lessons).map(Number).sort((a,b)=>a-b);
    const total = ids.length + 7;
    const extraKey = 'aiToolkitExtraLessons';
    const readIds = (key, valid) => {
      try { const value=JSON.parse(localStorage.getItem(key)||'[]');return Array.isArray(value)?[...new Set(value.filter(id=>Number.isInteger(id)&&valid.includes(id)))]:[]; } catch { return []; }
    };
    let completed = readIds(extraKey,ids), currentExtra=null, origin;
    const el=(tag,cls='',text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
    const modal=document.getElementById('moduleModal');
    const library=el('section','extra-lessons-section');library.id='moreLessons';library.setAttribute('aria-labelledby','moreLessonsTitle');
    const title=el('h3','','Optional practice');title.id='moreLessonsTitle';
    const disclosure=el('details','extra-lesson-disclosure');
    const toggle=el('summary','','Browse '+ids.length+' practice lessons');
    disclosure.append(toggle);
    library.append(title,disclosure);
    const grid=el('div','extra-lesson-grid');
    for(const id of ids){const data=lessons[id],card=el('article','extra-lesson-card');card.dataset.extraCard=id;card.dataset.lessonDomain=data.parentDomain;
      card.append(el('span','extra-eyebrow','LESSON '+id+' · '+window.AILiteracyLessons[data.parentDomain].title),el('h4','',data.title),el('p','',data.tagline));
      const open=el('button','extra-lesson-open','Open lesson →');open.type='button';open.dataset.extraLesson=id;card.append(open);grid.append(card);
    }
    disclosure.append(grid);document.querySelector('#modules .module-trail').after(library);
    let practiceOpened=false;
    toggle.addEventListener('click',()=>{practiceOpened=!disclosure.open;});
    const jump=el('button','extra-library-jump','Explore '+ids.length+' more lessons ↓');jump.type='button';
    jump.addEventListener('click',()=>{
      practiceOpened=true;
      disclosure.open=true;
      library.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
      toggle.focus({preventScroll:true});
    });
    document.querySelector('#modules .modules-intro').append(jump);
    const mainHeading=document.querySelector('#modules .modules-intro h2');if(mainHeading)mainHeading.textContent='Start with the seven foundation lessons';
    const intro=document.querySelector('#modules .modules-intro > p');if(intro)intro.textContent='Each lesson includes a discussion, real-life scenarios, a quiz, and an assessment. Use optional practice to work on a specific skill.';
    const badge=document.querySelector('.final-learning-badge');if(badge)badge.textContent=total+' lessons · 7 connected domains · interactive practice · progress saved on this device';
    document.querySelectorAll('#guide .guide-flow article')[2]?.querySelector('p')?.replaceChildren(document.createTextNode('Practise with questions, matching, and multiple-answer activities.'));
    document.querySelectorAll('#guide .guide-flow article')[3]?.querySelector('p')?.replaceChildren(document.createTextNode('Apply the ideas to new situations, then review feedback and retry.'));
    const summary=el('p','extra-progress-total');summary.id='allLessonProgress';summary.setAttribute('role','status');document.querySelector('#progress .progress-copy').append(summary);
    const progressSection=el('section','extra-progress-section');progressSection.setAttribute('aria-labelledby','extraProgressTitle');
    const progressTitle=el('h3');progressTitle.id='extraProgressTitle';const progressRows=el('div','extra-progress-list');
    progressSection.append(progressTitle,el('p','','Your follow-up lessons have their own saved completion records. You can open them in any order.'),progressRows);document.getElementById('progress').append(progressSection);
    const saveStatus=el('p','extra-save-status');saveStatus.setAttribute('role','status');progressSection.append(saveStatus);
    for(const id of ids){const b=el('button','extra-progress-row');b.type='button';b.dataset.extraLesson=id;b.append(el('span','',String(id).padStart(2,'0')),el('strong','',lessons[id].title),el('span','extra-progress-state','Open lesson →'));progressRows.append(b);}
    function update(){
      const core=readIds('aiToolkitCompletedModules',[1,2,3,4,5,6,7]);summary.textContent=`${core.length+completed.length} of ${total} lessons completed · Foundation: ${core.length}/7 · Follow-up: ${completed.length}/${ids.length}`;
      progressTitle.textContent=completed.length+' of '+ids.length+' follow-up lessons completed';
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
      modal.classList.add('show');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';document.getElementById('moduleClose').focus({preventScroll:true});
      container.scrollTop=0;
    }
    document.addEventListener('click',event=>{const button=event.target.closest('[data-extra-lesson]');if(button&&button.tagName==='BUTTON')open(Number(button.dataset.extraLesson));});
    new MutationObserver(()=>{if(currentExtra&&!modal.classList.contains('show')){currentExtra=null;delete modal.dataset.extraLesson;if(origin?.isConnected&&origin.getClientRects().length)origin.focus({preventScroll:true});}}).observe(modal,{attributes:true,attributeFilter:['class']});
    new MutationObserver(update).observe(document.getElementById('progressTitle'),{childList:true,characterData:true,subtree:true});
    window.addEventListener('storage',event=>{if(event.key===extraKey)completed=readIds(extraKey,ids);if([extraKey,'aiToolkitCompletedModules'].includes(event.key))update();});
    const search=document.getElementById('studioModuleSearch'),count=document.querySelector('.studio-search-count');
    const searchBox=document.querySelector('.studio-module-search');
    const topicLabel=el('label','lesson-topic-label','Topic');topicLabel.htmlFor='lessonDomainFilter';
    const topicFilter=el('select','lesson-topic-filter');topicFilter.id='lessonDomainFilter';
    const allOption=el('option','','All topics');allOption.value='';topicFilter.append(allOption);
    for(let domain=1;domain<=7;domain++){const option=el('option','',window.AILiteracyLessons[domain].title);option.value=String(domain);topicFilter.append(option);}
    searchBox.append(topicLabel,topicFilter);
    const coreCards=[...document.querySelectorAll('#modules .module-card')];
    for(const card of coreCards)card.dataset.lessonDomain=card.id.replace('module-','');
    function filter(){
      const term=search.value.trim().toLowerCase(),domain=topicFilter.value;
      const apply=card=>{const visible=card.textContent.toLowerCase().includes(term)&&(!domain||card.dataset.lessonDomain===domain);card.hidden=!visible;if(visible)card.style.removeProperty('display');else card.style.setProperty('display','none','important');return visible?1:0;};
      const coreVisible=coreCards.reduce((n,card)=>n+apply(card),0),extraVisible=[...grid.children].reduce((n,card)=>n+apply(card),0);
      library.hidden=extraVisible===0;jump.hidden=extraVisible===0;
      count.textContent=coreVisible+extraVisible?`${coreVisible+extraVisible} of ${total} lessons`:'No lessons found. Try another word or topic.';
      toggle.textContent='Browse '+extraVisible+' practice '+(extraVisible===1?'lesson':'lessons');
      disclosure.open=extraVisible>0&&(Boolean(term||domain)||practiceOpened);
      jump.textContent='Explore '+extraVisible+' more '+(extraVisible===1?'lesson':'lessons')+' ↓';
    }
    search.addEventListener('input',filter);topicFilter.addEventListener('change',filter);
    searchBox.querySelector('button').addEventListener('click',()=>{topicFilter.value='';filter();});
    document.querySelector('label[for="studioModuleSearch"]').textContent='Find a lesson';
    update();filter();
  };
  if(document.readyState==='complete')boot();else document.addEventListener('DOMContentLoaded',boot,{once:true});
})();

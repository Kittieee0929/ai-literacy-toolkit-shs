(() => {
  const boot=()=>{
    document.body.classList.add('studio-ui');
    const textButton=document.getElementById('studioTextToggle');
    let large=false;try{large=localStorage.getItem('aiToolkitLargeText')==='true'}catch{}
    const updateText=()=>{document.body.classList.toggle('studio-large-text',large);textButton?.setAttribute('aria-pressed',String(large));textButton?.setAttribute('aria-label',large?'Use standard text size':'Use larger text size')};
    updateText();textButton?.addEventListener('click',()=>{large=!large;try{localStorage.setItem('aiToolkitLargeText',String(large))}catch{}updateText()});
    document.querySelectorAll('[data-studio-module]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#module-'+button.dataset.studioModule+' .module-link')?.click()}));
    const trail=document.querySelector('#modules .module-trail');
    if(trail){
      const search=document.createElement('div');search.className='studio-module-search';
      search.innerHTML='<label for="studioModuleSearch">Find a module</label><input id="studioModuleSearch" type="search" placeholder="Try privacy, sources, or critical thinking" autocomplete="off"><span class="studio-search-count" role="status" aria-live="polite">7 modules</span><button type="button" aria-label="Clear module search">Clear</button>';
      trail.before(search);const input=search.querySelector('input'),cards=[...trail.querySelectorAll('.module-card')],count=search.querySelector('[role=status]');
      const filter=()=>{const q=input.value.trim().toLowerCase();let visible=0;for(const card of cards){const show=!q||card.textContent.toLowerCase().includes(q);card.hidden=!show;if(show)card.style.removeProperty('display');else card.style.setProperty('display','none','important');visible+=show?1:0}count.textContent=visible===0?'No modules found. Try another word.':visible+' of 7 modules';};
      input.addEventListener('input',filter);search.querySelector('button').addEventListener('click',()=>{input.value='';filter();input.focus()});
    }
    const bottom=document.querySelector('.studio-bottom-nav');
    const sync=()=>{const page=document.body.dataset.activePage||(location.hash||'#home').slice(1);bottom?.querySelectorAll('a').forEach(a=>{if(a.hash==='#'+page)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')})};
    new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['data-active-page']});window.addEventListener('hashchange',sync);sync();
    // The publication ratings describe the earlier evaluated version, not this UI refinement.
    const about=document.querySelector('#about .about-copy')||document.querySelector('#about');
    if(about){const note=document.createElement('p');note.className='studio-evaluation-note';note.textContent='Use the lessons at your own pace. Your practice answers and completed lessons stay in this browser.';about.appendChild(note)}
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();

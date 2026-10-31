(() => {
  'use strict';
  const lessons = window.AILiteracyLessons;
  const modal = document.getElementById('moduleModal');
  const main = document.getElementById('mainContent');
  const header = document.getElementById('plainHeader');
  const footer = document.querySelector('.plain-footer');
  const closeButton = document.getElementById('moduleClose');
  const cards = document.getElementById('lessonCards');
  const progressList = document.getElementById('progressLessons');
  const sizeButton = document.getElementById('textSizeButton');
  const completionKey = 'aiToolkitCompletedModules';
  let previousFocus;
  let currentLesson;
  const el = (tag, className = '', text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  function read(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || 'null');
      return Array.isArray(fallback) ? Array.isArray(value) ? value : fallback : value ?? fallback;
    } catch (_) { return fallback; }
  }
  function store(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch (_) { document.getElementById('storageStatus').textContent = 'This browser could not save your progress. You can still use the lessons.'; }
  }
  let completed = [...new Set(read(completionKey, []).map(Number))].filter(value => Number.isInteger(value) && value >= 1 && value <= 7);
  function resumeLesson() {
    const last = Number(read('aiToolkitLastModule', 1));
    if (Number.isInteger(last) && last >= 1 && last <= 7 && !completed.includes(last)) return last;
    return Object.values(lessons).find(lesson => !completed.includes(lesson.id))?.id || 1;
  }
  function updateProgress() {
    document.getElementById('progressTitle').textContent = completed.length + ' of 7 lessons completed';
    document.getElementById('progressFill').style.width = (completed.length / 7 * 100) + '%';
    document.querySelector('.plain-progress-track').setAttribute('aria-valuenow', String(completed.length));
    document.getElementById('progressMessage').textContent = completed.length === 7 ? 'All seven lessons completed. You can revisit any topic whenever you want.' : 'Next suggested lesson: ' + lessons[resumeLesson()].title + '.';
    document.getElementById('continueLearningBtn').textContent = completed.length === 7 ? 'Review a lesson' : 'Continue: ' + lessons[resumeLesson()].title;
    progressList.replaceChildren();
    for (const lesson of Object.values(lessons)) {
      const done = completed.includes(lesson.id);
      const row = el('button', 'plain-progress-row');
      row.type = 'button'; row.dataset.openLesson = lesson.id;
      row.append(el('span', 'plain-number', String(lesson.id).padStart(2, '0')), el('strong', '', lesson.title), el('span', 'plain-progress-status', done ? 'Completed ✓' : 'Open lesson →'));
      progressList.append(row);
      const card = cards.querySelector(`[data-lesson="${lesson.id}"]`);
      if (card) {
        card.querySelector('.lesson-card-status').textContent = done ? 'Completed ✓' : '4 parts · video · quiz · assessment';
        card.querySelector('button').textContent = done ? 'Review lesson →' : 'Open lesson →';
      }
    }
  }
  for (const lesson of Object.values(lessons)) {
    const card = el('article', 'plain-lesson-card');
    card.dataset.lesson = lesson.id;
    card.append(el('span', 'plain-card-number', String(lesson.id).padStart(2, '0')), el('h3', '', lesson.title), el('p', '', lesson.tagline), el('p', 'lesson-card-status', '4 parts · video · quiz · assessment'));
    const open = el('button', 'plain-secondary', 'Open lesson →');
    open.type = 'button'; open.dataset.openLesson = lesson.id;
    card.append(open); cards.append(card);
  }
  function openLesson(number) {
    const data = lessons[number];
    if (!data) return;
    previousFocus = document.activeElement;
    currentLesson = Number(number);
    store('aiToolkitLastModule', currentLesson);
    document.getElementById('moduleModalKicker').textContent = 'LESSON ' + String(number).padStart(2, '0');
    document.getElementById('moduleModalTitle').textContent = data.title;
    document.getElementById('moduleModalTagline').textContent = data.tagline;
    document.getElementById('modulePosition').textContent = 'Lesson ' + number + ' of 7';
    window.AILiteracyPlayer.render({ data, container: document.getElementById('moduleLessonContent'), navigation: document.querySelector('.module-step-nav'), progress: document.getElementById('moduleLessonProgress'), completed: completed.includes(currentLesson),
      onComplete: id => { if (!completed.includes(id)) completed.push(id); store(completionKey, completed); updateProgress(); },
      onNext: () => openLesson(Number(number) + 1),
      onFinish: () => { closeLesson(); location.hash = '#progress'; }
    });
    modal.classList.add('show'); modal.setAttribute('aria-hidden', 'false');
    [header, main, footer].forEach(node => { node.inert = true; });
    closeButton.focus({ preventScroll: true });
  }
  function closeLesson() {
    window.AILiteracyPlayer.stop();
    modal.classList.remove('show'); modal.setAttribute('aria-hidden', 'true');
    [header, main, footer].forEach(node => { node.inert = false; });
    const focus = previousFocus?.isConnected && !modal.contains(previousFocus) ? previousFocus : cards.querySelector(`[data-open-lesson="${currentLesson}"]`);
    focus?.focus({ preventScroll: true });
    currentLesson = null;
  }
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-open-lesson]');
    if (button) openLesson(Number(button.dataset.openLesson));
  });
  closeButton.addEventListener('click', closeLesson);
  modal.addEventListener('click', event => { if (event.target === modal) closeLesson(); });
  document.getElementById('continueLearningBtn').addEventListener('click', () => openLesson(resumeLesson()));
  document.addEventListener('keydown', event => {
    if (!modal.classList.contains('show')) return;
    if (event.key === 'Escape') { event.preventDefault(); closeLesson(); return; }
    if (event.key !== 'Tab') return;
    const targets = [...modal.querySelectorAll('button:not(:disabled), input:not(:disabled), a[href], video[controls], [tabindex="0"]')].filter(node => node.getClientRects().length && !node.closest('[hidden]'));
    const first = targets[0], last = targets[targets.length - 1];
    if (!first) return;
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  const pages = ['home', 'lessons', 'progress'];
  function route(focus = false) {
    let page = location.hash.slice(1) || 'home';
    if (page === 'modules') page = 'lessons';
    if (!pages.includes(page)) page = 'home';
    if (location.hash !== '#' + page) history.replaceState(null, '', '#' + page);
    if (modal.classList.contains('show')) closeLesson();
    document.querySelectorAll('.plain-page').forEach(node => { node.hidden = node.id !== page; });
    document.querySelectorAll('#navLinks a').forEach(link => {
      if (link.hash === '#' + page) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
    });
    document.body.dataset.page = page;
    updateProgress();
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (focus) document.querySelector('#' + page + ' h2, #' + page + ' h1')?.focus({ preventScroll: true });
  }
  window.addEventListener('hashchange', () => route(true));
  const search = document.getElementById('lessonSearch');
  function filterLessons() {
    const term = search.value.trim().toLowerCase();
    let count = 0;
    cards.querySelectorAll('.plain-lesson-card').forEach(card => {
      const data = lessons[card.dataset.lesson];
      const visible = (data.title + ' ' + data.tagline).toLowerCase().includes(term);
      card.hidden = !visible; if (visible) count++;
    });
    document.getElementById('searchStatus').textContent = count ? count + ' of 7 lessons' : 'No lessons found. Try a different word.';
  }
  search.addEventListener('input', filterLessons);
  document.getElementById('clearSearch').addEventListener('click', () => { search.value = ''; filterLessons(); search.focus(); });
  let large = read('aiToolkitLargeText', false) === true;
  function updateTextSize() {
    document.body.classList.toggle('studio-large-text', large);
    sizeButton.setAttribute('aria-pressed', String(large));
    sizeButton.setAttribute('aria-label', large ? 'Use standard text' : 'Use larger text');
  }
  sizeButton.addEventListener('click', () => { large = !large; store('aiToolkitLargeText', large); updateTextSize(); });
  document.getElementById('resetProgress').addEventListener('click', () => {
    if (!window.confirm('Reset your saved lesson progress and practice answers in this browser?')) return;
    for (const key of [completionKey, 'aiToolkitLastModule', 'aiLiteracyLessonStateV2', 'aiToolkitSimpleLessons', 'aiToolkitModuleChecks']) {
      try { localStorage.removeItem(key); } catch (_) { /* The interface remains usable without storage. */ }
    }
    completed = []; updateProgress();
  });
  updateTextSize(); route();
})();

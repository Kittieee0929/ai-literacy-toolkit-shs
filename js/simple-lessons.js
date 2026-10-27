(() => {
  'use strict';
  const stages = ['Introduction', 'Motivation', 'Discussion', 'Assessment'];
  const keys = ['introduction', 'motivation', 'discussion', 'assessment'];
  const storageKey = 'aiToolkitSimpleLessons';
  let activeController;

  function grade(questions, answers) {
    const results = questions.map((question, index) => Number.isInteger(answers[index]) && answers[index] === question.correct);
    return { results, score: results.filter(Boolean).length, passed: results.length > 0 && results.every(Boolean) };
  }
  function readSaved() {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey) || '{}');
      return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
    } catch (_) { return {}; }
  }
  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function paragraph(parent, text) { parent.append(element('p', '', text)); }
  function action(text, callback, className = '') {
    const button = element('button', className, text);
    button.type = 'button';
    button.addEventListener('click', callback);
    return button;
  }
  function article(parent, heading, text) {
    const section = element('section', 'simple-topic');
    section.append(element('h4', '', heading));
    paragraph(section, text);
    parent.append(section);
    return section;
  }

  function render({ number, data, evidence = [], container, navigation, progress, completed = false, onComplete, onNext, onFinish }) {
    activeController?.abort();
    activeController = new AbortController();
    const signal = activeController.signal;
    const content = window.AIToolkitLessonContent[number];
    if (!content) throw new Error('Missing lesson discussion for module ' + number);
    const questions = [data.quiz, ...content.questions];
    const saved = readSaved()[String(number)] || {};
    const answers = Array.isArray(saved.answers) ? questions.map((q, i) => Number.isInteger(saved.answers[i]) && saved.answers[i] >= 0 && saved.answers[i] < q.options.length ? saved.answers[i] : null) : questions.map(() => null);
    let submitted = Boolean(saved.submitted) && answers.every(Number.isInteger);
    let isCompleted = completed;
    let stage = Number.isInteger(saved.stage) && saved.stage >= 0 && saved.stage < stages.length ? saved.stage : 0;
    const modal = container.closest('#moduleModal');
    modal.classList.add('simple-module');
    container.dataset.simpleLesson = 'true';
    container.classList.remove('is-slide-module');
    container.replaceChildren();
    const lesson = element('div', 'simple-lesson');
    const counter = element('p', 'simple-stage-counter');
    counter.setAttribute('aria-live', 'polite');
    lesson.append(counter);
    const panels = stages.map((name, index) => {
      const panel = element('section', 'simple-panel');
      panel.id = 'simple-stage-' + keys[index];
      panel.setAttribute('aria-labelledby', panel.id + '-title');
      const title = element('h3', 'simple-stage-title', name);
      title.id = panel.id + '-title';
      title.tabIndex = -1;
      panel.append(title);
      lesson.append(panel);
      return panel;
    });
    const saveNote = element('p', 'simple-save-note', 'Progress is saved only in this browser on this device.');
    const save = () => {
      try {
        const all = readSaved();
        all[String(number)] = { stage, answers, submitted };
        localStorage.setItem(storageKey, JSON.stringify(all));
        saveNote.textContent = 'Progress is saved only in this browser on this device.';
      } catch (_) { saveNote.textContent = 'This browser could not save your practice answers. You can still use the lesson.'; }
    };

    paragraph(panels[0], data.tagline);
    paragraph(panels[0], content.intro);
    panels[0].append(element('h4', '', 'By the end, you should be able to:'));
    const objectives = element('ul', 'simple-objectives');
    data.objectives.forEach(text => objectives.append(element('li', '', text)));
    panels[0].append(objectives);
    const overview = article(panels[0], 'A simple way through this lesson', 'Read the introduction, consider one school situation, study the discussion, then answer three practice questions. You may move between sections at any time.');
    paragraph(overview, 'Use the section menu or the Next and Previous buttons. Complete the three-question assessment to update your learning passport.');
    if (isCompleted) paragraph(panels[0], 'You have already completed this module. You can review any section or try the questions again.');

    paragraph(panels[1], 'Start with this school situation. Think about your response before reading the suggested approach.');
    const scenario = article(panels[1], 'Imagine this', data.look[1]);
    scenario.classList.add('simple-scenario');
    paragraph(panels[1], 'What would you do first, and why? You can think about it or discuss it with a classmate; nothing needs to be submitted here.');
    const reasoning = element('div', 'simple-model');
    reasoning.id = 'simple-motivation-reasoning';
    reasoning.hidden = true;
    paragraph(reasoning, data.look[2]);
    paragraph(reasoning, 'Keep that decision in mind as you read the discussion. Look for the principle that would help you explain your choice.');
    const reveal = action('Show a suggested approach', () => {
      reasoning.hidden = !reasoning.hidden;
      reveal.textContent = reasoning.hidden ? 'Show a suggested approach' : 'Hide the suggested approach';
      reveal.setAttribute('aria-expanded', String(!reasoning.hidden));
    }, 'simple-secondary');
    reveal.setAttribute('aria-expanded', 'false');
    reveal.setAttribute('aria-controls', reasoning.id);
    panels[1].append(reveal, reasoning);

    paragraph(panels[2], content.intro);
    content.parts.forEach(([heading, text]) => article(panels[2], heading, text));
    const worked = article(panels[2], 'Putting it together: a school example', content.worked.situation);
    worked.classList.add('simple-worked-example');
    worked.append(element('h5', '', 'A responsible response'));
    paragraph(worked, content.worked.action);
    worked.append(element('h5', '', 'Why this works'));
    paragraph(worked, content.worked.reason);
    const routine = article(panels[2], 'A routine you can use: ' + data.tool.name, data.tool.description);
    const list = element('ul', 'simple-routine');
    data.tool.checklist.forEach(text => list.append(element('li', '', text)));
    routine.append(list);
    article(panels[2], 'Remember', content.takeaway);
    if (evidence.length) {
      const references = element('details', 'simple-references');
      references.append(element('summary', '', 'Lesson references'));
      const refs = element('ul');
      evidence.forEach(([author, title, href]) => {
        const item = element('li');
        const link = element('a', '', author + ' — ' + title);
        link.href = href;
        link.target = '_blank';
        link.rel = 'noopener';
        item.append(link);
        refs.append(item);
      });
      references.append(refs);
      panels[2].append(references);
    }

    paragraph(panels[3], 'Answer three questions to check your understanding. Get all three correct to mark the module complete. You can review the discussion and retry as often as you need.');
    const form = element('form', 'simple-assessment');
    const groups = questions.map((question, i) => {
      const fieldset = element('fieldset', 'simple-question');
      fieldset.append(element('legend', '', (i + 1) + '. ' + question.question));
      question.options.forEach((text, option) => {
        const label = element('label', 'simple-option');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'question-' + i;
        radio.value = String(option);
        radio.checked = answers[i] === option;
        radio.addEventListener('change', () => {
          answers[i] = option;
          submitted = false;
          feedbacks.forEach(node => { node.hidden = true; });
          result.textContent = '';
          completion.hidden = true;
          save();
        });
        label.append(radio, element('span', '', text));
        fieldset.append(label);
      });
      form.append(fieldset);
      return fieldset;
    });
    const feedbacks = groups.map(group => {
      const feedback = element('p', 'simple-question-feedback');
      feedback.hidden = true;
      group.append(feedback);
      return feedback;
    });
    const result = element('p', 'simple-assessment-result');
    result.setAttribute('role', 'status');
    result.setAttribute('aria-live', 'polite');
    result.tabIndex = -1;
    const submit = element('button', 'simple-primary', 'Check my answers');
    submit.type = 'submit';
    const completion = element('div', 'simple-completion');
    completion.hidden = true;
    const completeButton = action(isCompleted ? '✓ Module completed' : 'Mark module complete', () => {
      if (!grade(questions, answers).passed) return;
      onComplete();
      isCompleted = true;
      completeButton.textContent = '✓ Module completed';
      completeButton.disabled = true;
      nextModule.hidden = false;
      save();
    }, 'simple-primary');
    completeButton.disabled = isCompleted;
    const nextModule = action(number < 7 ? 'Next module →' : 'View my progress →', () => number < 7 ? onNext() : onFinish(), 'simple-secondary');
    nextModule.hidden = !isCompleted;
    completion.append(completeButton, nextModule);
    const showResult = () => {
      if (!answers.every(Number.isInteger)) {
        result.textContent = 'Choose an answer for each of the three questions, then check your answers.';
        completion.hidden = true;
        return;
      }
      submitted = true;
      const outcome = grade(questions, answers);
      outcome.results.forEach((correct, i) => {
        feedbacks[i].hidden = false;
        feedbacks[i].classList.toggle('is-correct', correct);
        feedbacks[i].textContent = (correct ? 'Correct. ' : 'Review this answer. ') + questions[i].feedback;
      });
      result.textContent = outcome.passed ? '3 of 3 correct. You can now mark this module complete.' : outcome.score + ' of 3 correct. Read the feedback, change the answers you want to revise, and check again.';
      completion.hidden = !outcome.passed;
      save();
    };
    form.addEventListener('submit', event => { event.preventDefault(); showResult(); result.focus({ preventScroll: false }); });
    form.append(submit, result, completion);
    panels[3].append(form);
    const review = action('Review the discussion', () => showStage(2, true), 'simple-secondary');
    panels[3].append(review);
    const controls = element('div', 'simple-lesson-controls');
    const previous = action('← Previous', () => showStage(stage - 1, true), 'simple-secondary');
    const next = action('Next: Motivation →', () => showStage(stage + 1, true), 'simple-primary');
    controls.append(previous, next);
    lesson.append(controls, saveNote);
    container.append(lesson);
    const buttons = [...navigation.querySelectorAll('[data-simple-step]')];
    function showStage(index, focus = false) {
      stage = Math.max(0, Math.min(index, stages.length - 1));
      panels.forEach((panel, i) => { panel.hidden = i !== stage; });
      buttons.forEach((button, i) => {
        button.classList.toggle('active', i === stage);
        if (i === stage) button.setAttribute('aria-current', 'step');
        else button.removeAttribute('aria-current');
      });
      counter.textContent = 'Part ' + (stage + 1) + ' of 4 · ' + stages[stage];
      previous.disabled = stage === 0;
      next.hidden = stage === stages.length - 1;
      next.textContent = stage < stages.length - 1 ? 'Next: ' + stages[stage + 1] + ' →' : '';
      if (progress) progress.style.width = ((stage + 1) / stages.length * 100) + '%';
      container.scrollTop = 0;
      if (focus) panels[stage].querySelector('h3').focus({ preventScroll: true });
      save();
    }
    navigation.addEventListener('click', event => {
      const button = event.target.closest('[data-simple-step]');
      if (button) showStage(Number(button.dataset.simpleStep), true);
    }, { signal });
    navigation.addEventListener('keydown', event => {
      const button = event.target.closest('[data-simple-step]');
      if (!button || !['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const index = Number(button.dataset.simpleStep);
      const target = event.key === 'Home' ? 0 : event.key === 'End' ? 3 : Math.max(0, Math.min(3, index + (['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1)));
      showStage(target);
      buttons[target].focus();
    }, { signal });
    if (submitted) showResult();
    showStage(stage);
  }
  window.AIToolkitSimpleLessons = { render, grade, stages: [...stages] };
})();

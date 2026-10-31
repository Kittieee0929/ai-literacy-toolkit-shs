(() => {
  'use strict';
  const stages = ['Discussion', 'Real-Life Scenarios', 'Quiz', 'Assessment'];
  const keys = ['discussion', 'scenarios', 'quiz', 'assessment'];
  const storageKey = 'aiLiteracyLessonStateV2';
  let controller;
  let activeContainer;
  const el = (tag, className = '', text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  function paragraphs(parent, text) {
    let group = [];
    for (const sentence of text.split(/(?<=[.!?])\s+(?=[A-Z])/)) {
      group.push(sentence);
      if (group.join(' ').split(/\s+/).length >= 70) {
        parent.append(el('p', '', group.join(' ')));
        group = [];
      }
    }
    if (group.length) parent.append(el('p', '', group.join(' ')));
  }
  function topic(parent, title, text) {
    const block = el('section', 'simple-topic');
    block.append(el('h4', '', title));
    if (text) paragraphs(block, text);
    parent.append(block);
    return block;
  }
  function button(label, callback, type = 'simple-secondary') {
    const node = el('button', type, label);
    node.type = 'button';
    node.addEventListener('click', callback);
    return node;
  }
  function grade(questions, answers) {
    const results = questions.map((question, i) => Number.isInteger(answers[i]) && answers[i] === question.correct);
    return { results, score: results.filter(Boolean).length, passed: results.length > 0 && results.every(Boolean) };
  }
  function normalizeAnswers(questions, answers) {
    return questions.map((question, i) => Array.isArray(answers) && Number.isInteger(answers[i]) && answers[i] >= 0 && answers[i] < question.options.length ? answers[i] : null);
  }
  function readState() {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey) || '{}');
      return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
    } catch (_) { return {}; }
  }
  function stop() {
    controller?.abort();
    activeContainer?.querySelectorAll('video').forEach(video => video.pause());
  }
  function render({ data, container, navigation, progress, completed, onComplete, onNext, onFinish }) {
    stop();
    controller = new AbortController();
    activeContainer = container;
    const signal = controller.signal;
    const saved = readState()[String(data.id)] || {};
    const quizAnswers = normalizeAnswers(data.quiz, saved.quizAnswers);
    const assessmentAnswers = normalizeAnswers(data.assessment, saved.assessmentAnswers);
    let submitted = saved.submitted === true && assessmentAnswers.every(Number.isInteger);
    let isCompleted = Boolean(completed);
    let stage = Number.isInteger(saved.stage) && saved.stage >= 0 && saved.stage < 4 ? saved.stage : 0;
    container.replaceChildren();
    const lesson = el('div', 'simple-lesson');
    const counter = el('p', 'simple-stage-counter');
    counter.setAttribute('aria-live', 'polite');
    lesson.append(counter);
    const panels = stages.map((title, i) => {
      const panel = el('section', 'simple-panel');
      panel.id = 'simple-stage-' + keys[i];
      const heading = el('h3', 'simple-stage-title', title);
      heading.id = panel.id + '-title';
      heading.tabIndex = -1;
      panel.setAttribute('aria-labelledby', heading.id);
      panel.append(heading);
      lesson.append(panel);
      return panel;
    });
    const saveNote = el('p', 'simple-save-note', 'Your answers and progress stay in this browser.');
    const save = () => {
      try {
        const all = readState();
        all[String(data.id)] = { stage, quizAnswers, assessmentAnswers, submitted };
        localStorage.setItem(storageKey, JSON.stringify(all));
        saveNote.textContent = 'Your answers and progress stay in this browser.';
      } catch (_) { saveNote.textContent = 'This browser could not save your answers. You can still use the lesson.'; }
    };

    paragraphs(panels[0], data.intro);
    const goals = topic(panels[0], 'What you will learn');
    const goalList = el('ul');
    data.objectives.forEach(text => goalList.append(el('li', '', text)));
    goals.append(goalList);
    data.parts.forEach(([title, text], i) => {
      topic(panels[0], title, text);
      if (i === 1) {
        const watch = el('section', 'lesson-video');
        watch.append(el('p', 'video-eyebrow', 'WATCH & UNDERSTAND'));
        watch.append(el('h4', '', data.video.title));
        const video = document.createElement('video');
        video.controls = true;
        video.playsInline = true;
        video.preload = 'none';
        video.poster = data.video.poster;
        video.src = data.video.src;
        video.tabIndex = 0;
        video.setAttribute('aria-label', data.video.title + ' — Code.org');
        const fallback = el('a', '', 'Watch this video on YouTube');
        fallback.href = data.video.youtube;
        video.append(fallback);
        const credit = el('div', 'video-credit');
        credit.append(el('span', '', 'Video by Code.org'));
        const link = el('a', '', 'Open on YouTube ↗');
        link.href = data.video.youtube;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        credit.append(link);
        const error = el('p', 'video-error', 'The player could not load this video. Use the YouTube link to watch it.');
        error.hidden = true;
        video.addEventListener('error', () => { error.hidden = false; });
        watch.append(video, credit, error);
        paragraphs(watch, data.video.focus);
        panels[0].append(watch);
      }
    });
    const ideas = topic(panels[0], 'Key ideas in plain language');
    data.keyIdeas.forEach(item => {
      ideas.append(el('h5', '', item.title));
      paragraphs(ideas, item.text);
    });
    const routine = topic(panels[0], 'A practical routine: ' + data.routine.name, data.routine.description);
    const list = el('ul');
    data.routine.checklist.forEach(text => list.append(el('li', '', text)));
    routine.append(list);
    topic(panels[0], 'The main idea to remember', data.takeaway);

    paragraphs(panels[1], 'See how the ideas apply at school, at work, and online. Think about what you would do, then compare your reasoning with the suggested response.');
    data.scenarios.forEach((scenario, index) => {
      const card = topic(panels[1], (index + 1) + '. ' + scenario.title, scenario.situation);
      card.classList.add('simple-scenario');
      card.append(el('h5', '', 'A responsible response'));
      paragraphs(card, scenario.action);
      card.append(el('h5', '', 'Why this matters'));
      paragraphs(card, scenario.why);
      paragraphs(card, scenario.question);
    });

    paragraphs(panels[2], 'Check the key ideas with three practice questions. Feedback appears as you choose an answer. You can change your choices and try again.');
    const quiz = el('div', 'simple-quiz');
    const quizStatus = el('p', 'simple-quiz-status');
    quizStatus.setAttribute('role', 'status');
    const showQuizSummary = () => {
      const answered = quizAnswers.filter(Number.isInteger).length;
      const score = grade(data.quiz, quizAnswers).score;
      quizStatus.textContent = answered < 3 ? answered + ' of 3 questions answered.' : score + ' of 3 correct. Review the feedback, then try the new situations in Assessment.';
    };
    data.quiz.forEach((question, i) => {
      const group = questionGroup(question, i, 'quiz', quizAnswers[i]);
      const feedback = el('p', 'simple-question-feedback');
      const update = () => {
        feedback.hidden = !Number.isInteger(quizAnswers[i]);
        const correct = quizAnswers[i] === question.correct;
        feedback.classList.toggle('is-correct', correct);
        feedback.textContent = (correct ? 'Correct. ' : 'Think about it again. ') + question.feedback;
      };
      group.addEventListener('change', event => {
        quizAnswers[i] = Number(event.target.value);
        update(); showQuizSummary(); save();
      });
      group.append(feedback); update(); quiz.append(group);
    });
    quiz.append(quizStatus);
    panels[2].append(quiz);
    showQuizSummary();

    paragraphs(panels[3], 'Apply the lesson to three new situations. Choose your answers, then submit the assessment. Answer all three correctly to complete the lesson; you can review and retry at any time.');
    const form = el('form', 'simple-assessment');
    const feedbacks = [];
    const result = el('p', 'simple-assessment-result');
    result.setAttribute('role', 'status');
    result.tabIndex = -1;
    const completion = el('div', 'simple-completion');
    const completeButton = button(isCompleted ? '✓ Lesson completed' : 'Complete lesson', () => {
      if (!submitted || !grade(data.assessment, assessmentAnswers).passed) return;
      onComplete(data.id);
      isCompleted = true;
      completeButton.textContent = '✓ Lesson completed';
      completeButton.disabled = true;
      nextLesson.hidden = false;
      save();
    }, 'simple-primary');
    completeButton.disabled = isCompleted;
    const nextLesson = button(data.id < 7 ? 'Next lesson →' : 'View my progress →', () => data.id < 7 ? onNext() : onFinish());
    nextLesson.hidden = !isCompleted;
    completion.append(completeButton, nextLesson);
    completion.hidden = !isCompleted;
    data.assessment.forEach((question, i) => {
      const group = questionGroup(question, i, 'assessment', assessmentAnswers[i]);
      const feedback = el('p', 'simple-question-feedback');
      feedback.hidden = true;
      feedbacks.push(feedback);
      group.addEventListener('change', event => {
        assessmentAnswers[i] = Number(event.target.value);
        submitted = false;
        feedbacks.forEach(node => { node.hidden = true; });
        result.textContent = '';
        completion.hidden = !isCompleted;
        save();
      });
      group.append(feedback); form.append(group);
    });
    const submit = el('button', 'simple-primary', 'Submit assessment');
    submit.type = 'submit';
    const showResult = () => {
      if (!assessmentAnswers.every(Number.isInteger)) {
        result.textContent = 'Choose an answer for each of the three situations before submitting.';
        return;
      }
      submitted = true;
      const outcome = grade(data.assessment, assessmentAnswers);
      outcome.results.forEach((correct, i) => {
        feedbacks[i].hidden = false;
        feedbacks[i].classList.toggle('is-correct', correct);
        feedbacks[i].textContent = (correct ? 'Correct. ' : 'Review this situation. ') + data.assessment[i].feedback;
      });
      result.textContent = outcome.passed ? '3 of 3 correct. You can now complete this lesson.' : outcome.score + ' of 3 correct. Use the explanations to revise your answers, then submit again.';
      completion.hidden = !outcome.passed && !isCompleted;
      save();
    };
    form.addEventListener('submit', event => { event.preventDefault(); showResult(); result.focus(); });
    form.append(submit, result, completion);
    panels[3].append(form, button('Review discussion', () => showStage(0, true)));
    const controls = el('div', 'simple-lesson-controls');
    const previous = button('← Previous', () => showStage(stage - 1, true));
    const next = button('Next →', () => showStage(stage + 1, true), 'simple-primary');
    controls.append(previous, next);
    lesson.append(controls, saveNote);
    container.append(lesson);
    const navButtons = [...navigation.querySelectorAll('[data-simple-step]')];
    function showStage(index, focus = false) {
      stage = Math.max(0, Math.min(index, 3));
      panels.forEach((panel, i) => { panel.hidden = i !== stage; });
      navButtons.forEach((item, i) => {
        item.classList.toggle('active', i === stage);
        if (i === stage) item.setAttribute('aria-current', 'step');
        else item.removeAttribute('aria-current');
      });
      counter.textContent = 'Part ' + (stage + 1) + ' of 4 · ' + stages[stage];
      progress.style.width = ((stage + 1) * 25) + '%';
      previous.disabled = stage === 0;
      next.hidden = stage === 3;
      next.textContent = stage < 3 ? 'Next: ' + stages[stage + 1] + ' →' : '';
      if (stage !== 0) container.querySelectorAll('video').forEach(video => video.pause());
      container.scrollTop = 0;
      if (focus) panels[stage].querySelector('h3').focus({ preventScroll: true });
      save();
    }
    navigation.addEventListener('click', event => {
      const target = event.target.closest('[data-simple-step]');
      if (target) showStage(Number(target.dataset.simpleStep), true);
    }, { signal });
    navigation.addEventListener('keydown', event => {
      const target = event.target.closest('[data-simple-step]');
      if (!target || !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const index = Number(target.dataset.simpleStep);
      const destination = event.key === 'Home' ? 0 : event.key === 'End' ? 3 : Math.max(0, Math.min(3, index + (['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1)));
      showStage(destination); navButtons[destination].focus();
    }, { signal });
    if (submitted) showResult();
    showStage(stage);
  }
  function questionGroup(question, index, prefix, selected) {
    const group = el('fieldset', 'simple-question');
    group.append(el('legend', '', (index + 1) + '. ' + question.question));
    question.options.forEach((text, option) => {
      const label = el('label', 'simple-option');
      const radio = document.createElement('input');
      radio.type = 'radio'; radio.name = prefix + '-' + index; radio.value = String(option); radio.checked = selected === option;
      label.append(radio, el('span', '', text)); group.append(label);
    });
    return group;
  }
  window.AILiteracyPlayer = { render, stop, grade, normalizeAnswers, stages: [...stages] };
})();

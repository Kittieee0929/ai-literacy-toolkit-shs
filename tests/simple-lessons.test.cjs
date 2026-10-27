const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '../js');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'lesson-content.js'), 'utf8'), context);
vm.runInNewContext(fs.readFileSync(path.join(root, 'simple-lessons.js'), 'utf8'), context);
const lessons = context.window.AIToolkitLessonContent;
const { grade, stages } = context.window.AIToolkitSimpleLessons;

test('all seven modules have expanded explanations, a worked example and two additional practice questions', () => {
  assert.equal(Object.keys(lessons).length, 7);
  for (const lesson of Object.values(lessons)) {
    const text = [lesson.intro, ...lesson.parts.map(part => part[1]), ...Object.values(lesson.worked), lesson.takeaway].join(' ');
    assert.ok(text.split(/\s+/).length >= 750);
    assert.ok(lesson.parts.length >= 9);
    assert.equal(lesson.questions.length, 2);
    for (const question of lesson.questions) {
      assert.equal(question.options.length, 3);
      assert.ok(Number.isInteger(question.correct) && question.correct >= 0 && question.correct < question.options.length);
      assert.ok(question.feedback.length > 40);
    }
  }
});

test('the lesson has exactly the four requested parts', () => {
  assert.deepEqual(Array.from(stages), ['Introduction', 'Motivation', 'Discussion', 'Assessment']);
});

test('missing, wrong and string-valued answers cannot mark an assessment complete', () => {
  const questions = [{ correct: 1 }, { correct: 2 }, { correct: 0 }];
  for (const answers of [[], [null, null, null], [1, 2], [0, 0, 0], ['1', '2', '0']]) {
    assert.equal(grade(questions, answers).passed, false);
  }
  assert.equal(grade(questions, [1, 2, 1]).score, 2);
});

test('a corrected attempt passes only when every answer is correct', () => {
  const questions = [{ correct: 1 }, { correct: 2 }, { correct: 0 }];
  const answers = [1, 2, 1];
  assert.equal(grade(questions, answers).passed, false);
  answers[2] = 0;
  assert.equal(grade(questions, answers).passed, true);
  assert.equal(grade(questions, answers).score, 3);
  assert.equal(grade([], []).passed, false);
});

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '../js');
const base = fs.readFileSync(path.join(root, 'script-base.js'), 'utf8');
const purpose = fs.readFileSync(path.join(root, 'purposeful-learning.js'), 'utf8');
const tools = fs.readFileSync(path.join(root, 'reusable-tools.js'), 'utf8');
function between(source, start, end) {
  const a = source.indexOf(start), b = source.indexOf(end, a + start.length);
  assert.ok(a >= 0 && b > a, 'Find the real implementation under test');
  return source.slice(a, b);
}

test('damaged or differently shaped saved data does not break startup', () => {
  const context = vm.createContext({ localStorage: { getItem: () => context.saved } });
  vm.runInContext(between(base, '    function readStoredJSON(', '    const menuBtn'), context);
  for (const saved of ['{broken', 'null', 'false', '12', '"text"', '[]']) {
    context.saved = saved;
    assert.equal(vm.runInContext('Object.keys(readStoredJSON("key", {})).length', context), 0);
  }
  for (const saved of ['{broken', 'null', '{}', '"text"']) {
    context.saved = saved;
    assert.equal(vm.runInContext('readStoredJSON("key", []).length', context), 0);
  }
  context.saved = '[1,3]';
  assert.equal(vm.runInContext('readStoredJSON("key", []).join(",")', context), '1,3');
  context.localStorage.getItem = () => { throw new Error('Storage unavailable'); };
  assert.equal(vm.runInContext('readStoredJSON("key", []).length', context), 0);
});

test('cancelling Reset preserves every saved activity; confirmed Reset clears learning data only', () => {
  const data = new Map([['aiToolkitMicroChecks', 'work'], ['aiToolkitDecisionLab', 'rule'], ['aiToolkitReusableTools', 'scan'], ['aiToolkitExtraLessons', '[8]'], ['unrelated', 'keep']]);
  const context = vm.createContext({
    confirmed: false, reloaded: false,
    localStorage: { removeItem: key => data.delete(key) },
    window: { confirm: () => context.confirmed, location: { reload: () => { context.reloaded = true; } } },
    resetToolkitBtn: { addEventListener: (_, callback) => { context.reset = callback; } }
  });
  vm.runInContext(between(base, '    const toolkitStorageKeys =', '    const challengeCases ='), context);
  vm.runInContext(between(base, '    resetToolkitBtn?.addEventListener("click"', '    function getResumeModule'), context);
  context.reset();
  assert.equal(data.size, 5);
  assert.equal(context.reloaded, false);
  assert.ok(!purpose.includes('resetToolkitBtn?.addEventListener("click"'));
  assert.ok(!tools.includes('resetToolkitBtn?.addEventListener("click"'));
  context.confirmed = true;
  context.reset();
  assert.deepEqual([...data], [['unrelated', 'keep']]);
  assert.equal(context.reloaded, true);
});

test('saved Decision Lab text is restored literally without becoming HTML', () => {
  const rule = '</textarea><img src=x onerror=alert(1)> & <b>my rule</b>';
  const textarea = { value: '' };
  const panel = { hidden: true, innerHTML: '', querySelector: () => textarea };
  const context = vm.createContext({
    labCases: { 1: { principle: 'Principle', consequence: 'Consequence', transfer: 'Transfer' } },
    labState: () => ({ 1: { rule } }), consequencePanel: panel
  });
  vm.runInContext(between(purpose, '        const renderConsequence =', '        purposePanel?.addEventListener'), context);
  vm.runInContext('renderConsequence(1, true)', context);
  assert.equal(textarea.value, rule);
  assert.ok(!panel.innerHTML.includes(rule));
  assert.ok(!panel.innerHTML.includes('<img'));
});

test('a newly rendered case locks actions synchronously until its own diagnosis is complete', () => {
  const buttons = [0, 1, 2].map(index => ({ dataset: { index }, disabled: false, classList: { contains: () => false }, addEventListener() {} }));
  const listeners = new Map();
  const answers = { innerHTML: '', querySelectorAll: () => buttons, addEventListener: (name, callback) => listeners.set(name, callback), dispatchEvent: event => listeners.get(event.type)?.() };
  const context = vm.createContext({
    Event, challengeAnswers: answers, currentChallenge: 0,
    challengeCases: [{ domain: 'Domain 2', scenario: 'Scenario', question: 'Question', options: ['A', 'B', 'C'] }],
    shuffledChoices: options => options.map((option, originalIndex) => ({ option, originalIndex })),
    challengeDomain: {}, challengeScenario: {}, challengeQuestion: {}, challengeCounter: {}, feedback: {},
    ensureLabPanels() {}, caseNumber: () => 2,
    labCases: { 2: { stakes: ['Evidence'], stake: 'Evidence' } }, labState: () => ({}),
    currentStakeUnlocked: true, purposePanel: { innerHTML: '' }, consequencePanel: {}, nextChallenge: {}
  });
  vm.runInContext(between(purpose, '        const renderLabReasoning =', '        const renderConsequence ='), context);
  const registration = purpose.match(/challengeAnswers\?\.addEventListener\("toolkit:challenge-rendered", renderLabReasoning\);/);
  assert.ok(registration);
  vm.runInContext(registration[0], context);
  vm.runInContext(between(base, '    function renderChallenge()', '    function trapFocusInside('), context);
  vm.runInContext('renderChallenge()', context);
  assert.ok(buttons.every(button => button.disabled));
  assert.equal(context.currentStakeUnlocked, false);
  assert.equal(context.nextChallenge.disabled, true);
});

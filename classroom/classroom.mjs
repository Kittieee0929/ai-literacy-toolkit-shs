import { activeRecently, classroomApi, configured } from './api.mjs';

const get = id => document.getElementById(id);
const status = get('status');
const config = window.AILiteracyClassroomConfig;
const loginButton = get('loginForm').querySelector('button');
const dialog = get('moduleModal');
const roster = get('roster');
const detail = get('studentDetail');
const lessons = { ...window.AILiteracyLessons, ...window.AILiteracyMoreLessons };
const lessonCount = Object.keys(lessons).length;
const activities = new Map();
const pending = new Map();
let api, profile, saveTimer, saving, savingItem, presenceTimer, detailVersion = 0, signingOut = false;

function el(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function showError(message) {
  status.textContent = message;
}

function submittedAnswers(questions, answers) {
  const list = el('ol', undefined, 'classroom-responses');
  questions.forEach((question, index) => {
    const answer = answers?.[index];
    const format = (items, option) => items[option] ?? 'Unanswered';
    let description = 'Unanswered';
    if (Number.isInteger(answer)) description = format(question.options, answer);
    else if (Array.isArray(answer)) {
      if (question.type === 'match') {
        description = question.pairs.map((pair, i) => pair + ' → ' + format(question.options, answer[i])).join(' · ');
      } else {
        const items = question.items || question.options;
        description = answer.map(option => format(items, option)).join(question.type === 'order' ? ' → ' : ' · ');
      }
    }
    const item = el('li');
    item.append(el('strong', question.question), el('p', description));
    list.append(item);
  });
  return list;
}

async function openStudent(row) {
  const request = ++detailVersion;
  detail.hidden = false;
  const heading = el('h3', row.display_name);
  detail.replaceChildren(heading, el('p', 'Loading progress…'));
  try {
    const rows = await api.request('/rest/v1/classroom_activity?select=*&student_id=eq.' + encodeURIComponent(row.student_id) + '&order=lesson_id');
    if (request !== detailVersion) return;
    detail.replaceChildren(heading, el('p', row.completed + ' of ' + lessonCount + ' lessons completed'));
    if (!rows.length) detail.append(el('p', 'This student has yet to open a lesson.'));
    for (const activity of rows) {
      const lesson = lessons[activity.lesson_id];
      if (!lesson) continue;
      const section = el('details', undefined, 'classroom-card');
      section.append(
        el('summary', lesson.title + (activity.completed ? ' · Completed' : ' · In progress')),
        el('p', 'Practice quiz · ' + activity.quiz_score + ' / ' + activity.quiz_total),
        el('p', activity.assessment_score === null
          ? 'Assessment awaiting submission'
          : 'Latest assessment · ' + activity.assessment_score + ' / ' + activity.assessment_total)
      );
      const quiz = el('details');
      quiz.append(el('summary', 'View quiz answers'), submittedAnswers(lesson.quiz, activity.state.quizAnswers));
      section.append(quiz);
      if (activity.assessment_answers) {
        const tasks = el('details');
        tasks.append(el('summary', 'View submitted assessment answers'), submittedAnswers(lesson.assessment, activity.assessment_answers));
        section.append(tasks);
      }
      detail.append(section);
    }
  } catch {
    if (request === detailVersion) detail.replaceChildren(heading, el('p', 'Progress could not load. Try opening this student again.'));
  }
}

async function loadRoster() {
  const current = profile;
  const rows = await api.request('/rest/v1/classroom_student_summary?select=*&order=display_name,student_id');
  if (current !== profile || signingOut) return;
  const cards = rows.map(row => {
    const card = el('article', undefined, 'classroom-roster-row');
    const copy = el('div');
    const activity = !row.last_seen_at ? 'Has yet to sign in' : activeRecently(row.last_seen_at) ? 'Active recently' : 'Last active ' + new Date(row.last_seen_at).toLocaleString();
    copy.append(el('strong', row.display_name), el('small', activity + ' · ' + row.completed + ' / ' + lessonCount + ' complete'));
    const button = el('button', 'View answers and scores');
    button.type = 'button';
    button.addEventListener('click', () => openStudent(row));
    card.append(copy, button);
    return card;
  });
  roster.replaceChildren(...(cards.length ? cards : [el('p', 'Create a student login to start your roster.')]));
}

function clearCredentials() {
  get('credentials').hidden = true;
  get('studentLogin').textContent = '';
  get('studentPassword').textContent = '';
}

function syncMessage(message, retry = false) {
  get('syncStatus').textContent = message;
  get('lessonSyncStatus').textContent = message;
  get('retrySave').hidden = !retry;
  get('retryLessonSave').hidden = !retry;
}

function updateStudentProgress() {
  get('studentProgress').textContent = [...activities.values()].filter(row => row.completed).length + ' of ' + lessonCount + ' lessons completed.';
  for (const node of get('student').querySelectorAll('[data-classroom-lesson]')) {
    const row = activities.get(Number(node.dataset.classroomLesson));
    node.querySelector('small').textContent = row?.completed ? 'Completed' : row ? 'In progress' : 'Open lesson';
  }
}

function enqueue(lessonId, state, completed) {
  const snapshots = pending.get(lessonId) || [];
  const latest = snapshots.at(-1);
  // Keep a submitted assessment when a draft edit follows it before the save completes.
  if (latest && latest !== savingItem && (state.submitted || !latest.state.submitted)) snapshots.pop();
  snapshots.push({ state: structuredClone(state), completed });
  pending.set(lessonId, snapshots);
  clearTimeout(saveTimer);
  syncMessage('Saving to Classroom…');
  saveTimer = setTimeout(flush, 400);
}

function flush() {
  if (saving) return saving;
  saving = (async () => {
    while (pending.size) {
      const [lessonId, snapshots] = pending.entries().next().value;
      const item = snapshots[0];
      savingItem = item;
      try {
        const result = await api.request('/rest/v1/rpc/classroom_save', {
          method: 'POST',
          body: {
            lesson_number: lessonId, expected_revision: activities.get(lessonId)?.revision || 0,
            lesson_state: item.state, finish_lesson: item.completed
          }
        });
        const row = Array.isArray(result) ? result[0] : result;
        if (!row?.revision) throw new Error('Missing save response.');
        activities.set(lessonId, row);
        snapshots.shift();
        if (!snapshots.length) pending.delete(lessonId);
        updateStudentProgress();
      } catch (error) {
        if (error.status === 409) syncMessage('This lesson changed in another session. Sign in again to load the latest saved work.');
        else syncMessage('Answers are waiting to sync. Check your connection and retry.', true);
        return false;
      } finally {
        savingItem = undefined;
      }
    }
    syncMessage('Saved to Classroom.');
    return true;
  })().finally(() => { saving = undefined; });
  return saving;
}

async function openLesson(lesson, button) {
  button.disabled = true;
  try {
    if (pending.size && !await flush()) return;
    if (signingOut || profile?.role !== 'student') return;
    const row = activities.get(lesson.id);
    get('classroomLessonTitle').textContent = lesson.title;
    get('classroomLessonTagline').textContent = lesson.tagline;
    window.AILiteracyPlayer.render({
      data: lesson, container: get('moduleLessonContent'), navigation: dialog.querySelector('.module-step-nav'),
      progress: get('moduleLessonProgress'), completed: row?.completed, hasNext: false,
      onComplete: () => {}, onFinish: () => dialog.close(),
      persistence: { state: row?.state, save: (state, completed) => enqueue(lesson.id, state, completed) }
    });
    dialog.showModal();
    dialog.classList.add('show');
    get('moduleLessonContent').scrollTop = 0;
    get('moduleClose').focus({ preventScroll: true });
  } finally {
    button.disabled = false;
  }
}

async function updatePresence() {
  if (profile?.role !== 'student' || document.hidden || signingOut) return;
  try {
    await api.request('/rest/v1/rpc/classroom_presence', { method: 'POST', body: {} });
  } catch {
    // The lesson save flow reports errors. Presence is best effort.
  }
}

async function loadStudent() {
  const rows = await api.request('/rest/v1/classroom_activity?select=*&student_id=eq.' + encodeURIComponent(profile.id));
  for (const row of rows) activities.set(row.lesson_id, row);
  for (const lesson of Object.values(lessons)) {
    const button = el('button');
    button.type = 'button';
    button.dataset.classroomLesson = lesson.id;
    button.append(el('strong', lesson.title), el('small'));
    button.addEventListener('click', () => openLesson(lesson, button));
    get(lesson.id <= 7 ? 'foundationLessons' : 'optionalLessons').append(button);
  }
  updateStudentProgress();
  updatePresence();
  presenceTimer = setInterval(updatePresence, 90_000);
}

function clearClassroom() {
  clearTimeout(saveTimer);
  clearInterval(presenceTimer);
  ++detailVersion;
  profile = undefined;
  activities.clear();
  pending.clear();
  clearCredentials();
  roster.replaceChildren();
  detail.replaceChildren();
  detail.hidden = true;
  get('foundationLessons').replaceChildren();
  get('optionalLessons').replaceChildren();
  get('moduleLessonContent').replaceChildren();
  get('studentProgress').textContent = '';
  syncMessage('');
  get('teacher').hidden = true;
  get('student').hidden = true;
  get('signOut').hidden = true;
  get('login').hidden = false;
}

get('loginForm').addEventListener('submit', async event => {
  event.preventDefault();
  if (!api || loginButton.disabled) return;
  loginButton.disabled = true;
  showError('Signing in…');
  const password = get('password').value;
  get('password').value = '';
  try {
    const id = await api.signIn(get('identifier').value, password);
    const profiles = await api.request('/rest/v1/classroom_profiles?select=id,role&id=eq.' + encodeURIComponent(id));
    profile = profiles[0];
    if (!profile) throw new Error('This account has not been enrolled in Classroom.');
    await (profile.role === 'teacher' ? loadRoster() : loadStudent());
    get(profile.role).hidden = false;
    get('login').hidden = true;
    get('signOut').hidden = false;
    showError('');
  } catch (error) {
    await api.signOut().catch(() => {});
    clearClassroom();
    showError(error.status === 400 || error.status === 401
      ? 'The login or password could not be verified.'
      : error.status ? 'The classroom service is unavailable. Try again later.' : error.message);
  } finally {
    loginButton.disabled = false;
  }
});

get('createStudent').addEventListener('submit', async event => {
  event.preventDefault();
  const button = event.currentTarget.querySelector('button[type="submit"]');
  button.disabled = true;
  clearCredentials();
  try {
    const result = await api.request('/functions/v1/create-classroom-student', {
      method: 'POST', body: { displayName: get('displayName').value.trim() }
    });
    if (signingOut || profile?.role !== 'teacher') return;
    get('studentLogin').textContent = result.login;
    get('studentPassword').textContent = result.password;
    get('credentials').hidden = false;
    get('displayName').value = '';
    showError('Student login created.');
    try { await loadRoster(); } catch { showError('Login created. Refresh the roster to see the new student.'); }
  } catch {
    showError('Could not create a student login. Check the roster before trying again.');
  } finally {
    button.disabled = false;
  }
});

get('changePassword').addEventListener('submit', async event => {
  event.preventDefault();
  const button = event.currentTarget.querySelector('button');
  const password = get('newPassword').value;
  get('newPassword').value = '';
  button.disabled = true;
  try {
    await api.request('/auth/v1/user', { method: 'PUT', body: { password } });
    showError('Password updated.');
  } catch {
    showError('Password could not be changed. Try signing in again first.');
  } finally {
    button.disabled = false;
  }
});

get('signOut').addEventListener('click', async event => {
  const button = event.currentTarget;
  button.disabled = true;
  signingOut = true;
  if (pending.size && !await flush() && !window.confirm('Some answers are unsaved. Sign out anyway?')) {
    signingOut = false;
    button.disabled = false;
    return;
  }
  await api.signOut().catch(() => {});
  clearClassroom();
  get('identifier').value = '';
  signingOut = false;
  button.disabled = false;
  showError('Signed out.');
});

get('dismissCredentials').addEventListener('click', clearCredentials);
get('refreshRoster').addEventListener('click', async event => {
  const button = event.currentTarget;
  button.disabled = true;
  try { await loadRoster(); showError('Roster updated.'); }
  catch { showError('The roster could not refresh.'); }
  finally { button.disabled = false; }
});
get('retrySave').addEventListener('click', flush);
get('retryLessonSave').addEventListener('click', flush);
get('moduleClose').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => {
  dialog.classList.remove('show');
  window.AILiteracyPlayer.stop();
  if (pending.size) flush();
});
document.addEventListener('visibilitychange', updatePresence);
window.addEventListener('beforeunload', event => {
  if (pending.size) event.preventDefault();
});

if (configured(config)) {
  api = classroomApi(config);
  loginButton.disabled = false;
} else {
  showError('Classroom sign-in will be available after the school’s account service is connected.');
}

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { activeRecently, classroomApi, configured, loginEmail } from '../classroom/api.mjs';

const config = { url: 'https://classroom.example', publishableKey: 'sb_publishable_sample' };

test('student IDs map to a synthetic email and teacher emails stay usable', () => {
  assert.equal(loginEmail(' STUDENT-0123456789ABCDEF '), 'student-0123456789abcdef@students.toolkit.example');
  assert.equal(loginEmail(' Teacher@School.Example '), 'teacher@school.example');
  assert.throws(() => loginEmail('student-missing'));
  assert.equal(configured(config), true);
  assert.equal(configured({ ...config, publishableKey: 'sb_secret_sample' }), false);
  assert.equal(configured({ ...config, url: 'http://classroom.example' }), false);
});

test('activity is recent for a five minute window', () => {
  const now = Date.parse('2026-11-08T14:00:00Z');
  assert.equal(activeRecently('2026-11-08T13:55:00Z', now), true);
  assert.equal(activeRecently('2026-11-08T13:54:59Z', now), false);
  assert.equal(activeRecently(null, now), false);
});

test('concurrent API requests share token refresh and sign-out clears access', async () => {
  const calls = [];
  const reply = data => Response.json(data);
  const auth = (token, expires) => reply({ access_token: token, refresh_token: 'refresh', expires_in: expires, user: { id: 'test' } });
  const api = classroomApi(config, async (url, options) => {
    calls.push({ url, ...options });
    if (url.endsWith('grant_type=password')) return auth('first', 1);
    if (url.endsWith('grant_type=refresh_token')) return auth('updated', 3600);
    return reply([]);
  });
  assert.equal(await api.signIn('student-0123456789abcdef', 'synthetic-test-password'), 'test');
  assert.equal(JSON.parse(calls[0].body).email, 'student-0123456789abcdef@students.toolkit.example');
  await Promise.all([api.request('/rest/v1/one'), api.request('/rest/v1/two')]);
  assert.equal(calls.filter(call => call.url.endsWith('grant_type=refresh_token')).length, 1);
  assert.ok(calls.filter(call => call.url.includes('/rest/')).every(call => call.headers.authorization === 'Bearer updated'));
  await api.signOut();
  await assert.rejects(api.request('/rest/v1/one'), /Sign in first/);
});

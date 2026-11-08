import assert from 'node:assert/strict';
import { test } from 'node:test';

let handle;
const origin = 'https://toolkit.example';
globalThis.Deno = {
  env: { get: key => ({
    SUPABASE_URL: 'https://database.example', SUPABASE_SERVICE_ROLE_KEY: 'test-server-key', CLASSROOM_ORIGIN: origin
  })[key] },
  serve: handler => { handle = handler; }
};
await import('../supabase/functions/create-classroom-student/index.ts');

const request = ({ from = origin, token = 'valid-test-token', name = 'Synthetic Student' } = {}) =>
  new Request('https://database.example/functions/v1/create-classroom-student', {
    method: 'POST', headers: { origin: from, authorization: 'Bearer ' + token, 'content-type': 'application/json' },
    body: JSON.stringify({ displayName: name })
  });

test('enrolment verifies the session and teacher role before admin calls', async () => {
  const originalFetch = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    if (url.endsWith('/auth/v1/user')) return Response.json({ id: 'test-caller' });
    if (url.includes('classroom_profiles?')) return Response.json([{ role: 'student' }]);
    throw new Error('Unexpected call');
  };
  try {
    assert.equal((await handle(request({ from: 'https://untrusted.example' }))).status, 403);
    assert.equal(calls.length, 0);
    assert.equal((await handle(request())).status, 403);
    assert.equal(calls.length, 2);
    assert.equal(calls[0].options.headers.authorization, 'Bearer valid-test-token');
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('only a teacher can enrol a new student, and a failed profile write rolls back Auth', async () => {
  const originalFetch = globalThis.fetch;
  const calls = [];
  let profileOK = true;
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    if (url.endsWith('/auth/v1/user')) return Response.json({ id: 'teacher-test' });
    if (url.includes('classroom_profiles?')) return Response.json([{ role: 'teacher' }]);
    if (url.endsWith('/admin/users')) return Response.json({ id: 'student-test' });
    if (url.endsWith('/classroom_profiles')) return Response.json({}, { status: profileOK ? 201 : 500 });
    if (url.endsWith('/admin/users/student-test') && options.method === 'DELETE') return Response.json({});
    throw new Error('Unexpected call');
  };
  try {
    const response = await handle(request());
    assert.equal(response.status, 201);
    assert.equal(response.headers.get('cache-control'), 'no-store');
    const credentials = await response.json();
    assert.match(credentials.login, /^student-[0-9a-f]{16}$/);
    assert.ok(credentials.password.length >= 12);
    assert.deepEqual(JSON.parse(calls[3].options.body), {
      id: 'student-test', role: 'student', teacher_id: 'teacher-test', display_name: 'Synthetic Student'
    });
    profileOK = false;
    assert.equal((await handle(request())).status, 502);
    assert.equal(calls.at(-1).options.method, 'DELETE');
  } finally {
    globalThis.fetch = originalFetch;
  }
});

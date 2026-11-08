const studentDomain = 'students.toolkit.example';

export function loginEmail(identifier) {
  const value = identifier.trim().toLowerCase();
  if (/^student-[a-f0-9]{16}$/.test(value)) return value + '@' + studentDomain;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return value;
  throw new Error('Enter your school email or the student login ID from your teacher.');
}

export function activeRecently(lastSeen, now = Date.now()) {
  const timestamp = Date.parse(lastSeen);
  return Number.isFinite(timestamp) && timestamp >= now - 5 * 60_000;
}

export function configured(config) {
  if (typeof config?.publishableKey !== 'string' || !/^sb_publishable_[A-Za-z0-9_-]+$/.test(config.publishableKey)) return false;
  try {
    const url = new URL(config.url);
    return url.protocol === 'https:' && url.pathname === '/' && !url.username && !url.password && !url.search && !url.hash;
  } catch {
    return false;
  }
}

export function classroomApi(config, fetcher = fetch) {
  const base = config.url.replace(/\/$/, '');
  let session, refreshing;
  const send = async (path, { token, method = 'GET', body } = {}) => {
    const headers = { apikey: config.publishableKey };
    if (token) headers.authorization = 'Bearer ' + token;
    if (body !== undefined) headers['content-type'] = 'application/json';
    const response = await fetcher(base + path, {
      method, headers, cache: 'no-store', credentials: 'omit', redirect: 'error',
      signal: AbortSignal.timeout(15_000),
      body: body === undefined ? undefined : JSON.stringify(body)
    });
    const data = response.status === 204 ? null : await response.json().catch(() => null);
    if (!response.ok) {
      const error = new Error('The classroom service could not finish the request.');
      error.status = response.status;
      throw error;
    }
    return data;
  };
  function accept(data) {
    if (!data?.access_token || !data.refresh_token || !data.user?.id) throw new Error('The sign-in response was incomplete.');
    session = { token: data.access_token, refresh: data.refresh_token, id: data.user.id, expires: Date.now() + data.expires_in * 1000 };
    return session.id;
  }
  async function accessToken() {
    if (!session) throw new Error('Sign in first.');
    if (session.expires > Date.now() + 45_000) return session.token;
    if (!refreshing) {
      refreshing = send('/auth/v1/token?grant_type=refresh_token', {
        method: 'POST', body: { refresh_token: session.refresh }
      }).then(accept).finally(() => { refreshing = undefined; });
    }
    await refreshing;
    return session.token;
  }
  return {
    async signIn(identifier, password) {
      return accept(await send('/auth/v1/token?grant_type=password', {
        method: 'POST', body: { email: loginEmail(identifier), password }
      }));
    },
    async request(path, options) {
      return send(path, { ...options, token: await accessToken() });
    },
    async signOut() {
      try {
        if (refreshing) await refreshing;
        if (session) await send('/auth/v1/logout?scope=local', { method: 'POST', token: session.token });
      } finally {
        session = undefined;
      }
    }
  };
}

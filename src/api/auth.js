/**
 * src/api/auth.js
 *
 * Minimal frontend auth helper using fetch and localStorage.
 * Adjust endpoints to match your backend (defaults assume /api/auth/*).
 */

const API_BASE = process.env.REACT_APP_API_URL || '/api';
const AUTH_BASE = `${API_BASE}/auth`;

const ACCESS_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';

function saveTokens({ accessToken, refreshToken }) {
  if (accessToken) localStorage.setItem(ACCESS_KEY, accessToken);
  if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken);
}

function clearTokens() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

function getAccessToken() {
  return localStorage.getItem(ACCESS_KEY);
}

function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}

async function request(path, opts = {}, { retry = true } = {}) {
  const headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});
  const accessToken = getAccessToken();
  if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;

  const res = await fetch(`${path.startsWith('http') ? path : AUTH_BASE + path}`, {
    ...opts,
    headers,
  });

  if (res.status === 401 && retry) {
    // try refresh flow once
    const refreshed = await refreshToken();
    if (refreshed) {
      return request(path, opts, { retry: false });
    }
  }

  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }

  if (!res.ok) {
    const err = new Error(data?.message || res.statusText || 'Request failed');
    err.status = res.status;
    err.body = data;
    throw err;
  }

  return data;
}

// Public API

// register: expects { name?, email, password, ... }
export async function register(payload) {
  return request('/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// login: expects { email, password }
// on success backend should return { accessToken, refreshToken, user? }
export async function login(credentials) {
  const data = await request('/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  if (data?.accessToken || data?.refreshToken) {
    saveTokens(data);
  }
  return data;
}

export async function logout() {
  try {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      await fetch(`${AUTH_BASE}/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
    }
  } catch (e) {
    // ignore network errors on logout
  } finally {
    clearTokens();
  }
}

export async function getCurrentUser() {
  return request('/me', { method: 'GET' });
}

export async function refreshToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;
  try {
    const res = await fetch(`${AUTH_BASE}/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data?.accessToken || data?.refreshToken) saveTokens(data);
    return data;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return !!getAccessToken();
}
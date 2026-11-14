// Thin client for the Django REST API. Falls back to localhost in dev.

const BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json();
}

async function post(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Request failed');
  }
  return res.json();
}

export const api = {
  getCauses: () => get('/causes/'),
  getProgrammes: () => get('/programmes/'),
  getEvents: () => get('/events/'),
  getNews: () => get('/news/'),
  getPages: () => get('/pages/'),
  getSiteSettings: () => get('/site-settings/'),
  sendContact: (data) => post('/contact/', data),
  subscribeNewsletter: (email) => post('/newsletter/', { email }),
};

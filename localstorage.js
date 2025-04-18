const KEY = 'costData';

export function saveToLocal(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function loadFromLocal() {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

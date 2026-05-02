const STORAGE_KEY = 'bubu-dudu-save-v1';

const defaultSave = () => ({
  version: 1,
  foundStickers: {},
  level1Complete: false,
  level2Complete: false,
});

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSave();
    const parsed = JSON.parse(raw);
    if (parsed?.version !== 1) return defaultSave();
    return { ...defaultSave(), ...parsed };
  } catch {
    return defaultSave();
  }
}

let saveData = load();
let saveTimer = null;
const listeners = new Set();

function persist() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
    } catch {}
  }, 80);
}

function notify() {
  for (const cb of listeners) cb(saveData);
}

export const state = {
  get() { return saveData; },
  isFound(id) { return !!saveData.foundStickers[id]; },
  markFound(id) {
    if (!saveData.foundStickers[id]) {
      saveData.foundStickers[id] = true;
      persist();
      notify();
    }
  },
  setLevelComplete(level) {
    const key = level === 1 ? 'level1Complete' : 'level2Complete';
    if (!saveData[key]) {
      saveData[key] = true;
      persist();
      notify();
    }
  },
  reset() {
    saveData = defaultSave();
    persist();
    notify();
  },
  on(cb) { listeners.add(cb); return () => listeners.delete(cb); },
};

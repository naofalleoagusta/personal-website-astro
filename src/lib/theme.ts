// Theme switching for the browser. The no-flash bootstrap in BaseHead.astro mirrors
// `readTheme` inline, so keep the storage key and legacy mapping in sync with it.
export const THEMES = ['ember-dark', 'ember-light'] as const;
export type Theme = (typeof THEMES)[number];

const STORAGE_KEY = 'theme';
const LEGACY: Record<string, Theme> = { dark: 'ember-dark', light: 'ember-light' };

export function isTheme(value: string): value is Theme {
  return (THEMES as readonly string[]).includes(value);
}

export function readTheme(): Theme {
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    // storage blocked: fall through to the default
  }
  if (stored && isTheme(stored)) return stored;
  return (stored && LEGACY[stored]) || 'ember-dark';
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll('[data-theme-label]').forEach((el) => (el.textContent = theme));
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // storage blocked: theme still applies for this page
  }
  applyTheme(theme);
}

export function cycleTheme() {
  const current = readTheme();
  setTheme(THEMES[(THEMES.indexOf(current) + 1) % THEMES.length]);
}

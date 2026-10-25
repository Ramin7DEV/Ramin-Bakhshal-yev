// Browser UI colour (mobile address bar, manifest). Mirrors --live-bone in each theme of src/styles/tokens.css;
// the server needs literal values, so keep these two in sync with the tokens.
export const THEME_COLOR = '#EBE7DD';
export const THEME_COLOR_DARK = '#191713';

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';

// Runs in <head> before first paint: a stored choice wins, otherwise the system preference.
// Setting data-theme here (not after hydration) is what keeps the first paint free of a light-to-dark flash.
export const THEME_SCRIPT =
  `(function(){var d=document.documentElement,t=null;` +
  `try{t=localStorage.getItem('${THEME_STORAGE_KEY}')}catch(e){}` +
  `if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';` +
  `d.setAttribute('data-theme',t)})();`;

export function readTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function readStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

export function storeTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode or blocked storage: the choice simply lasts for this page view
  }
}

// The address-bar colour follows the page, read from the token so it never drifts from the CSS
export function syncThemeColor() {
  const color = getComputedStyle(document.documentElement).getPropertyValue('--live-bone').trim();
  if (!color) return;
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => meta.setAttribute('content', color));
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  syncThemeColor();
}

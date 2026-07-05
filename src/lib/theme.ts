export const THEME_STORAGE_KEY = "theme";

export type Theme = "light" | "dark";

export function noFlashThemeScript(): string {
  return `(function(){try{var k='${THEME_STORAGE_KEY}';var s=localStorage.getItem(k);var t=(s==='light'||s==='dark')?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;
}

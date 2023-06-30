import { theme } from '$lib/js/store';
export type Themes = 'dark' | 'light' | 'os-pref';
export const themes: Record<Themes, string> = {
	dark: 'Dark',
	light: 'Light',
	['os-pref']: 'OS Preference',
};
export function setTheme(id: Themes) {
	theme.set(id);
}

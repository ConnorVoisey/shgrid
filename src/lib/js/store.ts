import { writable, type Writable } from 'svelte/store';
import type { Themes } from './theme';
import { browser } from '$app/environment';

export const theme: Writable<Themes> = writable(
	browser ? (localStorage.getItem('theme') as Themes) ?? 'os-pref' : 'os-pref',
);
theme.subscribe(value => {
	if (browser) {
		localStorage.setItem('theme', value === 'dark' ? 'dark' : 'light');

		return (localStorage.userId = value);
	}
});

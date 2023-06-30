<script lang="ts">
	import { theme } from '$lib/js/store';
	import { setTheme, type Themes } from '$lib/js/theme';
	import { onDestroy } from 'svelte';

	import { onMount } from 'svelte';

	let root: Element | null = null;
	let selectedTheme: Themes;
	const unsubscribe = theme.subscribe(value => (selectedTheme = value));
	onDestroy(unsubscribe);
	onMount(async () => {
		root = document.querySelector(':root');
		if (selectedTheme === 'os-pref') {
			if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
				setTheme('dark');
			} else {
				setTheme('light');
			}
		}
		root?.classList.add(selectedTheme);
	});
</script>

<label class="theme-selector-wrapper">
	<input
		type="checkbox"
		name="theme-selector"
		id="theme-selector"
		checked={$theme == 'light'}
		on:click={() => {
			setTheme($theme == 'light' ? 'dark' : 'light');
			for (let theme of ['light', 'dark']) {
				root?.classList.remove(theme);
			}
			root?.classList.add($theme);
		}}
	/>
	<span>
		{#if $theme == 'dark'}
			<svg fill="none" stroke="var(--svg-color)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
				/>
			</svg>
		{:else}
			<svg fill="none" stroke="var(--svg-color)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
				/>
			</svg>
		{/if}
	</span>
</label>

<style lang="scss">
	label.theme-selector-wrapper {
		--circle-diameter: 2rem;
		--svg-color: rgb(var(--color-surface-300));
		display: grid;
		align-items: center;
		justify-content: center;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		padding: var(--size-1);
		width: calc((var(--circle-diameter) * 2) + 2 * (var(--size-1) + var(--size-1)));
		background-color: rgb(var(--color-surface-50));
		border: solid var(--size-1) var(--svg-color);
		box-sizing: border-box;
		border-radius: 100vh;
		cursor: pointer;

		input[type='checkbox'] {
			grid-area: 1 / 1 / 2 / 2;
			opacity: 0;
			height: 0;
			width: 0;
			&:checked + span {
				--svg-color: rgb(var(--color-primary-300));
				transform: translateX(calc(1 * var(--circle-diameter))) rotate(360deg);
			}
		}
		span {
			grid-area: 1 / 1 / 2 / 2;
			transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
			transform: translateX(0);
			border-radius: 50%;
			&,
			svg {
				width: var(--circle-diameter);
				height: var(--circle-diameter);
			}
		}
	}
</style>

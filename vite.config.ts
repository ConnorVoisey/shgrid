import { defineConfig } from 'vitest/config';
import Icons from 'unplugin-icons/vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit(), Icons({ compiler: 'svelte' })],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});

import { spawn } from 'child_process';
import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import css from 'rollup-plugin-css-only';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true,
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		},
	};
}

export default [
	{
		input: '../src/lib/shgrid.svelte',
		output: {
			sourcemap: true,
			format: 'esm',
			file: 'dist/shgrid.js',
		},
		plugins: [
			svelte({
				preprocess: sveltePreprocess(),
				compilerOptions: {
					// enable run-time checks when not in production
					dev: !production,
				},
			}),
			// we'll extract any component CSS out into
			// a separate file - better for performance
			css({ output: 'bundle.css' }),

			// If you have external dependencies installed from
			// npm, you'll most likely need these plugins. In
			// some cases you'll need additional configuration -
			// consult the documentation for details:
			// https://github.com/rollup/plugins/tree/master/packages/commonjs
			resolve({
				browser: true,
				dedupe: ['svelte'],
				exportConditions: ['svelte'],
			}),
			commonjs(),
			typescript(),

			// In dev mode, call `npm run start` once
			// the bundle has been generated
			!production && serve(),

			// Watch the `public` directory and refresh the
			// browser on changes when not in production
			!production && livereload('public'),

			// If we're building for production (npm run build
			// instead of npm run dev), minify
			production && terser(),
		],
		watch: {
			clearScreen: false,
		},
		// external: ['svelte/internal'],
	},
	{
		input: '../src/lib/default-styles.scss',
		output: {
			file: 'dist/default-styles.css',
		},
		plugins: [
			scss({
				failOnError: true,
				fileName: 'default-styles.css',
			}),
		],
	},
];

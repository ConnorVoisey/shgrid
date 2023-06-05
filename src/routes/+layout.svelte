<script lang="ts">
	import ThemeSelector from '$lib/themeSelector.svelte';
	import '../styles/main.scss';
	import '../styles/reset.scss';
	import '../styles/themes/dark.scss';
</script>

<header>
	<nav>
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/examples">Examples</a></li>
			<li><a href="/getting-started">Getting Started</a></li>
			<li><a href="/docs">Documentation</a></li>
			<li><a href="https://github.com/ConnorVoisey/shgrid" target="blank">GitHub</a></li>
		</ul>
		<ThemeSelector />
	</nav>
</header>
<main>
	<slot />
</main>

<style lang="scss">
	header {
		background-color: rgb(var(--color-surface-100));
	}
	nav,
	main {
		max-width: 1000px;
		margin: auto;
		padding-top: var(--size-4);
	}
	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--size-4) 0;
		ul {
			display: flex;
			gap: var(--size-4);
		}
	}
</style>

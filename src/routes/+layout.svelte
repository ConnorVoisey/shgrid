<script lang="ts">
	import ThemeSelector from '$lib/themeSelector.svelte';
	import '../styles/main.scss';
	import '../styles/reset.scss';
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
		background-color: primary(5);
		color: on-primary(0);
	}
	nav,
	main {
		padding-top: size(4);
	}
	nav {
		@include content-width(1100px);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: size(4) 0;
		ul {
			display: flex;
			gap: size(4);
		}
	}
</style>

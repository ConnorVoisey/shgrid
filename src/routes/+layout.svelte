<script lang="ts">
	import '../styles/main.scss';
	import '../styles/reset.scss';
	import '../styles/themes/dark.scss';
</script>

<header>
	<nav>
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/getting-started">Getting Started</a></li>
			<li><a href="/docs">Documentation</a></li>
			<li><a href="https://github.com/ConnorVoisey/shgrid" target="blank">GitHub</a></li>
		</ul>
	</nav>
</header>
<main>
	<slot />
</main>

<style lang="scss">
	header {
		background-color: rgb(var(--color-surface-800));
	}
	nav,
	main {
		max-width: 1000px;
		margin: auto;
		padding-top: var(--size-400);
	}
	nav {
		padding: var(--size-400) 0;
		ul {
			display: flex;
			gap: var(--size-400);
		}
	}
</style>

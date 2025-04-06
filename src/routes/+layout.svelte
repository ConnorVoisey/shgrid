<script lang="ts">
	let { children } = $props();
</script>

<aside>
	<a href="/examples/contacts">contacts</a>
</aside>

<main>
	{@render children()}
</main>

<style>
	:global(body) {
		margin: 0;
		background-color: hsl(150, 0%, 99%);
		height: 100svh;
	}
</style>

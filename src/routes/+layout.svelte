<script lang="ts">
	const links: { label: string; href: string; description: string }[] = [
		{
			label: 'home',
			href: '/',
			description: 'basic example displaying contacts',
		},
		{
			label: 'TODO: theme',
			href: '/theme',
			description: 'shgrid theme changes with the page',
		},
	];
</script>

<div class="page-wrapper dark">
	<main>
		<slot />
	</main>
	<nav>
		<ul>
			{#each links as link}
				<li><a href={link.href}>{link.label}</a></li>
			{/each}
		</ul>
	</nav>
</div>

<style lang="scss">
	.page-wrapper {
		display: grid;
		grid-template-rows: max-content 1fr max-content;
		min-height: 100vh;
	}
</style>

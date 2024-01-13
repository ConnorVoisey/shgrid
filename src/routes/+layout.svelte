<script lang="ts">
	const links: { href: string; label: string }[] = [
		{
			label: 'Home',
			href: '/',
		},
		{
			label: 'example: Contact',
			href: '/examples/contacts',
		},
		// {
		// 	label: 'example: Tailwind',
		// 	href: '/examples/tailwind',
		// },
		{
			label: 'Example: Absent api',
			href: '/examples/error-absent-api',
		},
		{
			label: 'Example: error 422',
			href: '/examples/error-422',
		},
		{
			label: 'Example: Pre Existing Query Params',
			href: '/examples/pre-existing-query',
		},
		{
			label: 'Example: theme selector',
			href: '/examples/theme-selector',
		},
		{
			label: 'Example: select rows',
			href: '/examples/select',
		},
	];
</script>

<div class="page-wrapper">
	<nav>
		<ul>
			{#each links as link}
				<li><a href={link.href}>{link.label}</a></li>
			{/each}
		</ul>
	</nav>
	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	:global(body) {
		margin: 0;
	}
	:global(*) {
		box-sizing: border-box;
	}
	.page-wrapper {
		width: 100%;
		font-family: system-ui;
		display: flex;
		justify-content: space-between;
		main {
			margin-inline: auto;
			max-width: 1100px;
			padding-top: 2rem;
		}
		nav {
			border-right: black 2px solid;
			padding-right: 2rem;
		}
		main,
		nav {
			overflow: auto;
			min-height: 100svh;
		}
	}
</style>

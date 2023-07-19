<script lang="ts">
	import Footer from '$lib/footer.svelte';
	import Header from '$lib/header.svelte';
	import ThemeSelector from '$lib/themeSelector.svelte';
	import '../styles/main.scss';
	import '../styles/reset.scss';
</script>

<div class="page-wrapper">
	<Header />
	<main>
		<slot />
	</main>
	<Footer />
</div>

<style lang="scss">
	.page-wrapper {
		display: grid;
		grid-template-rows: max-content 1fr max-content;
		min-height: 100vh;
	}
</style>

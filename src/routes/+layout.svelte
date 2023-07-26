<script lang="ts">
</script>

<div class="page-wrapper">
	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	.page-wrapper {
		display: grid;
		grid-template-rows: max-content 1fr max-content;
		min-height: 100vh;
	}
</style>

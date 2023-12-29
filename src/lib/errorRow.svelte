<script lang="ts">
	export let code: number;
	export let message: string;
</script>

<div class="wrapper">
	<h3 class="subtitle">Error: {code}</h3>
	<p>{message}</p>
</div>

<style lang="scss">
	.wrapper {
		width: 100%;
		align-items: center;
		padding: size(8);
		display: flex;
		flex-direction: column;
	}
</style>

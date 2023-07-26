<script lang="ts">
	import type { BaseGridBuilder } from './js/BaseGridBuilder';

	export let builder: BaseGridBuilder;
	$: buttons = (() => {
		let lowest = Math.max(0, builder.paginator.page - 2);
		let arr = [];
		for (let i = 0; i < 5; i++) {
			arr.push(lowest + i);
		}
		return arr;
	})();
	let inputValue = builder.paginator.page;
</script>

<form class="pagination">
	<div class="input-wrapper">
		<label for="paginator-input">Page:</label>
		<input
			id="paginator-input"
			type="number"
			on:input={e => (inputValue = +e.currentTarget.value - 1)}
			value={builder.paginator.page + 1}
		/>
		<button class="btn-primary" on:click={() => builder.setPage(inputValue )}>&rarr;</button>
	</div>
	<div class="btn-row">
		{#each buttons as button}
			<button
				class="btn"
				class:btn-primary={builder.paginator.page === button}
				disabled={builder.paginator.page === button}
				on:click={() => builder.setPage(button)}>{button + 1}</button
			>
		{/each}
	</div>
</form>

<style lang="scss">
	.pagination {
		padding: size(4);
		display: flex;
		gap: size(8);
		.btn-row {
			display: flex;
			gap: size(2);
			align-items: center;
		}
		.input-wrapper {
			display: flex;
            label{
                margin: auto;
                margin-right: size(2);
            }
			input,
			.btn-primary {
				padding: size(2) size(4);
			}
			input {
                padding-right: 0;
				border-top-left-radius: size(2);
				border-bottom-left-radius: size(2);
				background-color: surface(2);
				max-width: 10ch;
			}
			.btn-primary {
				border-top-left-radius: 0;
				border-bottom-left-radius: 0;
			}
		}
	}
</style>

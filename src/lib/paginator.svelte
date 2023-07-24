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

<div class="pagination">
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
	<div class="input-wrapper">
		<label>
			<p>Page:</p>
			<input
				type="number"
				on:input={e => (inputValue = +e.currentTarget.value)}
				value={builder.paginator.page + 1}
			/>
		</label>
		<button class="btn-primary" on:click={() => builder.setPage(inputValue + 1)}>&rarr;</button>
	</div>
</div>

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
			gap: size(4);
			width: max-content;
		}
		label {
			display: flex;
			flex-direction: column;
			gap: size(2);
		}
        input{
            max-width: 10ch;
        }
	}
</style>

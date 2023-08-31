<script lang="ts">
	import type { BaseGridBuilder } from './js/BaseGridBuilder';

	export let builder: BaseGridBuilder;
	$: page = Math.floor(builder.paginator.offset / builder.paginator.limit);
	$: lowestPage = Math.max(0, page - 2);
    const btnCount = 5
	$: highestPage = Math.min(lowestPage + btnCount, builder.count / builder.paginator.limit);
	$: buttons = (() => {
		let arr = [];
		for (let i = lowestPage; i < highestPage; i++) {
			arr.push(i);
		}
		return arr;
	})();
	let inputValue = page ?? 0;
</script>

<form class="pagination">
	<div class="input-wrapper">
		<label for="paginator-input">Page:</label>
		<input
			id="paginator-input"
			type="number"
			on:input={e => (inputValue = +e.currentTarget.value - 1)}
			value={page + 1}
			max={1 + builder.count / builder.paginator.limit}
			min={1}
		/>
		<button class="btn-primary" on:click={() => builder.setPage(inputValue)}>&rarr;</button>
	</div>
	<div class="btn-row">
		{#each buttons as button}
			<button
				class="btn"
				class:btn-primary={page === button}
				disabled={page === button}
                type="button"
				on:click={() => builder.setPage(button)}>{button + 1}</button
			>
		{/each}
	</div>
	<div class="count-info">
		<p>{builder.paginator.offset}-{builder.paginator.offset + builder.paginator.limit} of {builder.count}</p>
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
			label {
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

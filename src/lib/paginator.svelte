<script lang="ts">
	import type { BaseGridBuilder } from './js/BaseGridBuilder';

	export let builder: BaseGridBuilder;
</script>

<div class="pagination">
	<div class="flex">
		<button
			disabled={builder.paginator.page <= 1}
			on:click={() => builder.setPage(builder.paginator.page - 1)}
			class="btn"
		>
			Previous
		</button>
		<p>
			{(builder.paginator.page - 1) * builder.paginator.limit + 1} - {Math.min(
				builder.count,
				builder.paginator.page * builder.paginator.limit
			)} of {builder.count}
		</p>
		<button
			disabled={(builder.paginator.page + 1) * builder.paginator.limit > builder.count}
			on:click={() => builder.setPage(builder.paginator.page + 1)}
			class="btn"
		>
			Next
		</button>
	</div>
	<label>
		<p>Go to page:</p>
		<input type="number" on:input={(e) => builder.setPage(+e.currentTarget.value)} />
	</label>
	<!-- <button on:click={() => builder.buildData()} class="btn">Build Grid</button> -->
</div>

<style lang="scss">
	.pagination {
		padding: 1rem 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		.flex {
			display: flex;
			gap: 1rem;
			align-items: center;
		}
	}
</style>

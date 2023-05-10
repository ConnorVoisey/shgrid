<script lang="ts">
	import type { BaseGridBuilder } from '$lib/js/BaseGridBuilder.js';
	import { onMount } from 'svelte';
	import type { ListenerFunc } from './js/types';
	import Loading from './loading.svelte';

	export let builder: BaseGridBuilder;
	let listener: ListenerFunc = () => {
		console.log('build');
		builder = builder;
	};
	builder.setListener(listener);

	onMount(() => builder.buildData());
</script>

<div class="shgrid">
	<div class="flex">
		<table>
			<thead>
				<tr>
					{#each builder.columns as column}
						<th>
							<label class="container">
								<p>{column.label}</p>
								<button
									class="icon btn"
									class:hidden-till-hover={builder.sorter?.columnId !== column.id}
									class:rotate={builder.sorter?.columnId === column.id && !builder.sorter?.isAsc}
									on:click={() => builder.sortColumn(column.id)}
								>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
										<title>{builder.sorter?.isAsc ? 'Sort Descending' : 'Sort Ascending'}</title>
										<path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
									</svg>
								</button>
								<input
									type="text"
									on:input={(e) => {
										column.filter = e.currentTarget.value;
										builder.buildData();
									}}
								/>
							</label>
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#if builder.loading}
					<tr><td colspan="999"><Loading /></td></tr>
				{:else}
					{#each builder.data as row, i}
						<tr class:odd-darker={i % 2}>
							{#each row as cellVal}
								<td>{cellVal}</td>
							{/each}
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
	<div class="pagination">
		<p>
			{(builder.paginator.page - 1) * builder.paginator.limit + 1} - {Math.min(
				builder.count,
				builder.paginator.page * builder.paginator.limit
			)}
		</p>
		{#each { length: Math.ceil(builder.count / builder.paginator.limit) } as _, i}
			<button on:click={() => builder.setPage(i + 1)} class="btn">{i + 1}</button>
		{/each}
		<label>
			<p>Go to page:</p>
			<input type="number" on:input={(e) => builder.setPage(+e.currentTarget.value)} />
		</label>
		<button on:click={() => builder.buildData()} class="btn">Build Grid</button>
		<!-- <button on:click={() => builder.buildData()} class="btn">Build Grid</button> -->
		<p>{builder.count} records in total</p>
	</div>
</div>

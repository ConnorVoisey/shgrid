<script lang="ts">
	import type { BaseGridBuilder } from '$lib/js/BaseGridBuilder.js';
	import { onMount } from 'svelte';
	import type { ListenerFunc } from './js/types';
	import Loading from './loading.svelte';
	import Options from './options.svelte';

	export let builder: BaseGridBuilder;
	let listener: ListenerFunc = () => {
		console.log('build');
		builder = builder;
	};
	builder.setListener(listener);

	onMount(() => builder.buildData());
	let isOptionsOpen = false;

	$: notHiddenColumns = builder.columns.filter((column) => !column.hidden);
	$: columnMapper = notHiddenColumns.map((column) =>
		builder.columns.findIndex((builderColumn) => builderColumn.id === column.id)
	);

	$: rows = builder.data.map((row) => {
		return { data: row, isOpen: false };
	});
</script>

<div class="shgrid">
	<div class="options">
		<button class="options-btn" on:click={() => (isOptionsOpen = !isOptionsOpen)}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<title>Options</title>
				<path
					d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
				/>
			</svg>
		</button>
	</div>
	{#if isOptionsOpen}
		<Options {builder} />
	{:else}
		<div class="flex">
			<table>
				<thead>
					<tr>
						<th>open</th>
						{#each notHiddenColumns as column}
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
						<tr>
							<td colspan="999">
								<Loading />
							</td>
						</tr>
					{:else}
						{#each rows as row, i}
							<tr class:odd-darker={i % 2}>
								<td>
									<button on:click={() => (row.isOpen = !row.isOpen)}>Open</button>
								</td>
								{#if row.isOpen}
									<td colspan="999" class="expanded">
										<div class="wrapper">
											{#each builder.columns as column, columnIndex}
												<div class="row">
													<p>{column.label}:</p>
													<p>{builder.data[i][columnIndex]}</p>
												</div>
											{/each}
										</div>
									</td>
								{:else}
									{#each notHiddenColumns as column, i}
										<td>{row.data[columnMapper[i]]}</td>
									{/each}
								{/if}
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		</div>
	{/if}

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

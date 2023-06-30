<script lang="ts">
	import type { BaseGridBuilder } from '$lib/js/BaseGridBuilder.js';
	import { onMount } from 'svelte';
	import type { ListenerFunc } from './js/types';
	import Loading from './loading.svelte';
	import Options from './options.svelte';
	import Paginator from './paginator.svelte';
	import { fade } from 'svelte/transition';

	export let builder: BaseGridBuilder;
	let listener: ListenerFunc = () => {
		console.log('build');
		builder = builder;
	};
	builder.setListener(listener);

	onMount(() => builder.buildData());
	let isOptionsOpen = false;

	$: notHiddenColumns = builder.columns.filter(column => !column.hidden);
	$: columnMapper = notHiddenColumns.map(column =>
		builder.columns.findIndex(builderColumn => builderColumn.id === column.id),
	);

	$: rows = builder.data.map(row => {
		return { data: row, isOpen: false };
	});
</script>

<div class="shgrid">
	<div class="options">
		<label class="btn">
			<p>Options</p>
			<button class="options-btn" on:click={() => (isOptionsOpen = !isOptionsOpen)}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<title>Options</title>
					<path
						d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
					/>
				</svg>
			</button>
		</label>
	</div>
	<div class="table-wrapper">
		{#if isOptionsOpen}
			<Options {builder} rerender={listener} />
			<button class="overlay-background" on:click={() => (isOptionsOpen = false)} in:fade />
		{/if}
		<table class:in-background={isOptionsOpen}>
			<thead>
				<tr>
					<th />
					{#each notHiddenColumns as column}
						<th>
							<div class="container">
								<label class="flex">
									<p>{column.label}</p>
									<button class="icon" on:click={() => builder.sortColumn(column.id)}>
										{#if builder.sorters?.[0]?.columnId === column.id}
											{#if builder.sorters?.[0]?.isAsc}
												<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
													><title>sort-alphabetical-descending</title><path
														d="M19 7H22L18 3L14 7H17V21H19M11 13V15L7.67 19H11V21H5V19L8.33 15H5V13M9 3H7C5.9 3 5 3.9 5 5V11H7V9H9V11H11V5C11 3.9 10.11 3 9 3M9 7H7V5H9Z"
													/></svg
												>
											{:else}
												<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
													><title>sort-alphabetical-ascending</title><path
														d="M19 17H22L18 21L14 17H17V3H19M11 13V15L7.67 19H11V21H5V19L8.33 15H5V13M9 3H7C5.9 3 5 3.9 5 5V11H7V9H9V11H11V5C11 3.9 10.11 3 9 3M9 7H7V5H9Z"
													/></svg
												>
											{/if}
										{:else}
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
												><title>sort</title><path
													d="M18 21L14 17H17V7H14L18 3L22 7H19V17H22M2 19V17H12V19M2 13V11H9V13M2 7V5H6V7H2Z"
												/></svg
											>
										{/if}
									</button>
								</label>
								<input
									type="text"
									on:input={e => {
										column.filter = e.currentTarget.value;
										builder.buildData();
									}}
								/>
							</div>
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
								<button class="expand-btn" on:click={() => (row.isOpen = !row.isOpen)}>
									<div>
										{#if row.isOpen}
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
												<title>Shrink</title>
												<path
													d="M19.5,3.09L15,7.59V4H13V11H20V9H16.41L20.91,4.5L19.5,3.09M4,13V15H7.59L3.09,19.5L4.5,20.91L9,16.41V20H11V13H4Z"
												/>
											</svg>
										{:else}
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
												<title>Expand</title>
												<path
													d="M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z"
												/>
											</svg>
										{/if}
									</div>
								</button>
							</td>
							{#each notHiddenColumns as column, i}
								<td>
									{#if builder.rowLink === undefined && column.link === undefined}
										<div>{@html builder.formatCell(row.data, column.id)}</div>
									{:else}
										<a
											href={(() => {
												if (column.link !== undefined) return column.link(row.data);
												if (builder.rowLink !== undefined) return builder.rowLink(row.data);
											})()}
											class:hover-highlight-row={column.link === undefined}
											class:hover-highlight-cell={column.link !== undefined}
										>
											{@html builder.formatCell(row.data, column.id)}</a
										>
									{/if}
								</td>
							{/each}
						</tr>

						{#if row.isOpen}
							<tr class="expanded" class:odd-darker={i % 2}>
								<td colspan="999" class="expanded">
									<div class="wrapper">
										{#each builder.columns as column}
											<div class="row">
												<p>{column.label}:</p>
												<p>{JSON.stringify(builder.data[i][column.id])}</p>
											</div>
										{/each}
									</div>
								</td>
							</tr>
						{/if}
					{/each}
				{/if}
			</tbody>
		</table>
	</div>

	<Paginator {builder} />
</div>

<script lang="ts">
	import Th from './th.svelte';
	import type { Props } from './index.js';
	import { onMount } from 'svelte';
	import CellRender from './cellRender.svelte';
	import Paginator from './paginator.svelte';

	let {
		columns = $bindable(),
		sorters = $bindable([]),
		isLoading = $bindable(false),
		limit = $bindable(50),
		offset = $bindable(0),
		debounceMs = 150,
		fetchOnMount = true,
		fetcher,
		data = $bindable(null),
		error = $bindable(null),
		onInput,
		onAfterFetch,
		aSnippet
	}: Props = $props();

	const fetchData = async () => {
		isLoading = true;
		try {
			const res = await fetcher({
				sorters,
				columns,
				limit,
				offset
			});
			data = res.data;
			error = res.error;
			console.log({ data, error });
		} finally {
			return (isLoading = false);
		}
	};

	let fetchTimeout = 0;
	const fetchInternal = async () => {
		if (onInput) onInput();
		await fetchData();
		if (onAfterFetch) onAfterFetch();
	};
	const onInputInternal = async () => {
		clearTimeout(fetchTimeout);
		fetchTimeout = setTimeout(fetchInternal, debounceMs);
	};

	let currentlyHoveringHref: null | string = $state(null);
	onMount(() => {
		if (fetchOnMount) {
			fetchInternal();
		}
		clearTimeout(fetchTimeout);
	});
</script>

<!-- <pre>{JSON.stringify({ currentlyHoveringHref })}</pre> -->
<div class="shgrid_pkg-wrapper">
	<table>
		<thead>
			<tr class="shgrid_pkg-tr">
				{#each columns as column, i}
					{@const sorterIndex = sorters.findIndex((sort) => sort.key === column.key)}
					{@const sorter = sorters[sorterIndex]}
					<Th
						bind:column={columns[i]}
						setFilter={(filter) => {
							column.filter.value = filter;
							offset = 0;
							onInputInternal();
						}}
						{sorter}
						sortCol={() => {
							if (sorter == undefined) {
								sorters = [
									{
										key: column.key,
										dir: 'asc'
									}
								];
							} else if (sorter.dir === 'asc') {
								sorter.dir = 'desc';
							} else {
								sorters.splice(sorterIndex);
							}
							offset = 0;
							fetchData();
						}}
					></Th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#if isLoading}
				<tr class="shgrid_pkg-tr">
					<td colspan={9999}>Loading</td>
				</tr>
			{:else if data}
				{#each data.rows as row, i}
					<tr class:shgrid_pkg-tr-odd={(i % 2) - 1} class="shgrid_pkg-tr">
						{#each columns as column}
							<CellRender {column} {row} bind:currentlyHoveringHref {aSnippet}></CellRender>
						{/each}
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
	<Paginator bind:offset {limit} {data} {fetchData}></Paginator>
</div>

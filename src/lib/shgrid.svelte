<script lang="ts">
	import type { BaseGridBuilder } from '$lib/js/BaseGridBuilder.js';
	import { onMount } from 'svelte';
	import type { ListenerFunc } from './js/types.js';
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
									class="icon"
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
										column.filter = e.target.value;
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
		<p>{builder.paginator.page} of {Math.ceil(builder.count / builder.paginator.limit)}</p>
		{#each { length: Math.ceil(builder.count / builder.paginator.limit) } as _, i}
			<button on:click={() => builder.setPage(i + 1)}>{i + 1}</button>
		{/each}
		<button on:click={() => builder.buildData()}>Build Grid</button>
		<p>{builder.count} records in total</p>
	</div>
</div>

<style lang="scss">
	.shgrid {
		border-radius: 1rem;
		overflow: hidden;
		background-color: #eee;
		display: grid;
		.flex {
			display: flex;
			overflow: auto;
			table {
				thead tr,
				tr.odd-darker {
					background-color: #00000030;
				}
				th .container {
					display: grid;
					grid-template-columns: 1fr max-content;
					grid-template-rows: 1fr max-content;
					p {
						grid-area: 1 / 1 / 2 / 2;
					}
					button {
						grid-area: 1 / 2 / 2 / 3;
					}
					input {
						grid-area: 2 / 1 / 3 / 3;
					}
				}

				button {
					transition: transform 200ms;

					svg {
						width: 2rem;
					}
				}
			}
		}
	}
	.rotate {
		transform: rotate(180deg);
	}
	.hidden-till-hover {
		opacity: 0;
		transition: opacity 200ms;
		&:hover {
			opacity: 1;
		}
	}
</style>

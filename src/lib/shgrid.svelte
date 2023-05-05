<script lang="ts">
	import type { BaseGridBuilder } from '$lib/js/BaseGridBuilder.js';
	import { onMount } from 'svelte';
	import type { ListenerFunc } from './js/types.js';

	export let builder: BaseGridBuilder;
	let listener: ListenerFunc = () => {
		console.log('build');
		builder = builder;
	};
	builder.setListener(listener);

	onMount(() => builder.buildData());
</script>

<table>
	<thead>
		<tr>
			{#each builder.columns as column}
				<th>
					<div class="flex">
						<p>{column.label}</p>
						<button class="icon" on:click={() => builder.sortColumn(column.id)}>svg</button>
					</div>
					<input
						type="text"
						on:input={(e) => {
							column.filter = e.target.value;
							builder.buildData();
						}}
					/>
				</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each builder.data as row}
			<tr>
				{#each row as cellVal}
					<td>{cellVal}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
<p>{builder.paginator.page} of {Math.ceil(builder.count / builder.paginator.limit)}</p>
{#each { length: Math.ceil(builder.count / builder.paginator.limit) } as _, i}
	<button on:click={() => builder.setPage(i + 1)}>{i + 1}</button>
{/each}
<button on:click={() => builder.buildData()}>Build Grid</button>
<p>{builder.count}</p>

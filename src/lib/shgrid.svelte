<script lang="ts">
	import type { BaseGridBuilder } from '$lib/js/BaseGridBuilder.js';
	import { onMount } from 'svelte';
	import type { ListenerFunc } from './js/types.js';

	export let builder: BaseGridBuilder;
	let data: string[][] = [];
	let listener: ListenerFunc = (res: string[][]) => {
		data = res;
	};
	builder.setListener(listener);

	onMount(() => builder.buildData());
</script>

<table>
	<thead>
		<tr>
			{#each builder.columns as column}
				<th>{column.label}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each data as row}
			<tr>
				{#each row as cellVal}
					<td>{cellVal}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

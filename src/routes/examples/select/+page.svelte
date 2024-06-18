<script lang="ts">
	import Shgrid from '$lib/shgrid.svelte';
	import { ServerGridBuilder } from '$lib/js/ServerGridBuilder.js';
	import '$lib/default-styles.scss';
	import { env } from '$env/dynamic/public';
	import type { ContactRow } from '../../../docLib/types';

	let mapper: ServerGridBuilder<ContactRow>['mapper'] = (res: any) => {
		return {
			data: res.data,
			count: res.count,
		};
	};
	const url = `https://google.com`;
	let builder = new ServerGridBuilder<ContactRow>({
		columns: [
			{ id: 'id', label: 'Id', hidden: true },
			{ id: 'first_name', label: 'First Name' },
			{ id: 'last_name', label: 'Last Name' },
			{ id: 'email', label: 'Email' },
		],
		url: env.PUBLIC_API_URL + '/contact',
		mapper,
		rowLink: row => `${url}/${row.id}`,
		selected: new Map(),
		limitOptions: [5, 10, 15, 25, 50],
	});
</script>

<h1>Select</h1>
<p>Select rows by clicking the checkbox column.</p>
<Shgrid bind:builder on:updatedSelection={e => console.log({ e })} />
<pre style="white-space: pre; word-wrap: pre;">{JSON.stringify(builder.columns, null, 2)}</pre>
<h2>Currently Selected:</h2>
{#if builder.selected}
	<ul>
		{#each Array.from(builder.selected.entries()) as [id, row]}
			<li>{row.first_name} {row.last_name}</li>
		{/each}
	</ul>
{/if}
<pre style="white-space: pre; word-wrap: pre;">{JSON.stringify(
		Array.from(builder.selected?.entries() ?? []),
		null,
		2,
	)}</pre>
<pre style="white-space: pre; word-wrap: pre;">{JSON.stringify(builder.selected?.size, null, 2)}</pre>

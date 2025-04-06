<script lang="ts">
	import Shgrid from '$lib/shgrid.svelte';
	import '$lib/default_styles.scss';
	import { PUBLIC_API_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import type { Column, Fetcher, Row } from '$lib/index.js';

	const contactShowRoute = (row: Row) => `contacts/${row.id}`;

	let limit = $state(5);
	let offset = $state(0);
	// TODO: add error handling
	const getContacts: Fetcher = async ({ columns, sorters, limit, offset }) => {
		const filters: Record<string, unknown> = {};
		for (const col of columns) {
			const filter = col.filter;
			if (filter === undefined || filter.value === undefined) continue;
			filters[col.key] = filter.value;
		}
		const res = await fetch(`${PUBLIC_API_URL}/contacts`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				filters,
				limit,
				offset,
				sorters
			})
		});

		const json = await res.json();
		return { data: json, error: null };
	};
	let data = $state(null);
	let error = $state(null);

	let columns: Column[] = $state([
		{
			key: 'first_name',
			label: 'First Name',
			sortable: true,
			filter: {
				type: 'string'
			},
			cellRender: {
				type: 'text',
				label: (row) => row.first_name,
				link: contactShowRoute
			}
		},
		{
			key: 'last_name',
			label: 'Last Name',
			sortable: true,
			filter: {
				type: 'string'
			},
			cellRender: {
				type: 'text',
				label: (row) => row.last_name,
				link: contactShowRoute
			}
		},
		{
			key: 'email',
			sortable: true,
			filter: {
				type: 'string'
			},
			cellRender: {
				type: 'text',
				label: (row) => row.email,
				link: contactShowRoute
			}
		},
		{
			key: 'organisation',
			filter: {
				type: 'string'
			},
			cellRender: {
				type: 'text',
				label: (row) => row.organisation?.name,
				link: (row) =>
					row.organisation == null ? null : `/api/organistaions/${row.organisation.id}`,
				highlightLink: true
			}
		},
		{
			key: 'address',
			filter: {
				type: 'select',
				options: [
					{ value: 'uk', label: 'Uk' },
					{ value: 'usa', label: 'Usa' }
				],
				multiple: true
			},
			cellRender: {
				type: 'text',
				label: (row) =>
					row.address == null ? '' : `${row.address?.town_or_city}, ${row.address.address_line_one}`
			}
		}
	]);
</script>

<div class="wrapper">
	<div class="inner">
		<Shgrid bind:columns {data} {error} fetcher={getContacts} {limit}></Shgrid>
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		justify-content: center;
	}
	.inner {
		max-width: 1000px;
	}
</style>

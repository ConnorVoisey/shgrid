<script lang="ts">
	import Shgrid from '$lib/shgrid.svelte';
	import { ServerGridBuilder } from '$lib/js/ServerGridBuilder.js';
	import '$lib/default-styles.scss';
	import { env } from '$env/dynamic/public';
	import { onMount } from 'svelte';

	let mapper: ServerGridBuilder['mapper'] = (res: any) => {
		return {
			data: res.data,
			count: res.count,
		};
	};
	type Row = {
		organisation: {
			name: string;
			id: string;
			postcode: string;
		};
	};
	const url = `${env.PUBLIC_API_URL}/contact?include-deleted=true`;
	let builder = new ServerGridBuilder({
		columns: [
			{ id: 'id', label: 'Id', hidden: true },
			{ id: 'first_names', label: 'First Name', hidden: true },
			{ id: 'last_name', label: 'Last Name', hidden: true },
			{ id: 'email', label: 'Email' },
			{
				id: 'organisation',
				label: 'Organisation',
				formatter: (row: Row) =>
					`<p><strong>Name: </strong>${row?.organisation?.name}</p><p><strong>Postcode: </strong>${row?.organisation?.postcode}</p>`,
				link: row => `/examples/data/organisation/${(row as Row)?.organisation?.id}`,
				sortable: false,
				searchable: false,
			},
			{ id: 'active', label: 'Active', hidden: true },
			{ id: 'mobile', label: 'Mobile' },
			{ id: 'postcode', label: 'Postcode', hidden: true },
		],
		url,
		mapper,
		rowLink: row => `${url}/${row.id}`,
	});
</script>

<h1>Pre Existing Query Params</h1>
<p>
	In this example, the user has some query params already assigned inside the shgrid api url, these will need to be
	kept as part of the url and the shgrid params will need to be appended.
</p>
<p>Starting Url: {url}</p>
<p>Built Url: {builder.buildQueryUrl()}</p>
<Shgrid bind:builder />
<pre>{JSON.stringify(builder, null, 2)}</pre>

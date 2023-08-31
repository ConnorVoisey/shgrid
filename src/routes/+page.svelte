<script lang="ts">
	import Shgrid from '$lib/shgrid.svelte';
	import { ServerGridBuilder } from '$lib/js/ServerGridBuilder.js';
	import { PUBLIC_BASE_URL } from '$env/static/public';

	let mapper: ServerGridBuilder['mapper'] = (res: any) => {
		return {
			data: res.data,
			count: res.count,
		};
	};
	const url = `${PUBLIC_BASE_URL}/contact`;
	type Row = {
		organisation?: {
			name: string;
			id: string;
			postcode: string;
		};
	};
	let builder = new ServerGridBuilder({
		columns: [
			{ id: 'first_name', label: 'First Name', searchable: true },
			{ id: 'last_name', label: 'Last Name', searchable: true },
			{
				id: 'organisation',
				label: 'Organisation',
				formatter: row =>
					`<p><strong>Name: </strong>${(row as Row)?.organisation?.name}</p>
                    <p><strong>Postcode: </strong>${(row as Row)?.organisation?.postcode}</p>`,
				link: row => `/examples/data/organisation/${(row as Row)?.organisation?.id}`,
				searchable: false,
				sortable: false,
			},
		],
		url,
		mapper,
		rowLink: row => `${url}/${row.id}`,
		limit: 5,
	});

	import '$lib/default-styles.scss';
</script>

<svelte:head>
	<title>Shgrid</title>
</svelte:head>

<Shgrid hasOptions={true} canExpandRows={false} {builder} />

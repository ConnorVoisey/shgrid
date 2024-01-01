<script lang="ts">
	import Shgrid from '$lib/shgrid.svelte';
	import { ServerGridBuilder } from '$lib/js/ServerGridBuilder.js';
	import '$lib/default-styles.scss';
	import { env } from '$env/dynamic/public';

	let mapper: ServerGridBuilder<Row>['mapper'] = (res: any) => {
		return {
			data: res.data,
			count: res.count,
		};
	};
	type Row = {
		id: string;
		organisation: {
			name: string;
			id: string;
			postcode: string;
		};
	};
	const url = `${env.PUBLIC_API_URL}/contact`;
	let builder = new ServerGridBuilder<Row>({
		columns: [
			{ id: 'id', label: 'Id', hidden: true },
			{ id: 'first_names', label: 'First Name', hidden: true },
			{ id: 'last_name', label: 'Last Name', hidden: true },
			{ id: 'email', label: 'Email' },
			{
				id: 'organisation',
				label: 'Organisation',
				formatter: row =>
					`<p><strong>Name: </strong>${row?.organisation?.name}</p><p><strong>Postcode: </strong>${row?.organisation?.postcode}</p>`,
				link: row => `/examples/data/organisation/${row?.organisation?.id}`,
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

<h1>Contacts</h1>
<p>This is a basic example of using the server side builder.</p>
<Shgrid {builder} />

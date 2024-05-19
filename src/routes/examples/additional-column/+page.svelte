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
	const url = `${env.PUBLIC_API_URL}/contact`;
	let builder = new ServerGridBuilder<ContactRow>({
		columns: [
			{ id: 'id', label: 'Id', hidden: true },
			{ id: 'first_name', label: 'First Name', hidden: true },
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
			{
				id: 'edit',
				label: 'Edit',
				formatter: () => '<span class="btn">Edit</span>',
				link: row => `/examples/data/contact/${row.id}/edit`,
			},
		],
		url,
		mapper,
		rowLink: row => `${url}/${row.id}`,
	});
</script>

<h1>Additional Column</h1>
<p>This example has an edit column which is not one of the fields of the contact model</p>
<Shgrid {builder} />

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
			{ id: 'active', label: 'Active', hidden: true },
			{ id: 'mobile', label: 'Mobile' },
			{ id: 'postcode', label: 'Postcode', hidden: true },
		],
		url,
		mapper,
		rowLink: row => `${url}/${row.id}`,
		initialData: new Promise(res =>
			setTimeout(
				() =>
					res({
						data: [
							{
								id: 'ni849n89g5ndoion',
								mobile: '0123508602',
								postcode: 'nignroid',
								email: 'test2@test.test',
								active: true,
								last_name: 'Testing',
								first_name: 'Another',
								organisation: {
									postcode: 'nieso9',
									id: 'nufi498enigm59dgnonio',
									name: 'Testing Company',
								},
							},
							{
								id: 'h8983wgsrgrs',
								mobile: '0712365',
								postcode: 'abc82j',
								email: 'test@test.test',
								active: true,
								last_name: 'User',
								first_name: 'Test',
								organisation: {
									postcode: 'ni3r13',
									id: 'nfi4bs80dgn90sm4g94',
									name: 'Testing Company',
								},
							},
						],
						count: 50,
					}),
				3000,
			),
		),
	});
</script>

<h1>Pre-set Data Promise</h1>
<p>Data is pre-set as a promise. This is useful when your data is streamed to the client via server side events.</p>
<Shgrid {builder} />

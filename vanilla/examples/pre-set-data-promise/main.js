import { ServerGridBuilder, Shgrid } from '../../index.js';

const wrapper = document.getElementById('wrapper');
if (wrapper == null) throw Error('missing wrapper');
const url = 'http://localhost:3000/contact';

const mapper = res => {
	return {
		data: res.data,
		count: res.count,
	};
};

/**@typedef {{name: string, postcode: string, id: string}} Organisation */
/**@typedef {{id: string, email: string, organisation: Organisation}} Row */
/** @type {ServerGridBuilder<Row>} */
const builder = new ServerGridBuilder({
	columns: [
		{ id: 'first_name', label: 'First Name', searchable: true },
		{ id: 'last_name', label: 'Last Name', searchable: true },
		{
			id: 'organisation',
			label: 'Organisation',
			formatter: row =>
				`<p><strong>Name: </strong>${row?.organisation?.name}</p>
                    <p><strong>Postcode: </strong>${row?.organisation?.postcode}</p>`,
			link: row => `/examples/data/organisation/${row?.organisation?.id}`,
			searchable: false,
		},
	],
	sorters: [],
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

new Shgrid({
	target: wrapper,
	props: {
		builder,
	},
});

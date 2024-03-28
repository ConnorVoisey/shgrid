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
let builder = new ServerGridBuilder({
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
	additionalFetchOptions: {
		headers: { 'X-TESTING-HEADER': 'xTestingHeaderValue' },
		credentials: 'include',
	},
});

new Shgrid({
	target: wrapper,
	props: {
		builder,
	},
});

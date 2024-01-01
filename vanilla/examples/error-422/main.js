import { ServerGridBuilder, Shgrid } from '../../index.js';

const wrapper = document.getElementById('wrapper');
if (wrapper == null) throw Error('missing wrapper');
const url = `http://localhost:3000/contact`;

let mapper = res => {
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
	sorters: [['organisation', 'asc']],
	url,
	mapper,
	rowLink: row => `${url}/${row.id}`,
	limit: 5,
});

new Shgrid({
	target: wrapper,
	props: {
		builder,
	},
});

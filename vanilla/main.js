import Shgrid from './dist/shgrid.js';
import { ServerGridBuilder } from './dist/ServerGridBuilder.js';

const wrapper = document.getElementById('wrapper');
if (wrapper == null) throw Error('missing wrapper');
const url = `http://localhost:3000/api/referral`;
let builder = new ServerGridBuilder({
	columns: [
		{ id: 'referrer_consent', label: 'referrer Consent', searchable: false },
		{ id: 'additional_information', label: 'Additional Information', searchable: false },
	],
	url,
	mapper: res => {
		return {
			data: res.data,
			count: res.count,
		};
	},
	rowLink: row => `${url}/${row.id}`,
	limit: 5,
});

new Shgrid({
	target: wrapper,
	props: {
		builder,
	},
});

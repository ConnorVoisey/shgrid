import { PUBLIC_API_URL } from '$env/static/public';
import type { PageLoad } from './$types.js';

export const load: PageLoad = async ({ params: { contactId } }) => {
	const res = await fetch(`${PUBLIC_API_URL}/contacts/${contactId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const contact = await res.json();
	console.log({ contact });

	return {
		contact
	};
};

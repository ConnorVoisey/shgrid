import { describe, it, expect, vi } from 'vitest';
import { ServerGridBuilder } from '$lib/js/ServerGridBuilder';

const defaultColumns = [
	{ id: 'id', label: 'Id', hidden: true },
	{ id: 'name', label: 'Name' },
	{ id: 'known_risks', label: 'Known Risks', hidden: true },
	{ id: 'referrer_consent', label: 'referrer Consent' },
	{ id: 'information_consent', label: 'Information Consent', hidden: true },
	{ id: 'description', label: 'Description', hidden: true },
	{ id: 'desired_outcome', label: 'Desired Outcome', hidden: true },
	{ id: 'additional_information', label: 'Additional Information' },
	{ id: 'declined', label: 'Declined', hidden: true }
];
const url = 'http://localhost:5173/api/referral';

function getDefaultBuilder() {
	const mapper: (data: unknown) => { data: string[][]; count: number } = (res: any) => {
		return {
			data: builder.mapToString(res.data),
			count: res.count
		};
	};
	const options = {
		columns: defaultColumns,
		url,
		mapper
	};
	const builder = new ServerGridBuilder(options);
	return builder;
}
describe('build query url', () => {
	it('default pagination', async () => {
		const builder = getDefaultBuilder();
		const generatedUrl = builder.buildQueryUrl();
        expect(generatedUrl).toBe(`${url}?limit=5&page=0&sort[]=order asc`)
	});
});

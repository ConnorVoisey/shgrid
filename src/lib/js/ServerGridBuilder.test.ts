import { describe, it, expect, vi } from 'vitest';
import { ServerGridBuilder } from '$lib/js/ServerGridBuilder';
import type { Sorter } from './types';

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
		const query = new URLSearchParams({
			limit: (15).toString(),
			page: (0).toString(),
			sort: JSON.stringify([])
		});
		expect(generatedUrl).toBe(`${url}?${query.toString()}`);
	});
	it('one level sorting', async () => {
		const builder = getDefaultBuilder();
		const sorters: Sorter[] = [{ columnId: 'name', isAsc: true }];
		builder.sorters = sorters;
		const generatedUrl = builder.buildQueryUrl();
		const query = new URLSearchParams({
			limit: (15).toString(),
			page: (0).toString(),
			sort: JSON.stringify(sorters)
		});
		expect(generatedUrl).toBe(`${url}?${query.toString()}`);
	});
	it('Multi level sorting', async () => {
		const builder = getDefaultBuilder();
		const sorters: Sorter[] = [
			{ columnId: 'name', isAsc: true },
			{ columnId: 'referrer_consent', isAsc: false },
			{ columnId: 'description', isAsc: true }
		];
		builder.sorters = sorters;
		const generatedUrl = builder.buildQueryUrl();
		const query = new URLSearchParams({
			limit: (15).toString(),
			page: (0).toString(),
			sort: JSON.stringify(sorters)
		});
		expect(generatedUrl).toBe(`${url}?${query.toString()}`);
	});
});

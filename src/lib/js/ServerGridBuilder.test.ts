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
	{ id: 'declined', label: 'Declined', hidden: true },
];
const url = 'http://localhost:5173/api/referral';

function getDefaultBuilder() {
	const mapper: ServerGridBuilder['mapper'] = (res: any) => {
		return {
			data: res.data,
			count: res.count,
		};
	};
	const options = {
		columns: defaultColumns,
		url,
		mapper,
	};
	const builder = new ServerGridBuilder(options);
	return builder;
}
describe('build query url', () => {
	it('default pagination', async () => {
		const builder = getDefaultBuilder();
		expect(builder.buildQueryUrl()).toBe(`${url}?limit=15&page=0&sort=%5B%5D`);
	});
	it('one level sorting', async () => {
		const builder = getDefaultBuilder();
		const sorters: Sorter[] = [{ columnId: 'name', isAsc: true }];
		builder.sorters = sorters;
		expect(builder.buildQueryUrl()).toBe(
			`${url}?limit=15&page=0&sort=%5B%7B%22columnId%22%3A%22name%22%2C%22isAsc%22%3Atrue%7D%5D`,
		);
	});
	it('Multi level sorting', async () => {
		const builder = getDefaultBuilder();
		const sorters: Sorter[] = [
			{ columnId: 'name', isAsc: true },
			{ columnId: 'referrer_consent', isAsc: false },
			{ columnId: 'description', isAsc: true },
		];
		builder.sorters = sorters;
		expect(builder.buildQueryUrl()).toBe(
			`${url}?limit=15&page=0&sort=%5B%7B%22columnId%22%3A%22name%22%2C%22isAsc%22%3Atrue%7D%2C%7B%22columnId%22%3A%22referrer_consent%22%2C%22isAsc%22%3Afalse%7D%2C%7B%22columnId%22%3A%22description%22%2C%22isAsc%22%3Atrue%7D%5D`,
		);
	});
});

import type { Columns, Sorter, Filters, Paginator, ListenerFunc } from './types.js';
import { BaseGridBuilder } from './BaseGridBuilder.js';

type ConstructorArgs = {
	columns: Columns;
	url: string;
	mapper?: (data: unknown) => { data: BaseGridBuilder['data']; count: number };
	additionalHeaders?: null;
	sorters?: Sorter[];
	rowLink?: ServerGridBuilder['rowLink'];
	limit?: number;
};

export class ServerGridBuilder extends BaseGridBuilder {
	count: number;
	data: { [key: string]: string }[];
	paginator: Paginator;
	pageCount: number | undefined;
	columns: Columns;
	sorters: Sorter[];
	filters: Filters;
	mapper: (data: unknown) => { data: BaseGridBuilder['data']; count: number };
	url: URL;
	additionalHeaders: null;
	res: Response | undefined;
	listener?: ListenerFunc;
	loading: boolean;
	rowLink?: (row: { [key: string]: string }) => string;
	error: { code: number; message: string } | null;

	constructor({ columns, url, mapper, additionalHeaders, sorters, rowLink, limit }: ConstructorArgs) {
		super();
		this.columns = columns;
		this.mapper = mapper ?? ((data: unknown) => data as { data: BaseGridBuilder['data']; count: number });
		this.filters = {};
		this.paginator = {
			limit: limit ?? 15,
			offset: 0,
		};
		this.url = new URL(url);
		this.data = [];
		this.count = 0;
		//TODO: remeber what this is supposed to do
		this.additionalHeaders = additionalHeaders ?? null;
		this.sorters = sorters ?? [];
		this.loading = true;
		this.rowLink = rowLink;
		this.error = null;
	}
	buildQueryUrl(): string {
		// clone the url so we do not mutate the original url
		const urlCopy = new URL(this.url);
		const options: { [key: string]: string } = {
			limit: this.paginator.limit.toString(),
			offset: this.paginator.offset.toString(),
			sort: JSON.stringify(this.sorters),
		};
		const filters = [];
		for (const column of this.columns) {
			if (column.filter === undefined || column.filter === '') continue;
			filters.push([column.id, column.filter]);
		}
		options.filters = JSON.stringify(filters);
		for (const key in options) {
			urlCopy.searchParams.set(key, options[key]);
		}
		const urlString = urlCopy.toString();
		// console.log({ urlString });
		return urlString;
	}
	async buildData(): Promise<any> {
		this.loading = true;
		this.triggerRender();
		try {
			this.res = await this.query(this.buildQueryUrl(), {});

			if (this.res.status >= 200 && this.res.status < 300) {
				this.error = null;
				const jsonRes = await this.res.json();
				this.buildPageCount();
				let { data, count } = this.mapper(jsonRes);
				this.data = data;
				this.count = count;
			} else {
				this.error = { code: this.res.status, message: this.res?.statusText };
			}
		} catch (e: any) {
			console.log({ e });
			this.error = { code: 500, message: this.res?.statusText ?? e.message ?? 'Unknown error occured' };
		}
		this.loading = false;
		this.triggerRender();
	}
	async query(url: string, options: any) {
		return await fetch(url, options);
	}
	buildPageCount(): number {
		if (this.res === undefined) return 0;
		const count = this.res.headers.get('X-Total-Count');
		if (count === null) return 0;
		this.pageCount = Math.ceil(+count / this.paginator.limit);
		return this.pageCount;
	}
	async setPage(pageNum: number) {
		this.paginator.offset = this.paginator.limit * pageNum;
		this.buildData();
	}
}

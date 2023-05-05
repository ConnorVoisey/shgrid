import type { Columns, Sorters, Filters, Paginator, ListenerFunc } from './types.js';
import { BaseGridBuilder } from './BaseGridBuilder.js';

type ConstructorArgs = {
	columns: Columns;
	url: string;
	mapper?: (data: unknown) => string[][];
	additionalHeaders?: null;
};

export class ServerGridBuilder extends BaseGridBuilder {
	paginator: Paginator;
	pageCount: number | undefined;
	columns: Columns;
	sorters: Sorters;
	filters: Filters;
	mapper: (data: unknown) => string[][];
	url: URL;
	additionalHeaders: null;
	res: Response | undefined;
	listener?: ListenerFunc;

	constructor({ columns, url, mapper, additionalHeaders }: ConstructorArgs) {
		super();
		this.columns = columns;
		this.mapper = mapper ?? ((data: unknown) => data as string[][]);
		this.sorters = [];
		this.filters = {};
		this.paginator = {
			limit: 5,
			page: 1
		};
		this.url = new URL(url);
		//TODO: remeber what this is supposed to do
		this.additionalHeaders = additionalHeaders ?? null;
	}
	buildQueryUrl(): string {
		const options: { [key: string]: string } = {
			_limit: this.paginator.limit.toString(),
			_page: this.paginator.page.toString(),
			_sort: this.sorters.map((sorter) => sorter.columnId).join(','),
			_order: this.sorters.map((sorter) => (sorter.isAsc ? 'asc' : 'desc')).join(',')
		};
		this.url.search = new URLSearchParams(options).toString();
		const urlString = this.url.toString();
		return urlString;
	}
	async buildData(): Promise<any> {
		this.res = await await this.query(this.buildQueryUrl(), {});
		const jsonRes = await this.res.json();
		this.buildPageCount();
		this.triggerRender(this.mapper(jsonRes));
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
		this.paginator.page = pageNum;
		let data = await this.buildData();
		return this.triggerRender(data);
	}
}

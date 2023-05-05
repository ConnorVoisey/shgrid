import type { Columns, Sorters, Filters, Paginator } from './types.js';
import { BaseGridBuilder } from './BaseGridBuilder.js';

export class ServerGridBuilder extends BaseGridBuilder {
	paginator: Paginator;
	pageCount: number | undefined;
	columns: Columns;
	sorters: Sorters;
	filters: Filters;
	dataMap: (data: unknown) => { [key: string]: string }[];
	url: URL;
	additionalHeaders: null;
	res: Response | undefined;
	listener: () => void;

	constructor(
		columns: Columns,
		url: string,
		dataMap: (data: unknown) => { [key: string]: string }[] = (data: unknown) => data as [],
		additionalHeaders: null = null,
		listener: () => void
	) {
		super();
		this.columns = columns;
		this.dataMap = dataMap;
		this.sorters = [];
		this.filters = {};
		this.paginator = {
			limit: 5,
			page: 1
		};
		this.url = new URL(url);
		this.additionalHeaders = additionalHeaders;
		this.listener = listener;
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
		// console.log(JSON.stringify(jsonRes));
		this.buildPageCount();
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
	setPage(pageNum: number) {
		this.paginator.page = pageNum;
		return this.triggerRender();
	}
}

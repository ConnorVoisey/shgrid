import type { Columns, Sorter, Filters, Paginator, ListenerFunc } from './types.js';
import { BaseGridBuilder } from './BaseGridBuilder.js';

type ConstructorArgs = {
	columns: Columns;
	url: string;
	mapper?: (data: unknown) => { data: string[][]; count: number };
	additionalHeaders?: null;
	sorters?: Sorter[];
};

export class ServerGridBuilder extends BaseGridBuilder {
	count: number;
	data: string[][];
	paginator: Paginator;
	pageCount: number | undefined;
	columns: Columns;
	sorters: Sorter[];
	filters: Filters;
	mapper: (data: unknown) => { data: string[][]; count: number };
	url: URL;
	additionalHeaders: null;
	res: Response | undefined;
	listener?: ListenerFunc;
	loading: boolean;

	constructor({ columns, url, mapper, additionalHeaders, sorters }: ConstructorArgs) {
		super();
		this.columns = columns;
		this.mapper = mapper ?? ((data: unknown) => data as { data: string[][]; count: number });
		this.filters = {};
		this.paginator = {
			limit: 15,
			page: 0
		};
		this.url = new URL(url);
		this.data = [];
		this.count = 0;
		//TODO: remeber what this is supposed to do
		this.additionalHeaders = additionalHeaders ?? null;
		this.sorters = sorters ?? [];
		this.loading = true;
	}
	buildQueryUrl(): string {
		const filters = this.columns.filter(
			(column) => column.filter != undefined && column.filter !== ''
		);
		const options: { [key: string]: string } = {
			limit: this.paginator.limit.toString(),
			page: this.paginator.page.toString(),
			sort: JSON.stringify(this.sorters)
		};
		for (const column of filters) {
			options[column.id] = column.filter ?? '';
		}
		this.url.search = new URLSearchParams(options).toString();
		const urlString = this.url.toString();
		console.log({ urlString });
		return urlString;
	}
	async buildData(): Promise<any> {
		this.loading = true;
		this.triggerRender();
		this.res = await this.query(this.buildQueryUrl(), {});
		const jsonRes = await this.res.json();
		this.buildPageCount();
		let { data, count } = this.mapper(jsonRes);
		this.data = this.formatColumns(data);
		this.count = count;
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
		this.paginator.page = pageNum;
		this.buildData();
	}
	formatColumns(data: string[][]) {
		for (const row of data) {
			for (const i in this.columns) {
				const column = this.columns[i];
				if (column.formatter === undefined) continue;
				row[i] = column.formatter(row[i]);
			}
		}
		return data;
	}
}

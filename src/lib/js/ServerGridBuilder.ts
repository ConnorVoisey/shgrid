import type { Sorter, Filters, Paginator, ListenerFunc, DefaultRow, Column } from './types.js';
import { BaseGridBuilder } from './BaseGridBuilder.js';

export class ServerGridBuilder<T extends DefaultRow> extends BaseGridBuilder<T> {
	count: number;
	data: T[];
	paginator: Paginator;
	pageCount: number | undefined;
	columns: Column<T>[];
	sorters: Sorter[];
	filters: Filters;
	mapper: (data: unknown) => { data: T[]; count: number };
	url: URL;
	additionalHeaders: null;
	res: Response | undefined;
	listener?: ListenerFunc;
	loading: boolean;
	rowLink?: (row: T) => string;
	error: { code: number; message: string } | null;
	buildQueryForSorters: (searchParams: URLSearchParams, sorters: ServerGridBuilder<T>['sorters']) => void;
	buildQueryForFilters: (searchParams: URLSearchParams, filters: string[][]) => void;
	buildQueryForOffset: (searchParams: URLSearchParams, offset: number) => void;
	buildQueryForLimit: (searchParams: URLSearchParams, limit: number) => void;

	constructor({
		columns,
		url,
		mapper,
		additionalHeaders,
		sorters,
		rowLink,
		limit,
		buildQueryForFilters,
		buildQueryForSorters,
		buildQueryForOffset,
		buildQueryForLimit,
	}: {
		columns: Column<T>[];
		url: string;
		mapper?: (data: unknown) => { data: ServerGridBuilder<T>['data']; count: number };
		additionalHeaders?: null;
		sorters?: Sorter[];
		rowLink?: ServerGridBuilder<T>['rowLink'];
		limit?: number;
		buildQueryForSorters?: ServerGridBuilder<T>['buildQueryForSorters'];
		buildQueryForFilters?: ServerGridBuilder<T>['buildQueryForFilters'];
		buildQueryForOffset?: ServerGridBuilder<T>['buildQueryForOffset'];
		buildQueryForLimit?: ServerGridBuilder<T>['buildQueryForLimit'];
	}) {
		super();
		this.columns = columns;
		this.mapper = mapper ?? (data => data as { data: T[]; count: number });
		this.filters = {};
		this.paginator = {
			limit: limit ?? 15,
			offset: 0,
		};
		this.url = new URL(url);
		this.data = [];
		this.count = 0;
		//TODO: remember what this is supposed to do
		this.additionalHeaders = additionalHeaders ?? null;
		this.sorters = sorters ?? [];
		this.loading = true;
		this.rowLink = rowLink;
		this.error = null;

		this.buildQueryForSorters =
			buildQueryForSorters ?? ((searchParams, sorters) => searchParams.append('sort', JSON.stringify(sorters)));

		this.buildQueryForFilters =
			buildQueryForFilters ??
			((searchParams, filters) => searchParams.append('filters', JSON.stringify(filters)));

		this.buildQueryForOffset =
			buildQueryForOffset ?? ((searchParams, offset) => searchParams.append('offset', offset.toString()));

		this.buildQueryForLimit =
			buildQueryForLimit ?? ((searchParams, limit) => searchParams.append('limit', limit.toString()));
	}
	buildQueryUrl(): string {
		// clone the url so we do not mutate the original url
		const urlCopy = new URL(this.url);

		// the filters are stored inside the column values
		const filters = [];
		for (const column of this.columns) {
			if (column.filter === undefined || column.filter === '') continue;
			filters.push([column.id, column.filter]);
		}
		this.buildQueryForFilters(urlCopy.searchParams, filters);
		this.buildQueryForSorters(urlCopy.searchParams, this.sorters);
		this.buildQueryForOffset(urlCopy.searchParams, this.paginator.offset);
		this.buildQueryForLimit(urlCopy.searchParams, this.paginator.limit);

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

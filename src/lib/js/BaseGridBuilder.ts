import type { Columns, Sorters, Filters, Sort, Paginator, ListenerFunc } from './types.js';

export abstract class BaseGridBuilder {
	abstract columns: Columns;
	abstract sorters: Sorters;
	abstract filters: Filters;
	abstract paginator: Paginator;
	abstract pageCount: number | undefined;
	abstract listener?: ListenerFunc;

	sortColumn(columnId: string) {
		const existingSortId = this.sorters.findIndex((sort) => sort.columnId === columnId);
		const existingSort: Sort | undefined = this.sorters[existingSortId];
		if (existingSort === undefined) {
			this.sorters.push({ columnId, isAsc: true });
			return;
		}
		if (existingSort && existingSort.isAsc) {
			existingSort.isAsc = false;
			return;
		}
		if (existingSort && !existingSort.isAsc) {
			this.sorters = this.sorters.filter((sort) => sort.columnId !== columnId);
			return;
		}
	}

	abstract buildData(input?: unknown): string[][] | Promise<string[][]>;
	abstract buildPageCount(): number;
	abstract setPage(pageNum: number): void;

	mapToString(obj: {[key:string]: string}[]): string[][] {
		let arr: string[][] = [];
		let keys = this.columns.map((column) => column.id);
        return obj.map(row=>keys.map(key=>row[key] ?? ''))
	}
	triggerRender(data: string[][]) {
        if(this.listener)
		this.listener(data);
	}
	setListener(listener: ListenerFunc) {
		this.listener = listener;
	}
}

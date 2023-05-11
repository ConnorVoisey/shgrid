import type { Columns, Sorter, Filters, Paginator, ListenerFunc } from './types.js';

export abstract class BaseGridBuilder {
	abstract columns: Columns;
	abstract sorter?: Sorter;
	abstract filters: Filters;
	abstract paginator: Paginator;
	abstract pageCount: number | undefined;
	abstract listener?: ListenerFunc;
	abstract data: string[][];
	abstract count: number;
	abstract loading: boolean;

	sortColumn(columnId: string) {
		if (this.sorter === undefined || this.sorter.columnId !== columnId) {
			this.sorter = {
				columnId,
				isAsc: true
			};
		} else {
			if (this.sorter.isAsc) {
				this.sorter.isAsc = false;
			} else {
				this.sorter = undefined;
			}
		}
		console.log(this.sorter);
		this.buildData();
	}

	abstract buildData(input?: unknown): string[][] | Promise<string[][]>;
	abstract buildPageCount(): number;
	abstract setPage(pageNum: number): void;

	mapToString(obj: { [key: string]: string }[]): string[][] {
		let arr: string[][] = [];
		let keys = this.columns.map((column) => column.id);
		return obj.map((row) => keys.map((key) => row[key] ?? ''));
	}
	triggerRender() {
		if (this.listener) this.listener();
	}
	setListener(listener: ListenerFunc) {
		this.listener = listener;
	}
}

import type { Columns, Sorter, Filters, Paginator, ListenerFunc } from './types.js';

export abstract class BaseGridBuilder {
	abstract columns: Columns;
	abstract sorters: Sorter[];
	abstract filters: Filters;
	abstract paginator: Paginator;
	abstract pageCount: number | undefined;
	abstract listener?: ListenerFunc;
	abstract data: string[][];
	abstract count: number;
	abstract loading: boolean;

	sortColumn(columnId: string) {
		if (
			this.sorters.length === 0 ||
			this.sorters[0].columnId !== columnId
		) {
			this.sorters = [
				{
					columnId,
					isAsc: true
				}
			];
		} else {
			if (this.sorters[0].isAsc) {
				this.sorters[0].isAsc = false;
			} else {
				this.sorters = [];
			}
		}
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

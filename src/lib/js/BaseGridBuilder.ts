import type { Columns, Sorters, Filters, Sort, Paginator } from './types.js';

export abstract class BaseGridBuilder {
	abstract columns: Columns;
	abstract sorters: Sorters;
	abstract filters: Filters;
	abstract paginator: Paginator;
	abstract pageCount: number | undefined;
	abstract listener: () => void;

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

    mapToString(map: Map<string, any>): string[][]{
        let arr: string[][] = [];
        let keys = this.columns.map(column=>column.id);
        for (const [key,value] of map) {
            
        }
        return arr;
    }
	triggerRender() {
		this.listener;
	}
}

import type { Columns, Sorter, Paginator, ListenerFunc, DefaultRow } from './types.js';

export abstract class BaseGridBuilder<T extends DefaultRow = DefaultRow> {
	abstract columns: Columns<T>;
	abstract sorters: Sorter[];
	abstract paginator: Paginator;
	abstract pageCount: number | undefined;
	abstract listener?: ListenerFunc;
	abstract data: T[];
	abstract count: number;
	abstract loading: boolean;
	abstract rowLink?: (row: T) => string;
	abstract error: { code: number; message: string } | null;

	sortColumn(columnId: string) {
		if (this.sorters.length === 0 || this.sorters[0][0] !== columnId) {
			this.sorters = [[columnId, 'asc']];
		} else {
			if (this.sorters[0][1] === 'asc') {
				this.sorters[0][1] = 'desc';
			} else {
				this.sorters = [];
			}
		}
		this.buildData();
	}

	abstract buildData(input?: unknown): string[][] | Promise<string[][]>;
	abstract buildPageCount(): number;
	abstract setPage(pageNum: number): void;

	triggerRender() {
		if (this.listener) this.listener();
	}
	setListener(listener: ListenerFunc) {
		this.listener = listener;
	}
	formatCell(row: T, columnId: string) {
		const column = this.columns.find(column => column.id == columnId);
		if (column === undefined) {
			console.error('formatter could not find column: ', columnId);
			return '';
		}
		if (column.formatter == undefined) return row[columnId];

		return column.formatter(row);
	}
}

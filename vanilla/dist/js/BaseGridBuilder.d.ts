import type { Columns, Sorter, Filters, Paginator, ListenerFunc } from './types.js';
export declare abstract class BaseGridBuilder {
	abstract columns: Columns;
	abstract sorter?: Sorter;
	abstract filters: Filters;
	abstract paginator: Paginator;
	abstract pageCount: number | undefined;
	abstract listener?: ListenerFunc;
	abstract data: string[][];
	abstract count: number;
	abstract loading: boolean;
	sortColumn(columnId: string): void;
	abstract buildData(input?: unknown): string[][] | Promise<string[][]>;
	abstract buildPageCount(): number;
	abstract setPage(pageNum: number): void;
	mapToString(
		obj: {
			[key: string]: string;
		}[],
	): string[][];
	triggerRender(): void;
	setListener(listener: ListenerFunc): void;
}

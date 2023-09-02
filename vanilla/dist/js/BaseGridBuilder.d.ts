import type { Columns, Sorter, Filters, Paginator, ListenerFunc } from './types.js';
export declare abstract class BaseGridBuilder {
    abstract columns: Columns;
    abstract sorters: Sorter[];
    abstract filters: Filters;
    abstract paginator: Paginator;
    abstract pageCount: number | undefined;
    abstract listener?: ListenerFunc;
    abstract data: {
        [key: string]: string;
    }[];
    abstract count: number;
    abstract loading: boolean;
    abstract rowLink?: (row: {
        [key: string]: string;
    }) => string;
    sortColumn(columnId: string): void;
    abstract buildData(input?: unknown): string[][] | Promise<string[][]>;
    abstract buildPageCount(): number;
    abstract setPage(pageNum: number): void;
    triggerRender(): void;
    setListener(listener: ListenerFunc): void;
    formatCell(row: {
        [key: string]: unknown;
    }, columnId: string): any;
}

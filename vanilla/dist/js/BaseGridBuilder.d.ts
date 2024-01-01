import type { Columns, Sorter, Paginator, ListenerFunc, DefaultRow } from './types.js';
export declare abstract class BaseGridBuilder<T extends DefaultRow = DefaultRow> {
    abstract columns: Columns<T>;
    abstract sorters: Sorter[];
    abstract paginator: Paginator;
    abstract pageCount: number | undefined;
    abstract listener?: ListenerFunc;
    abstract data: T[];
    abstract count: number;
    abstract loading: boolean;
    abstract rowLink?: (row: T) => string;
    abstract error: {
        code: number;
        message: string;
    } | null;
    sortColumn(columnId: string): void;
    abstract buildData(input?: unknown): string[][] | Promise<string[][]>;
    abstract buildPageCount(): number;
    abstract setPage(pageNum: number): void;
    triggerRender(): void;
    setListener(listener: ListenerFunc): void;
    formatCell(row: T, columnId: string): unknown;
}

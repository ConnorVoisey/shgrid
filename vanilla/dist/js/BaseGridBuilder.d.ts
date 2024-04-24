import type { Sorter, Paginator, ListenerFunc, DefaultRow, Column } from './types.js';
export declare abstract class BaseGridBuilder<T extends DefaultRow> {
    abstract columns: Column<T>[];
    abstract sorters: Sorter<T>[];
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
    abstract selected?: Map<string | number, T>;
    abstract buildDataOnLoad: boolean;
    sortColumn(columnId: string): void;
    abstract buildData(input?: unknown): void;
    abstract setPage(pageNum: number): void;
    triggerRender(): void;
    setListener(listener: ListenerFunc): void;
    formatCell(row: T, columnId: string): string;
}

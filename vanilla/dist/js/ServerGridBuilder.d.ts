import type { Sorter, Paginator, ListenerFunc, DefaultRow, Column } from './types.js';
import { BaseGridBuilder } from './BaseGridBuilder.js';
export declare class ServerGridBuilder<T extends DefaultRow> extends BaseGridBuilder<T> {
    count: number;
    data: T[];
    paginator: Paginator;
    pageCount: number | undefined;
    columns: Column<T>[];
    sorters: Sorter<T>[];
    mapper: (data: unknown) => {
        data: T[];
        count: number;
    };
    url: URL;
    additionalHeaders: null;
    res: Response | undefined;
    listener?: ListenerFunc;
    loading: boolean;
    rowLink?: (row: T) => string;
    error: {
        code: number;
        message: string;
    } | null;
    buildQueryForSorters: (searchParams: URLSearchParams, sorters: ServerGridBuilder<T>['sorters']) => void;
    buildQueryForFilters: (searchParams: URLSearchParams, filters: [keyof T, string][]) => void;
    buildQueryForOffset: (searchParams: URLSearchParams, offset: number) => void;
    buildQueryForLimit: (searchParams: URLSearchParams, limit: number) => void;
    constructor({ columns, url, mapper, additionalHeaders, sorters, rowLink, limit, buildQueryForFilters, buildQueryForSorters, buildQueryForOffset, buildQueryForLimit, }: {
        columns: Column<T>[];
        url: string;
        mapper?: (data: unknown) => {
            data: ServerGridBuilder<T>['data'];
            count: number;
        };
        additionalHeaders?: null;
        sorters?: Sorter<T>[];
        rowLink?: ServerGridBuilder<T>['rowLink'];
        limit?: number;
        buildQueryForSorters?: ServerGridBuilder<T>['buildQueryForSorters'];
        buildQueryForFilters?: ServerGridBuilder<T>['buildQueryForFilters'];
        buildQueryForOffset?: ServerGridBuilder<T>['buildQueryForOffset'];
        buildQueryForLimit?: ServerGridBuilder<T>['buildQueryForLimit'];
    });
    buildQueryUrl(): string;
    buildData(): Promise<any>;
    query(url: string, options: any): Promise<Response>;
    buildPageCount(): number;
    setPage(pageNum: number): Promise<void>;
}

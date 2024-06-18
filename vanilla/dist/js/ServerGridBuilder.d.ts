/// <reference types="node" />
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
    additionalFetchOptions: RequestInit;
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
    selected?: BaseGridBuilder<T>['selected'];
    buildDataOnLoad: boolean;
    debounce: number;
    timeout: NodeJS.Timeout | null;
    constructor({ columns, url, mapper, additionalFetchOptions, sorters, rowLink, limit, offset, limitOptions, buildQueryForFilters, buildQueryForSorters, buildQueryForOffset, buildQueryForLimit, selected, initialData, debounce, }: {
        columns: Column<T>[];
        url: string;
        mapper?: (data: unknown) => {
            data: ServerGridBuilder<T>['data'];
            count: number;
        };
        additionalFetchOptions?: RequestInit;
        sorters?: Sorter<T>[];
        rowLink?: ServerGridBuilder<T>['rowLink'];
        limit?: number;
        offset?: number;
        limitOptions?: number[] | null;
        buildQueryForSorters?: ServerGridBuilder<T>['buildQueryForSorters'];
        buildQueryForFilters?: ServerGridBuilder<T>['buildQueryForFilters'];
        buildQueryForOffset?: ServerGridBuilder<T>['buildQueryForOffset'];
        buildQueryForLimit?: ServerGridBuilder<T>['buildQueryForLimit'];
        selected?: ServerGridBuilder<T>['selected'];
        initialData?: {
            data: T[];
            count: number;
        } | Promise<{
            data: T[];
            count: number;
        }>;
        debounce?: number;
    });
    buildQueryUrl(): string;
    buildData(): void;
    query(url: string, options: any): Promise<Response>;
    setPage(pageNum: number): Promise<void>;
}

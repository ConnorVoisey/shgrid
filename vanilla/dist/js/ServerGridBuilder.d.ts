import type { Columns, Sorter, Filters, Paginator, ListenerFunc, DefaultRow } from './types.js';
import { BaseGridBuilder } from './BaseGridBuilder.js';
type ConstructorArgs<T extends DefaultRow> = {
    columns: Columns<T>;
    url: string;
    mapper?: (data: unknown) => {
        data: BaseGridBuilder<T>['data'];
        count: number;
    };
    additionalHeaders?: null;
    sorters?: Sorter[];
    rowLink?: ServerGridBuilder<T>['rowLink'];
    limit?: number;
    buildQueryForSorters?: ServerGridBuilder<T>['buildQueryForSorters'];
    buildQueryForFilters?: ServerGridBuilder<T>['buildQueryForFilters'];
    buildQueryForOffset?: ServerGridBuilder<T>['buildQueryForOffset'];
    buildQueryForLimit?: ServerGridBuilder<T>['buildQueryForLimit'];
};
export declare class ServerGridBuilder<T extends DefaultRow> extends BaseGridBuilder<T> {
    count: number;
    data: T[];
    paginator: Paginator;
    pageCount: number | undefined;
    columns: Columns<T>;
    sorters: Sorter[];
    filters: Filters;
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
    buildQueryForSorters: (searchParams: URLSearchParams, sorters: BaseGridBuilder<T>['sorters']) => void;
    buildQueryForFilters: (searchParams: URLSearchParams, filters: string[][]) => void;
    buildQueryForOffset: (searchParams: URLSearchParams, offset: number) => void;
    buildQueryForLimit: (searchParams: URLSearchParams, limit: number) => void;
    constructor({ columns, url, mapper, additionalHeaders, sorters, rowLink, limit, buildQueryForFilters, buildQueryForSorters, buildQueryForOffset, buildQueryForLimit, }: ConstructorArgs<T>);
    buildQueryUrl(): string;
    buildData(): Promise<any>;
    query(url: string, options: any): Promise<Response>;
    buildPageCount(): number;
    setPage(pageNum: number): Promise<void>;
}
export {};

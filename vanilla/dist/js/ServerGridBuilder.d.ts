import type { Columns, Sorter, Filters, Paginator, ListenerFunc } from './types.js';
import { BaseGridBuilder } from './BaseGridBuilder.js';
type ConstructorArgs = {
    columns: Columns;
    url: string;
    mapper?: (data: unknown) => {
        data: BaseGridBuilder['data'];
        count: number;
    };
    additionalHeaders?: null;
    sorters?: Sorter[];
    rowLink?: ServerGridBuilder['rowLink'];
    limit?: number;
};
export declare class ServerGridBuilder extends BaseGridBuilder {
    count: number;
    data: {
        [key: string]: string;
    }[];
    paginator: Paginator;
    pageCount: number | undefined;
    columns: Columns;
    sorters: Sorter[];
    filters: Filters;
    mapper: (data: unknown) => {
        data: BaseGridBuilder['data'];
        count: number;
    };
    url: URL;
    additionalHeaders: null;
    res: Response | undefined;
    listener?: ListenerFunc;
    loading: boolean;
    rowLink?: (row: {
        [key: string]: string;
    }) => string;
    constructor({ columns, url, mapper, additionalHeaders, sorters, rowLink, limit }: ConstructorArgs);
    buildQueryUrl(): string;
    buildData(): Promise<any>;
    query(url: string, options: any): Promise<Response>;
    buildPageCount(): number;
    setPage(pageNum: number): Promise<void>;
}
export {};

import type { Columns, Sorter, Filters, Paginator, ListenerFunc } from './types.js';
import { BaseGridBuilder } from './BaseGridBuilder.js';
type ConstructorArgs = {
    columns: Columns;
    url: string;
    mapper?: (data: unknown) => {
        data: string[][];
        count: number;
    };
    additionalHeaders?: null;
};
export declare class ServerGridBuilder extends BaseGridBuilder {
    count: number;
    data: string[][];
    paginator: Paginator;
    pageCount: number | undefined;
    columns: Columns;
    sorter?: Sorter;
    filters: Filters;
    mapper: (data: unknown) => {
        data: string[][];
        count: number;
    };
    url: URL;
    additionalHeaders: null;
    res: Response | undefined;
    listener?: ListenerFunc;
    loading: boolean;
    constructor({ columns, url, mapper, additionalHeaders }: ConstructorArgs);
    buildQueryUrl(): string;
    buildData(): Promise<any>;
    query(url: string, options: any): Promise<Response>;
    buildPageCount(): number;
    setPage(pageNum: number): Promise<void>;
}
export {};

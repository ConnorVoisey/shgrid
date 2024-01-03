export type Column<T extends DefaultRow> = {
    label: string;
    id: keyof T;
    hidden?: boolean;
    filter?: string;
    searchable?: boolean;
    sortable?: boolean;
    formatter?: (rowValue: T) => string;
    link?: (rowValue: T) => string;
};
export type Sorter<T extends DefaultRow> = [keyof T, 'asc' | 'desc'];
export type Filters<T extends DefaultRow> = Record<keyof T, string>;
export type Paginator = {
    limit: number;
    offset: number;
};
export type ListenerFunc = () => any;
export type DefaultRow = Record<string, unknown>;

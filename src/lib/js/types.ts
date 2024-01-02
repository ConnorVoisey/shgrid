export type Column<T> = {
	label: string;
	id: string;
	hidden?: boolean;
	filter?: string;
	searchable?: boolean;
	sortable?: boolean;
	formatter?: (rowValue: T) => string;
	link?: (rowValue: T) => string;
};
export type Entry = { [key: string]: string };
export type Entries = Entry[];
export type Sorter = [string, 'asc' | 'desc'];
export type Filters = { [key: string]: string };
export type Paginator = {
	limit: number;
	offset: number;
};
export type ListenerFunc = () => any;
export type DefaultRow = Record<string, unknown>;

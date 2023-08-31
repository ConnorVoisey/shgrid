export type Columns = Column[];
export type Column = {
	label: string;
	id: string;
	hidden?: boolean;
	filter?: string;
	searchable?: boolean;
	sortable?: boolean;
	formatter?: (rowValue: Record<string, unknown>) => any;
	link?: (rowValue: { [key: string]: unknown }) => string;
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

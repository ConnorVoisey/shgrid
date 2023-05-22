export type Columns = Column[];
export type Column = {
	label: string;
	id: string;
	hidden?: boolean;
	filter?: string;
	formatter?: (rowValue: { [key: string]: unknown }) => any;
	link?: (rowValue: { [key: string]: unknown }) => string;
};
export type Entry = { [key: string]: string };
export type Entries = Entry[];
export type Sorter = {
	columnId: string;
	isAsc: boolean;
};
export type Filters = { [key: string]: string };
export type Paginator = {
	limit: number;
	page: number;
};
export type ListenerFunc = () => any;

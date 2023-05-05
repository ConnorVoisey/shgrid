export type Columns = Column[];
export type Column = { label: string; id: string; sort?: boolean };
export type Entry = { [key: string]: string };
export type Entries = Entry[];
export type Sort = {
	columnId: string;
	isAsc: boolean;
};
export type Sorters = Sort[];
export type Filters = { [key: string]: string };
export type Paginator = {
	limit: number;
	page: number;
};

import type { Snippet } from 'svelte';

export { default as Shgrid } from './shgrid.svelte';

export type Column = {
	key: string;
	label?: string;
	filter?: Filter;
	sortable?: boolean;
	cellRender: CellRender;
};
export type Filter = StringFilter | NumberFilter | SelectFilter;
export type NumberFilter = {
	type: 'number';
	value?: number;
	step?: string;
	min?: number;
	max?: number;
};
export type StringFilter = {
	type: 'string';
	value?: string;
};
export type SelectFilter = {
	type: 'select';
	value?: string;
	options: {
		value: string;
		label: string;
	}[];
	multiple?: boolean;
	svelecteArgs?: any[]; // TODO: type this properly
};
export type Sorter = {
	key: string;
	dir: 'asc' | 'desc';
};
export type Props = {
	columns: Column[];
	sorters?: Sorter[];
	isLoading?: boolean;
	limit?: number;
	offset?: number;
	debounceMs?: number;
	fetchOnMount?: boolean;
	fetcher: Fetcher;
	onAfterFetch?: () => void;
	onInput?: () => void;
	data?: Data | null;
	error?: Error | null;
	aSnippet?: Snippet<[string]>;
};

export type Data = {
	rows: Record<string, unknown>[];
	count: number;
};

export type Error = {
	code: number;
	message: number;
};

export type Fetcher = (input: {
	columns: Column[];
	sorters: Sorter[];
	limit: number;
	offset: number;
}) => Promise<{ data: Data; error: null } | { data: null; error: Error }>;

export type Row = Record<string, any>;
export type CellRenderJustText = (row: Row, col: Column) => string;
export type CellRenderText = {
	type: 'text';
	label: (row: Row, col: Column) => string;
	link?: (row: Row, col: Column) => string | null;
	highlightLink?: boolean;
};
export type CellRenderCustom = { type: 'custom'; snippet: Snippet<[Row, Column]> };
export type CellRender = CellRenderJustText | CellRenderText | CellRenderCustom;

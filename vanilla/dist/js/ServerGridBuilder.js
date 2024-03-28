import { BaseGridBuilder } from './BaseGridBuilder.js';
export class ServerGridBuilder extends BaseGridBuilder {
    count;
    data;
    paginator;
    pageCount;
    columns;
    sorters;
    mapper;
    url;
    additionalFetchOptions;
    res;
    listener;
    loading;
    rowLink;
    error;
    buildQueryForSorters;
    buildQueryForFilters;
    buildQueryForOffset;
    buildQueryForLimit;
    selected;
    buildDataOnLoad;
    constructor({ columns, url, mapper, additionalFetchOptions, sorters, rowLink, limit, offset, buildQueryForFilters, buildQueryForSorters, buildQueryForOffset, buildQueryForLimit, selected, initialData, }) {
        super();
        this.columns = columns;
        this.mapper = mapper ?? (data => data);
        this.paginator = {
            limit: limit ?? 15,
            offset: offset ?? 0,
        };
        this.url = new URL(url);
        this.data = [];
        this.count = 0;
        this.additionalFetchOptions = additionalFetchOptions ?? {};
        this.sorters = sorters ?? [];
        this.loading = true;
        this.rowLink = rowLink;
        this.error = null;
        this.selected = selected;
        this.buildQueryForSorters =
            buildQueryForSorters ?? ((searchParams, sorters) => searchParams.append('sort', JSON.stringify(sorters)));
        this.buildQueryForFilters =
            buildQueryForFilters ??
                ((searchParams, filters) => searchParams.append('filters', JSON.stringify(filters)));
        this.buildQueryForOffset =
            buildQueryForOffset ?? ((searchParams, offset) => searchParams.append('offset', offset.toString()));
        this.buildQueryForLimit =
            buildQueryForLimit ?? ((searchParams, limit) => searchParams.append('limit', limit.toString()));
        this.buildDataOnLoad = initialData !== undefined;
        if (initialData !== undefined) {
            this.loading = true;
            if (initialData instanceof Promise) {
                Promise.resolve(initialData).then(val => {
                    this.loading = false;
                    this.data = val.data;
                    this.count = val.count;
                    this.triggerRender();
                });
            }
            else {
                this.loading = false;
                this.data = initialData.data;
                this.count = initialData.count;
                this.triggerRender();
            }
        }
    }
    buildQueryUrl() {
        // clone the url so we do not mutate the original url
        const urlCopy = new URL(this.url);
        // the filters are stored inside the column values
        const filters = [];
        for (const column of this.columns) {
            if (column.filter === undefined || column.filter === '')
                continue;
            filters.push([column.id, column.filter]);
        }
        this.buildQueryForFilters(urlCopy.searchParams, filters);
        this.buildQueryForSorters(urlCopy.searchParams, this.sorters);
        this.buildQueryForOffset(urlCopy.searchParams, this.paginator.offset);
        this.buildQueryForLimit(urlCopy.searchParams, this.paginator.limit);
        const urlString = urlCopy.toString();
        // console.log({ urlString });
        return urlString;
    }
    async buildData() {
        this.loading = true;
        this.triggerRender();
        try {
            this.res = await this.query(this.buildQueryUrl(), {});
            if (this.res.status >= 200 && this.res.status < 300) {
                this.error = null;
                const jsonRes = await this.res.json();
                let { data, count } = this.mapper(jsonRes);
                this.data = data;
                this.count = count;
            }
            else {
                this.error = { code: this.res.status, message: this.res?.statusText };
            }
        }
        catch (e) {
            console.log({ e });
            this.error = {
                code: 500,
                message: this.res?.statusText ?? e.message ?? 'Unknown error occured',
            };
        }
        this.loading = false;
        this.triggerRender();
    }
    async query(url, options) {
        return await fetch(url, Object.assign(options, this.additionalFetchOptions));
    }
    async setPage(pageNum) {
        this.paginator.offset = this.paginator.limit * pageNum;
        this.buildData();
    }
}

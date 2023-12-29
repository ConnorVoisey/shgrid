import { BaseGridBuilder } from './BaseGridBuilder.js';
export class ServerGridBuilder extends BaseGridBuilder {
    count;
    data;
    paginator;
    pageCount;
    columns;
    sorters;
    filters;
    mapper;
    url;
    additionalHeaders;
    res;
    listener;
    loading;
    rowLink;
    error;
    constructor({ columns, url, mapper, additionalHeaders, sorters, rowLink, limit }) {
        super();
        this.columns = columns;
        this.mapper = mapper ?? ((data) => data);
        this.filters = {};
        this.paginator = {
            limit: limit ?? 15,
            offset: 0,
        };
        this.url = new URL(url);
        this.data = [];
        this.count = 0;
        //TODO: remeber what this is supposed to do
        this.additionalHeaders = additionalHeaders ?? null;
        this.sorters = sorters ?? [];
        this.loading = true;
        this.rowLink = rowLink;
        this.error = null;
    }
    buildQueryUrl() {
        const options = {
            limit: this.paginator.limit.toString(),
            offset: this.paginator.offset.toString(),
            sort: JSON.stringify(this.sorters),
        };
        const filters = [];
        for (const column of this.columns) {
            if (column.filter === undefined || column.filter === '')
                continue;
            filters.push([column.id, column.filter]);
        }
        options.filters = JSON.stringify(filters);
        this.url.search = new URLSearchParams(options).toString();
        const urlString = this.url.toString();
        console.log({ urlString });
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
                this.buildPageCount();
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
            this.error = { code: 500, message: this.res?.statusText ?? e.message ?? 'Unknown error occured' };
        }
        this.loading = false;
        this.triggerRender();
    }
    async query(url, options) {
        return await fetch(url, options);
    }
    buildPageCount() {
        if (this.res === undefined)
            return 0;
        const count = this.res.headers.get('X-Total-Count');
        if (count === null)
            return 0;
        this.pageCount = Math.ceil(+count / this.paginator.limit);
        return this.pageCount;
    }
    async setPage(pageNum) {
        this.paginator.offset = this.paginator.limit * pageNum;
        this.buildData();
    }
}

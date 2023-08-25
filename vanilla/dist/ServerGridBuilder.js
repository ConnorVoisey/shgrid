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
    constructor({ columns, url, mapper, additionalHeaders, sorters, rowLink, limit }) {
        super();
        this.columns = columns;
        this.mapper = mapper ?? ((data) => data);
        this.filters = {};
        this.paginator = {
            limit: limit ?? 15,
            page: 0,
        };
        this.url = new URL(url);
        this.data = [];
        this.count = 0;
        //TODO: remeber what this is supposed to do
        this.additionalHeaders = additionalHeaders ?? null;
        this.sorters = sorters ?? [];
        this.loading = true;
        this.rowLink = rowLink;
    }
    buildQueryUrl() {
        const filters = this.columns.filter(column => column.filter != undefined && column.filter !== '');
        const options = {
            limit: this.paginator.limit.toString(),
            page: this.paginator.page.toString(),
            sort: JSON.stringify(this.sorters),
        };
        for (const column of filters) {
            options[column.id] = column.filter ?? '';
        }
        this.url.search = new URLSearchParams(options).toString();
        const urlString = this.url.toString();
        console.log({ urlString });
        return urlString;
    }
    async buildData() {
        this.loading = true;
        this.triggerRender();
        this.res = await this.query(this.buildQueryUrl(), {});
        const jsonRes = await this.res.json();
        this.buildPageCount();
        let { data, count } = this.mapper(jsonRes);
        this.data = data;
        this.count = count;
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
        this.paginator.page = pageNum;
        this.buildData();
    }
}

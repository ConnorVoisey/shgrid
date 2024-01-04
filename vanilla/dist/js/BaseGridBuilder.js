export class BaseGridBuilder {
    sortColumn(columnId) {
        if (this.sorters.length === 0 || this.sorters[0][0] !== columnId) {
            this.sorters = [[columnId, 'asc']];
        }
        else {
            if (this.sorters[0][1] === 'asc') {
                this.sorters[0][1] = 'desc';
            }
            else {
                this.sorters = [];
            }
        }
        this.setPage(0);
        this.buildData();
    }
    triggerRender() {
        if (this.listener)
            this.listener();
    }
    setListener(listener) {
        this.listener = listener;
    }
    formatCell(row, columnId) {
        const column = this.columns.find(column => column.id == columnId);
        if (column === undefined) {
            console.error('formatter could not find column: ', columnId);
            return '';
        }
        if (column.formatter == undefined)
            return row[columnId];
        return column.formatter(row);
    }
}

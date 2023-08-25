export class BaseGridBuilder {
    sortColumn(columnId) {
        if (this.sorters.length === 0 || this.sorters[0].columnId !== columnId) {
            this.sorters = [
                {
                    columnId,
                    isAsc: true,
                },
            ];
        }
        else {
            if (this.sorters[0].isAsc) {
                this.sorters[0].isAsc = false;
            }
            else {
                this.sorters = [];
            }
        }
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

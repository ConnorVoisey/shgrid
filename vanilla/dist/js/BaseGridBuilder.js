export class BaseGridBuilder {
    sortColumn(columnId) {
        if (this.sorter === undefined || this.sorter.columnId !== columnId) {
            this.sorter = {
                columnId,
                isAsc: true
            };
        }
        else {
            this.sorter.isAsc = !this.sorter.isAsc;
        }
        console.log(this.sorter);
        this.buildData();
    }
    mapToString(obj) {
        let arr = [];
        let keys = this.columns.map((column) => column.id);
        return obj.map((row) => keys.map((key) => row[key] ?? ''));
    }
    triggerRender() {
        if (this.listener)
            this.listener();
    }
    setListener(listener) {
        this.listener = listener;
    }
}

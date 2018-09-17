import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TableDataSource }  from 'framework/components/table-material/table-data-source';
import { UnitService } from '../shared/unit.service';
import { faEdit, faTrash, faPlus, faKey } from '@fortawesome/fontawesome-free-solid';
import { SaySuaDialog } from 'framework/shared/dialog/dialog.service';
import { UnitFormDialogComponent } from './unit-form.dialog';
import { UtilsService } from 'framework/shared/utils/utils.service';
import { SSToasterService } from 'framework/shared/toaster/toaster.service';

@Component({
    selector: 'my-unit-list',
    templateUrl: 'unit-list.component.html'
})

export class UnitListComponent implements OnInit {
    @ViewChild('unitActionTemplate') unitActionTemplate:  TemplateRef<any>;

    faEdit = faEdit;
    faTrash = faTrash;
    faPlus = faPlus;
    faKey = faKey;

    tableData: TableDataSource<any>;

    constructor(
        private unitService: UnitService,
        private ssDialog: SaySuaDialog,
        private utils: UtilsService,
        private toaster: SSToasterService
    ) { }

    ngOnInit() {
        this.tableData = new TableDataSource({
            data: [],
            columnsDefine: [
                // {field: 'id', label: 'ID'},
                {field: 'name', label: 'Tên'},
                {field: 'action', label: 'Thao tác', template: this.unitActionTemplate}
            ]
        });

        this.getUnitList();
    }

    getUnitList() {
        this.unitService.getList()
        .subscribe( data => {
            data.forEach(item => {
                this.convertItem(item);
            });
            data.sort((a, b) => {
                return a.vnAlias < b.vnAlias ? -1 : 1;
            });
            this.tableData.update(data);
        });
    }

    openUnitForm(item?) {
        if (!item) {
            item = {};
        }

        this.ssDialog.open(UnitFormDialogComponent,  {
            width: '500px',
            data: {unit: item}
        }).subscribe( newItem => {
            if (!newItem) {
                return;
            }
            this.convertItem(newItem);
            if (item.id) {
                Object.assign(item, newItem);
            } else {
                this.tableData.data.push(newItem);
                this.tableData.update();
                this.toaster.info('Thêm đơn vị', 'Đã thêm đơn vị thành công');
            }
        });
    }

    deleteItem(item) {
        this.ssDialog.openConfirm({
            title: `Xóa đơn vị`,
            content: `Bạn có muốn xóa đơn vị [${item.name}] không?`
        }).subscribe( result => {
            if (result) {
                this.unitService.remove(item)
                .subscribe( () => {
                    this.tableData.data.splice(this.tableData.data.indexOf(item), 1);
                    this.tableData.update();
                });
            }
        });
    }

    private convertItem(item) {
        item.vnAlias = this.utils.changeVN(item.name);
    }
}

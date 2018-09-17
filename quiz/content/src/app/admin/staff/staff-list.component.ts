import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TableDataSource }  from 'framework/components/table-material/table-data-source';
import { StaffService } from '../shared/staff.service';
import { faEdit, faTrash, faPlus, faKey, faEye } from '@fortawesome/fontawesome-free-solid';
import { SaySuaDialog } from 'framework/shared/dialog/dialog.service';
import { StaffFormDialogComponent } from './staff-form.dialog';
import { UtilsService } from 'framework/shared/utils/utils.service';
import { Router } from '@angular/router';
import { UnitService } from '../shared/unit.service';

@Component({
    selector: 'my-staff-list',
    templateUrl: 'staff-list.component.html'
})

export class StaffListComponent implements OnInit {
    @ViewChild('staffActionTemplate') staffActionTemplate:  TemplateRef<any>;
    @ViewChild('staffUnitTemplate') staffUnitTemplate:  TemplateRef<any>;

    faEdit = faEdit;
    faTrash = faTrash;
    faPlus = faPlus;
    faKey = faKey;
    faEye =  faEye;

    tableData: TableDataSource<any>;
    unitList: any = {};
    unitsData = [];

    constructor(
        private staffService: StaffService,
        private unitService: UnitService,
        private ssDialog: SaySuaDialog,
        private utils: UtilsService,
        private router: Router
    ) { }

    ngOnInit() {
        this.tableData = new TableDataSource({
            data: [],
            columnsDefine: [
                // {field: 'id', label: 'ID'},
                {field: 'unit_id', label: 'Đơn vị', template: this.staffUnitTemplate},
                {field: 'code', label: 'Mã'},
                {field: 'name', label: 'Tên'},
                {field: 'action', label: 'Thao tác', template: this.staffActionTemplate}
            ]
        });

        this.getStaffList();

        // Get unit list
        this.unitService.getList()
        .subscribe(data => {
            this.unitsData = data;
            data.forEach(unit => {
                this.unitList[unit.id] = unit;
            });
        });
    }

    getStaffList() {
        this.staffService.getList()
        .subscribe( data => {
            data.forEach(item => {
                this.convertItem(item);
            });

            this.tableData.update(data);
        });
    }

    openStaffDetail(item) {
        this.router.navigateByUrl('/admin/staffs/detail/' + item.id);
    }

    openStaffForm(item?) {
        if (!item) {
            // Go to add page
            this.router.navigateByUrl('/admin/staffs/add');
            return;
        }

        this.ssDialog.open(StaffFormDialogComponent,  {
            width: '500px',
            data: {staff: item, units: this.unitsData}
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
            }
        });
    }

    deleteItem(item) {
        this.ssDialog.openConfirm({
            title: `Xóa nhân viên`,
            content: ` Bạn có muốn xóa nhân viên [${item.name}] không?`
        }).subscribe( result => {
            if (result) {
                this.staffService.remove(item)
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

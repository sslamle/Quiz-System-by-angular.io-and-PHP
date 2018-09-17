import { Component, OnInit } from '@angular/core';
import {
    faPlus,
    faSave,
    faTrashAlt
} from '@fortawesome/fontawesome-free-solid';
import { StaffService } from '../shared/staff.service';
import { SSToasterService } from 'framework/shared/toaster/toaster.service';
import { Router } from '@angular/router';
import { UnitService } from '../shared/unit.service';

@Component({
    selector: 'my-staff-add',
    templateUrl: 'staff-add.component.html'
})

export class StaffAddComponent implements OnInit {
    faPlus = faPlus;
    faSave = faSave;
    faTrashAlt = faTrashAlt;

    staffs = [];
    units = [];

    constructor(
        private router: Router,
        private staffService: StaffService,
        private unitService: UnitService,
        private ssToaster: SSToasterService
    ) { }

    ngOnInit() {
        // Get unit list
        this.unitService.getList()
        .subscribe(data => {
            this.units = data;
        });

        // Add empty list
        for (let i = 0; i < 15; i++) {
            this.addStaff();
        }
    }

    addStaff(index?) {
        if (index === undefined || index === this.staffs.length - 1) {
            this.staffs.push({
                code: '',
                name: ''
            });
        }
    }

    remove(staff) {
        this.staffs.splice(this.staffs.indexOf(staff), 1);
    }

    save() {
        let saveList = [];
        this.staffs.forEach(staff => {
            staff.code = staff.code.trim();
            staff.name = staff.name.trim();
            if (staff.code && staff.name) {
                saveList.push(staff);
            }
        });
        this.staffService.saveArray(saveList)
        .subscribe(() => {
            // Go to staff list
            this.ssToaster.info('Thêm nhân viên', ' Đã lưu danh sách nhân viên.');
            this.router.navigateByUrl('/admin/staffs/list');
        });
    }
}

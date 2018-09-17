
import { StaffService } from '../shared/staff.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'my-staff-form',
    templateUrl: 'staff-form.dialog.html'
})
export class StaffFormDialogComponent implements OnInit {
    title = 'Thêm nhân viên';
    staff: any = {};
    isRequesting = false;
    error: any = {};
    units = [];

    constructor(
        public dialogRef: MatDialogRef<StaffFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private staffService: StaffService
    ) {}

    ngOnInit(): void {
        if (this.data.staff.id) {
            this.title = 'Chỉnh sửa nhân viên';
        }
        this.staff = Object.assign({}, this.data.staff);
        this.units = this.data.units;
    }

    save() {
        this.error = {};
        if (this.isRequesting) {
            return;
        }

        this.isRequesting = true;
        this.staffService.saveOrCreate(this.staff)
        .subscribe(
            data => {
                this.close(data);
            },
            err => { this.error = err; this.isRequesting = false; },
            () => { this.isRequesting = false; }
        );
    }

    close(data?) {
        this.dialogRef.close(data);
    }
}


import { UnitService } from '../shared/unit.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'my-unit-form',
    templateUrl: 'unit-form.dialog.html'
})
export class UnitFormDialogComponent implements OnInit {
    title = 'Thêm đơn vị';
    unit: any = {};
    isRequesting = false;

    constructor(
        public dialogRef: MatDialogRef<UnitFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private unitService: UnitService
    ) {}

    ngOnInit(): void {
        if (this.data.unit.id) {
            this.title = 'Sửa đơn vị';
        }
        this.unit = Object.assign({}, this.data.unit);
    }

    save() {
        if (this.isRequesting) {
            return;
        }

        this.isRequesting = true;
        this.unitService.saveOrCreate(this.unit)
        .subscribe(
            data => {
                this.close(data);
            },
            err => { console.log(err); },
            () => { this.isRequesting = false; }
        );
    }

    close(data?) {
        this.dialogRef.close(data);
    }
}

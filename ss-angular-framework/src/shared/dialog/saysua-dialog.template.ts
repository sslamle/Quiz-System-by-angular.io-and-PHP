import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'my-dialog',
    templateUrl: 'dialog.component.html'
})
export class SaySuaDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<SaySuaDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {

    }
    
    close(data?) {
        this.dialogRef.close(data);
    }
}

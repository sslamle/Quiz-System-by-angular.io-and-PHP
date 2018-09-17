import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IDialogData } from './dialog.module';

@Component({
    selector: 'my-confirm-dialog',
    templateUrl: 'confirm-dialog.component.html'
})
export class ConfirmDialogComponent {
    data: IDialogData = {
        title: 'Vui lòng xác nhận',
        content: 'Bạn có chắc muốn thực hiện việc này không?',
        okText: 'Đồng ý',
        cancelText: 'Đóng'
    };

    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data: any
    ) {
        if (data.title) this.data.title = data.title;
        if (data.content) this.data.content = data.content;
        if (data.okText) this.data.okText = data.okText;
        if (data.cancelText) this.data.cancelText = data.cancelText;
    }
}

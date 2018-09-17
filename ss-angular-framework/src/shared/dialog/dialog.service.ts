import { Injectable } from '@angular/core';
import { IDialogData } from './dialog.module';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

import { ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable()
export class SaySuaDialog {

    constructor(
        private dialog: MatDialog
    ) { }

    openConfirm (data: IDialogData):Observable<any> {
        let dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '500px',
            data: data
        });

        return dialogRef.afterClosed()
    }

    open (componentOrTemplateRef, options?) {
        return this.dialog.open(componentOrTemplateRef, options).afterClosed();
    }
}
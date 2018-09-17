
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import { SaySuaDialog } from './dialog.service';

@NgModule({
    imports: [
        MatButtonModule,
        MatDialogModule
    ],
    exports: [],
    declarations: [
        ConfirmDialogComponent
    ],
    entryComponents: [
        ConfirmDialogComponent
    ],
    providers: [
        SaySuaDialog
    ],
})
export class DialogModule { }


export interface IDialogData  {
    title: string,
    content: string,
    okText?: string,
    cancelText?: string
}
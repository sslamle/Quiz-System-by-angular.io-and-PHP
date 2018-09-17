import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'my-user-form',
    templateUrl: 'user-form.dialog.html'
})

export class UserFormDialogComponent {
    user: any = {};
    title = 'Thêm quản trị viên';
    url = 'api/admin/users';
    isRequesting = false;

    constructor(
        public dialogRef: MatDialogRef<UserFormDialogComponent>,
        private http: HttpClient,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.user = Object.assign({}, data.user);
        if (this.user.id) {
            this.title = 'Sửa quản trị viên';
        }
    }

    save() {
        if (this.isRequesting) {
            return;
        }

        this.isRequesting = true;
        this.user.role = 'mod';

        if (this.user.id) {
            this.url += '/' + this.user.id;
        }
        this.http.post(this.url, this.user)
        .subscribe (
            user => {
                this.dialogRef.close(user);
            },
            err => {
                console.log(err);
            },
            () => {
                this.isRequesting = false;
            }
        );
    }
}

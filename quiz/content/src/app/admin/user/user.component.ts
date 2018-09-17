import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faEdit, faTrash, faPlus, faKey } from '@fortawesome/fontawesome-free-solid';
import { TableDataSource } from 'framework/components/table-material';
import { MatDialog } from '@angular/material';
import { UserFormDialogComponent } from './user-form.dialog';
import { SaySuaDialog } from 'framework/shared/dialog/dialog.service';
import { SSToasterService } from 'framework/shared/toaster/toaster.service';
import { AuthService } from 'framework/shared/auth/auth.service';

@Component({
    selector: 'my-admin-user',
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
    @ViewChild('userActionTemplate') userActionTemplate:  TemplateRef<any>;
    @ViewChild('userRoleTemplate') userRoleTemplate:  TemplateRef<any>;

    faEdit = faEdit;
    faTrash = faTrash;
    faPlus = faPlus;
    faKey = faKey;

    tableData: TableDataSource<any>;

    constructor(
        private http: HttpClient,
        private dialog: MatDialog,
        private ssDialog: SaySuaDialog,
        private toaster: SSToasterService,
        public authService: AuthService
    ) {}

    ngOnInit () {
        this.tableData = new TableDataSource({
            data: [],
            columnsDefine: [
                // {label: 'ID', field: 'id'},
                {label: 'Tên đăng nhập', field: 'username'},
                {label: 'Tên', field: 'name'},
                {label: 'Vai trò', field: 'role', template: this.userRoleTemplate},
                {label: 'Thao tác', field: 'action', template: this.userActionTemplate}
            ]
        });

        this.getUsers();
    }

    getUsers () {
        this.http.get<any>('api/admin/users')
        .subscribe ( data => {
            this.tableData.data = data;
        });
    }

    openUserForm (user?: any, isChangePassword?: boolean): void {
        if (!user) {
            user = {};
        }

        let dialogRef = this.dialog.open(UserFormDialogComponent, {
            width: '500px',
            data: {user: user, isChangePassword: isChangePassword}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (!result) {
                return;
            }
            if (user.id) {
                Object.assign(user, result);
            } else {
                this.tableData.data.push(result);
                this.toaster.info('Thêm quản trị viên', 'Đã thêm quản trị viên thành công');
            }
            this.tableData.update();
        });
    }

    deleteItem (user) {
        this.ssDialog.openConfirm({
            title: `Xóa quản lý`,
            content: ` Bạn có muốn xóa quản lý [${user.name}] không?`
        }).subscribe( result => {
            if (result) {
                this.http.delete('api/admin/users/' + user.id)
                .subscribe(
                    () => {
                        this.tableData.data.splice(this.tableData.data.indexOf(user), 1);
                        this.tableData.update();
                    }
                )
            }
        });
    }
}

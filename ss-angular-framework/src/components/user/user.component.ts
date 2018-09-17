import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SSToasterService } from '../../shared/toaster/toaster.service'

@Component({
    selector: 'ss-user-component',
    templateUrl: 'user.component.html'
})

export class SSUserComponent implements OnInit {
    user: any = {};
    serverErr: any = {};

    constructor(
        private http: HttpClient,
        private toaster: SSToasterService
    ) { }

    ngOnInit() { }

    save() {
        this.serverErr = {};
        this.http.post<any>('api/admin/users/updateCurrent', this.user)
        .subscribe(() => {
            this.toaster.success('Đổi mật khẩu', 'Đã đổi mật khẩu thành công.')
        }, err => {
            this.serverErr = err;
        });
    }
}
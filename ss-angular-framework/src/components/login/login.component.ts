import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthService } from '../../shared/auth/auth.service';

@Component({
    selector: 'my-login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    wrapperElm: any;
    loginData: any = {
        username: '',
        password: ''
    };
    result: any = {
        msg: '',
        isSuccess: false
    };

    constructor(
        private authService: AuthService,
        private http: HttpClient) { }

    ngOnInit() {
        if (this.authService.isLoggedIn()) return this.authService.goToSuccessPage();
    }

    login() {
        this.result.msg = '';
        this.http.post('api/admin/auth/login', this.loginData).subscribe(
            (data: any) => {
                this.result.msg = 'Đăng nhập thành công.';
                this.result.isSuccess = true;
                this.authService.setAuthData(data);
                this.authService.goToSuccessPage();
            },
            () => {
                this.result.msg = 'Đăng nhập không thành công. Vui lòng nhập lại thông tin đăng nhập.';
                this.result.isSuccess = false;
            }
        )
    }
}

import { Component, OnInit } from '@angular/core';
import { faUser, faBook, faBriefcase, faUserSecret, faAddressBook, faHome, faUniversity, faQuestionCircle } from '@fortawesome/fontawesome-free-solid';
import { AuthService, IAuthData } from 'framework/shared/auth//auth.service';
import { IMenuItem } from 'framework/layout/layout.module';

@Component({
    selector: 'my-admin',
    templateUrl: 'admin.component.html'
})

export class AdminComponent implements OnInit {
    faUser = faUser;
    faBook = faBook;
    faBriefcase = faBriefcase;
    faUserSecret = faUserSecret;
    faAddressBook = faAddressBook;
    faHome = faHome;
    faUniversity = faUniversity;
    faQuestionCircle = faQuestionCircle;

    authData: IAuthData;
    menuItems: IMenuItem[] = [];

    constructor(
        private authService: AuthService
    ) {
        this.authData = this.authService.getAuthData();
    }

    ngOnInit() {
        this.menuItems = [
            { router: '/admin/questions', text: 'Câu hỏi', icon: faBook},
            { router: '/admin/exams', text: 'Đợt thi', icon: faBriefcase },
            { router: '/admin/categories', text: 'Chuyên ngành', icon: faAddressBook},
            { router: '/admin/units', text: 'Đơn vị', icon: faUniversity},
            { router: '/admin/staffs', text: 'Nhân viên', icon: faUser},
            { router: '/admin/users', text: 'Quản trị viên', icon: faUserSecret, isHide: this.authData.role !== 'admin'},
            { router: 'https://docs.google.com/document/d/1Ur_QJl2Gff_CjwxCyBM6mCfMGLd2eNJPigTt6ICoRmk/edit?usp=sharing', text: 'Hướng dẫn', icon: faQuestionCircle, isExternalUrl: true},
            { router: '/staff/home', text: 'Trang thi', icon: faHome}
        ];
    }
}

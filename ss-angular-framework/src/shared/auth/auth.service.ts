import { Injectable, Inject, InjectionToken } from '@angular/core';
import { LocalStorageService } from '../../shared/localstorage/localstorage.service';
import { HttpClient } from '@angular/common/http';
import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { Observable, ReplaySubject } from 'rxjs';

export const AUTH_CONFIG = new InjectionToken<IAuthConfig>('app.auth');

@Injectable()
export class AuthService {
    key = 'auth';
    authData: IAuthData;
    config: IAuthConfig;
    currentUser: any;

    constructor(
        private localStorage: LocalStorageService,
        private http: HttpClient,
        @Inject(AUTH_CONFIG) config
    ) {
        this.setConfig(config);
        this.fillFromLocal();

        // Get current user
        this.http.get<any>('api/admin/auth/currentUser')
        .subscribe(data => {
            this.currentUser = data;
        });
    }

    // Get auth data from local storage
    fillFromLocal () {
        let data = this.localStorage.get(this.key);
        if (data) {
            this.authData = <IAuthData> data;
            try {
                let token = jwtDecode(this.authData.access_token);

                if (moment(token.exp).diff(moment(), 'hours') > -24) {
                    // Renew token
                    this.http.get<any>('api/admin/auth/renew')
                    .subscribe(data => {
                        this.authData.access_token = data.access_token;
                        this.setAuthData(this.authData);
                    });
                }
            } catch ( e ) {
                console.log(e);
            };
        }
    }

    // Save auth data to local storage
    setAuthData (data) {
        this.authData = <IAuthData> data;
        this.localStorage.set(this.key, data);
        // console.log(data);
    }

    getAuthData () {
        return this.authData;
    }

    removeAuthData() {
        this.localStorage.remove(this.key);
    }

    isLoggedIn() {
        return this.authData && !!this.authData.access_token;
    }

    hasPermissions(permission: string) :Observable<boolean> {
        let result = new ReplaySubject<boolean>(1);
        if (this.currentUser) {
            result.next(this.checkPermissions(permission));
        } else {
            this.http.get<any>('api/admin/auth/currentUser')
            .subscribe(data => {
                this.currentUser = data;
                result.next(this.checkPermissions(permission));
            });
        }
        return result;
    }

    hasPermissionForTemplate(permission: string): boolean {
        if (!this.currentUser) {
            return true;
        } else {
            return this.checkPermissions(permission);
        }
    }

    private checkPermissions(permission: string) :boolean {
        if (this.currentUser.role === 'admin') {
            return true;
        } else {
            return this.currentUser.permissions.indexOf(permission) !== -1
        }
    }

    setConfig (config: IAuthConfig) {
        this.config = config;
        this.localStorage.set('authConfig', config);
    }

    goToLogin() {
        // this.router.navigateByUrl(this.config.loginUrl);
        this.removeAuthData();
        location.href = document.baseURI.slice(0, -1) + this.config.loginUrl;
    }

    goToSuccessPage() {
        location.href = document.baseURI.slice(0, -1) + this.config.successRedirectUrl;
    }

    logout() {
        this.localStorage.remove(this.key);
        this.goToLogin();
    }
}

export interface IAuthData {
    access_token: string,
    username: string,
    name: string,
    role?: string,
    id: string,
    [name: string]: any
}

export interface IAuthConfig {
    loginUrl: string,
    successRedirectUrl: string // URL to redirect after login
}
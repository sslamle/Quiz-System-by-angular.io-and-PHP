
import { of , throwError as observableThrowError,  Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse  } from '@angular/common/http';
import { LocalStorageService } from '../localstorage/localstorage.service';


@Injectable()
export class AuthHeaderHttpInterceptor implements HttpInterceptor {

    constructor(
        private localStorage: LocalStorageService,
        // private router: Router
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authData = this.localStorage.get('auth');

        if (authData) {
            const headers = req.headers
                // Set access token to http request
                .set('Authorization', 'Bearer ' + authData.access_token);

            const authReq = req.clone({ headers });
            return next.handle(authReq).pipe(catchError(evt => this.onResponse(evt)));
        }

        return next.handle(req).pipe(tap(evt => this.onResponse(evt)));

    }

    onResponse(evt: any) {
        if (evt instanceof HttpErrorResponse) {
            if (evt.status === 401 && evt.url.indexOf(document.domain) != -1) {
                // Go to login page
                let authConfig = this.localStorage.get('authConfig');
                this.localStorage.remove('auth');
                // this.router.navigateByUrl(authConfig.loginUrl);
                location.href = document.baseURI.slice(0, -1) + authConfig.loginUrl;
            }
            let message = evt.error.responseStatus ? evt.error.responseStatus.message : evt.error;
            return observableThrowError(message);

        }
        return of(evt);
    }
}
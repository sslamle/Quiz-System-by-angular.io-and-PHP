import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router'
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { LocalStorageModule } from '../../shared/localstorage/localstorage.module';
import { LocalStorageService } from '../../shared/localstorage/localstorage.service';
import { AuthService, IAuthConfig } from './auth.service';
import { CanActivateViaAuthGuard } from './auth.guard';
import { AuthHeaderHttpInterceptor } from './auth-header-http.interceptor';
import { AUTH_CONFIG } from './auth.service';

@NgModule({
    imports: [
        RouterModule,
        LocalStorageModule,
        HttpClientModule
    ],
    declarations: []
})
export class AuthModule {
    static forRoot(config: IAuthConfig): ModuleWithProviders {
        return {
            ngModule: AuthModule,
            providers: [
                {
                    provide: AuthService,
                    useFactory: (
                        localStorage: LocalStorageService,
                        http: HttpClient,
                        config: any
                    ) => {
                        let service = new AuthService(localStorage,  http, config);
                        return service;
                    },
                    deps: [LocalStorageService, HttpClient, AUTH_CONFIG]
                },
                {
                    provide: CanActivateViaAuthGuard,
                    useFactory: (
                        authService: AuthService
                    ) => {
                        return new CanActivateViaAuthGuard(authService);
                    },
                    deps: [AuthService]
                },
                {
                    // Add auth header to all HttpClient
                    provide: HTTP_INTERCEPTORS,
                    useClass:AuthHeaderHttpInterceptor,
                    deps: [LocalStorageService],
                    multi: true
                },
                {
                    provide: AUTH_CONFIG,
                    useValue: config
                }
            ]
        }
    }
}

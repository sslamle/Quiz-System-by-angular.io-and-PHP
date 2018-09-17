import { NgModule } from '@angular/core';
import { SSCommonModule } from '../../common.module';
import { AuthModule } from '../../shared/auth/auth.module';

import { LoginComponent } from './login.component';

@NgModule({
    imports: [
        SSCommonModule,
        AuthModule
    ],
    exports: [],
    declarations: [LoginComponent],
    providers: [],
})
export class LoginModule { }

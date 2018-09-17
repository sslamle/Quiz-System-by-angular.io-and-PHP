import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

// Framework modules
import { LocalStorageModule } from 'framework/shared/localstorage/localstorage.module';
import { AuthModule } from 'framework/shared/auth/auth.module';
import { ToastrModule } from 'ngx-toastr';

// App components
import { AppComponent } from './app.component';

// App modules
import { StaffModule } from './staff/staff.module';
import { LoginModule } from 'framework/components/login//login.module';
import { AdminModule } from './admin/admin.module';

import { routing } from './app.routing';


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    LoadingBarHttpClientModule,

    // Framework module
    LocalStorageModule.forRoot({prefix: 'kienthuc'}),
    AuthModule.forRoot({
      loginUrl: '/login',
      successRedirectUrl: '/admin/exams/list'
    }),
    ToastrModule.forRoot(),

    // app modules
    StaffModule,
    LoginModule,
    AdminModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
}

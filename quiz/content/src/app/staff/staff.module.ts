import { NgModule } from '@angular/core';
import { SSCommonModule } from 'framework/common.module';
import { StaffComponent } from './staff.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';

@NgModule({
    imports: [
        SSCommonModule
    ],
    exports: [],
    declarations: [
        StaffComponent,
        HomeComponent,
        TestComponent
    ],
    providers: [],
})
export class StaffModule { }

import { NgModule } from '@angular/core';
import { SSCommonModule } from 'framework/common.module';
import { LayoutModule } from 'framework/layout/layout.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryListComponent } from './category/category-list.component';
import { UserComponent } from './user/user.component';
import { UserFormDialogComponent } from './user/user-form.dialog';
import { QuestionListComponent } from './question/question-list.component';
import { QuestionAddComponent } from './question/question-add.component';
import { CategoryService } from './shared/category.service';
import { QuestionService } from './shared/question.service';
import { CategoryFormDialogComponent } from './category/category-form.dialog';
import { StaffService } from './shared/staff.service';
import { StaffListComponent } from './staff/staff-list.component';
import { StaffFormDialogComponent } from './staff/staff-form.dialog';
import { ExamListComponent } from './exam/exam-list.component';
import { ExamFormDialogComponent } from './exam/exam-form.dialog';
import { ExamService } from './shared/exam.service';
import { ExamDetailComponent } from './exam/exam-detail.component';
import { TestDetailDialogComponent } from './test/test-detail.dialog';
import { TestService } from './shared/test.service';
import { StaffAddComponent } from './staff/staff-add.component';
import { StaffDetailComponent } from './staff/staff-detail.component';
import { UnitService } from './shared/unit.service';
import { UnitListComponent } from './unit/unit-list.component';
import { UnitFormDialogComponent } from './unit/unit-form.dialog';
import { SSUserComponent } from 'framework/components/user/user.component';

@NgModule({
    imports: [
        SSCommonModule,
        LayoutModule
    ],
    exports: [],
    declarations: [
        AdminComponent,
        DashboardComponent,
        CategoryListComponent,
        CategoryFormDialogComponent,
        UserComponent,
        UserFormDialogComponent,
        QuestionListComponent,
        QuestionAddComponent,
        StaffListComponent,
        StaffAddComponent,
        StaffFormDialogComponent,
        StaffDetailComponent,
        ExamListComponent,
        ExamFormDialogComponent,
        ExamDetailComponent,
        TestDetailDialogComponent,
        UnitListComponent,
        UnitFormDialogComponent,
        SSUserComponent
    ],
    entryComponents: [
        UserFormDialogComponent,
        CategoryFormDialogComponent,
        StaffFormDialogComponent,
        ExamFormDialogComponent,
        TestDetailDialogComponent,
        UnitFormDialogComponent
    ],
    providers: [
        CategoryService,
        QuestionService,
        StaffService,
        ExamService,
        TestService,
        UnitService
    ],
})
export class AdminModule { }


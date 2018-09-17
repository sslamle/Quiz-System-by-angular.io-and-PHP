import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAuthGuard } from 'framework/shared/auth/auth.guard';

import { StaffComponent } from './staff/staff.component';
import { LoginComponent } from 'framework/components/login/login.component';
import { TestComponent } from './staff/test/test.component';

import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './staff/home/home.component';
import { CategoryListComponent } from './admin/category/category-list.component';
import { UserComponent } from './admin/user/user.component';
import { QuestionListComponent } from './admin/question/question-list.component';
import { QuestionAddComponent } from './admin/question/question-add.component';
import { StaffListComponent } from './admin/staff/staff-list.component';
import { ExamListComponent } from './admin/exam/exam-list.component';
import { ExamDetailComponent } from './admin/exam/exam-detail.component';
import { StaffAddComponent } from './admin/staff/staff-add.component';
import { StaffDetailComponent } from './admin/staff/staff-detail.component';
import { UnitListComponent } from './admin/unit/unit-list.component';
import { SSUserComponent } from 'framework/components/user/user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/staff/home',
    pathMatch: 'full',
    // canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: 'staff',
    component: StaffComponent,
    children: [
      {
        path: '',
        redirectTo: '/staff/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'test',
        component: TestComponent
      }
    ]
  },

  // Admin area
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [CanActivateViaAuthGuard],
    canActivateChild: [CanActivateViaAuthGuard],

    children: [
      {
        path: 'profile',
        component: SSUserComponent
      },
      {
        path: '',
        redirectTo: '/admin/exams/list',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'categories',
        component: CategoryListComponent
      },
      {
        path: 'units',
        component: UnitListComponent
      },
      {
        path: 'users',
        component: UserComponent
      },
      {
        path: 'staffs',
        children: [
          {
            path: '',
            redirectTo: '/admin/staffs/list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            component: StaffListComponent
          },
          {
            path: 'add',
            component: StaffAddComponent
          },
          {
            path: 'detail/:id',
            component: StaffDetailComponent
          }
        ]
      },
      {
        path: 'exams',
        children: [
          {
            path: '',
            redirectTo: '/admin/exams/list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            component: ExamListComponent
          },
          {
            path: 'detail/:id',
            component: ExamDetailComponent
          }
        ]
      },
      {
        path: 'questions',
        children: [
          {
            path: '',
            redirectTo: '/admin/questions/list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            component: QuestionListComponent
          },
          {
            path: 'add',
            component: QuestionAddComponent
          }
        ]
      }
    ]
  },

  // Login screen
  {
    path: 'login',
    component: LoginComponent
  },

  // Other path
  {
    path: '**',
    redirectTo: '/staff/home'
  },

];
export const routing = RouterModule.forRoot(routes);

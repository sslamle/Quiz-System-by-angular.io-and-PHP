import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { SidebarService } from './sidebar/sidebar.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
    ],
    exports: [
        SidebarComponent,
        HeaderComponent
    ],
    declarations: [
        SidebarComponent,
        HeaderComponent
    ],
    providers: [
        SidebarService
    ],
})
export class LayoutModule { }

export * from './sidebar/sidebar.component';
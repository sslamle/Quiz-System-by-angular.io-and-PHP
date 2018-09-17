import { Component, OnInit, Input } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
    selector: 'ss-sidebar',
    templateUrl: 'sidebar.component.html'
})

export class SidebarComponent implements OnInit {
    @Input() menuItems: IMenuItem[];
    
    year = new Date().getFullYear();

    constructor(
        private sidebarService: SidebarService,
        public authService: AuthService
    ) { }

    ngOnInit() { }

    toggleSidebar() {
        this.sidebarService.toggleSidebar();
    }

    toggleShowSubMenu(item) {
        item.isShowSubMenu = !item.isShowSubMenu;
    }
}

export interface IMenuItem {
    router: string,
    text: string,
    icon?: any,
    isHide?: boolean,
    children?: IMenuItem[],
    isShowSubMenu?: boolean,
    isExternalUrl?: boolean,
    permissions?: string
}
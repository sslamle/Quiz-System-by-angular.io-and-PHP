import { Component, OnInit, Input } from '@angular/core';
import { faBars} from '@fortawesome/fontawesome-free-solid';
import { AuthService } from '../../shared/auth/auth.service';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
    selector: 'ss-header',
    templateUrl: 'header.component.html'
})

export class HeaderComponent implements OnInit {
    @Input() authData:any = {};
    @Input() title = '';

    faBars = faBars;

    constructor(
        private authService: AuthService,
        private sidebarService: SidebarService
    ) { }

    ngOnInit() { }

    logout() {
        this.authService.logout();
    }

    toggleSidebar() {
        this.sidebarService.toggleSidebar();
    }
}


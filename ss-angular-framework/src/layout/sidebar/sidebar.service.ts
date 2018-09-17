import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

    constructor() { }

    toggleSidebar() {
        document.getElementsByTagName('body')[0].classList.toggle('show-sidebar');
    }
}
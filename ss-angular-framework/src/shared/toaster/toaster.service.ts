import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class SSToasterService {

    constructor(private toaster: ToastrService) {}

    success(title?: string, body?: string) {
        return this.toaster.success(title, body);
    }

    info(title?: string, body?: string) {
        return this.toaster.info(title, body);
    }

    error(title?: string, body?: string) {
        return this.toaster.error(title, body);
    }

    warning(title?: string, body?: string) {
        return this.toaster.warning(title, body);
    }

    pop(type: string, title?: string, body?: string) {
        return this.toaster[type](title, body);
    }
}
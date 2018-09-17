import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StaffService {
    baseUrl = 'api/admin/staffs';

    constructor(
        private http: HttpClient
    ) { }

    get(id) {
        return this.http.get<any>(this.baseUrl + '/' + id);
    }

    getList() {
        return this.http.get<any>(this.baseUrl);
    }

    saveOrCreate(item) {
        let url = this.baseUrl;
        if (item.id) {
            url += '/' + item.id;
        }
        return this.http.post<any>(url, item);
    }

    remove(item) {
        return this.http.delete<any>(this.baseUrl + '/' + item.id);
    }

    saveArray(arr) {
        return this.http.post<any>(this.baseUrl + '/addArray', arr);
    }

    getTests(id) {
        return this.http.get<any>(this.baseUrl + '/' + id + '/tests');
    }
}

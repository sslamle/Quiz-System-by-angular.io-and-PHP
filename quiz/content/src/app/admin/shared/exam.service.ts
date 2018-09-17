import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ExamService {
    baseUrl = 'api/admin/exams';

    constructor(
        private http: HttpClient
    ) { }

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

    get(id) {
        return this.http.get<any>(this.baseUrl + '/' + id);
    }

    getTests(id) {
        return this.http.get<any>(this.baseUrl + '/' + id + '/tests');
    }
}

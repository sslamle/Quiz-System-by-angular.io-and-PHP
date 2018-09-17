import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TestService {

    constructor(
        private http: HttpClient
    ) { }

    getDetailWithQuestions(id) {
        return this.http.get<any>(`api/admin/tests/${id}/detailWithQuestions`);
    }
}

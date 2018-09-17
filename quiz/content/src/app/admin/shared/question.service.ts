import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class QuestionService {

    constructor(
        private http: HttpClient
    ) { }

    saveOrCreate(question) {
        let url = 'api/admin/questions';
        if (question.id) {
            url += '/' + question.id;
        }
        return this.http.post<any>(url, question);
    }

    remove(question) {
        return this.http.delete<any>('api/admin/questions/' + question.id);
    }

    getByCategory(categoryId) {
        return this.http.get<any>(`api/admin/categories/${categoryId}/questions`);
    }
}

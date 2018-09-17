import { Component, OnInit } from '@angular/core';
import {
    // faEdit,
    // faTrash,
    faPlus,
    faSave,
    faTrashAlt,
    // faKey
} from '@fortawesome/fontawesome-free-solid';
import { CategoryService } from '../shared/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SaySuaDialog } from 'framework/shared/dialog/dialog.service' ;
// import { HttpClient } from '@angular/common/http';
import { QuestionService } from '../shared/question.service';

@Component({
    selector: 'my-question-add',
    templateUrl: 'question-add.component.html'
})

export class QuestionAddComponent implements OnInit {
    faPlus = faPlus;
    faSave = faSave;
    faTrashAlt = faTrashAlt;

    selectedCategoryId: number;
    categories: any[];
    questions: IQuestionContent[] = [];
    isRequesting = false;

    constructor(
        private categoryService: CategoryService,
        private questionService: QuestionService,
        private activatedRoute: ActivatedRoute,
        private ssDialog: SaySuaDialog,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.addQuestion();
        this.getCategories();

        this.activatedRoute.queryParams.subscribe ( params => {
            this.selectedCategoryId = Number(params.category);
        });
    }

    addQuestion(index?) {
        if (index === undefined || index === this.questions.length - 1) {
            this.questions.push({
                category_id: 0,
                content: '',
                anwser1: '',
                is_anwser1_right: false,
                anwser2: '',
                is_anwser2_right: false
            });
        }
    }

    remove(question) {
        if (this.questions.length > 1) {
            this.questions.splice(this.questions.indexOf(question), 1);
        }
    }

    getCategories () {
        this.categoryService.getList()
        .subscribe ( data => {
            this.categories = data;
        });
    }

    save() {
        if (!this.selectedCategoryId) {
            this.ssDialog.openConfirm({
                title: 'Cảnh báo',
                content: 'Bạn chưa chọn chuyên ngành cho câu hỏi'
            });
            return;
        }
        let hasInValid = false;

        this.questions.forEach( question => {
            question.category_id = this.selectedCategoryId;

            // Check valid
            question.content = question.content.trim();

            question.isInvalid = false;
            if (!question.content || !(question.is_anwser1_right || question.is_anwser2_right || question.is_anwser3_right || question.is_anwser4_right)) {
                question.isInvalid = true;
                hasInValid = true;
            }
        });
        if (hasInValid) {
            this.ssDialog.openConfirm({
                title: 'Cảnh báo',
                content: 'Có một hoặc vài câu hỏi chưa chính xác, vui lòng kiểm tra lại.'
            });
            return;
        }

        // save data
        this.isRequesting = true;
        let requestCount = 0;
        let requestFinishCount = 0;
        let hasRequestError = false;

        this.questions.forEach (question => {
            requestCount ++;
            this.questionService.saveOrCreate(question)
            .subscribe(
                newQuestion => {
                    question.id = newQuestion.id;
                    requestFinishCount ++;
                    this.requestFinish(requestCount, requestFinishCount, hasRequestError);
                },
                err => {
                    console.log(err);
                    question.isInvalid = true;
                    hasRequestError = true;
                    requestFinishCount ++;
                    this.requestFinish(requestCount, requestFinishCount, hasRequestError);
                }
            )
        });
    }

    private requestFinish(requestCount, requestFinishCount, hasRequestError) {
        if (requestCount === requestFinishCount) {
            this.isRequesting = false;
            if (hasRequestError) {
                this.ssDialog.openConfirm({
                    title: 'Có lỗi trong quá trình lưu câu hỏi',
                    content: 'Vui lòng kiểm tra lại các câu hỏi sai.'
                });
            } else {
                this.ssDialog.openConfirm({
                    title: 'Lưu câu hỏi thành công',
                    content: 'Đã lưu câu hỏi thành công, bạn có muốn thêm câu hỏi không?',
                    okText: 'Có',
                    cancelText: 'Không'
                }).subscribe( result => {
                    if (result) {
                        // Clear data
                        this.questions = [];
                        this.addQuestion();
                    } else {
                        // Go to question page
                        this.router.navigate(['/admin/questions/list'], { queryParams: { category: this.selectedCategoryId }});
                    }
                })
            }
        }
    }
}

interface IQuestionContent {
    id?: number,
    category_id: number,
    content: string,
    anwser1: string,
    is_anwser1_right: boolean,
    anwser2: string,
    is_anwser2_right: boolean,
    anwser3?: string,
    is_anwser3_right?: boolean,
    anwser4?: string,
    is_anwser4_right?: boolean,

    // Client custom fields
    isInvalid?: boolean
}

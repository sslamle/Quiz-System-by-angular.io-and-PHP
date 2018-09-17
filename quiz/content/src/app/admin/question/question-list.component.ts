import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import {
    // faEdit,
    faTrashAlt,
    faPlus,
    faEdit,
    faTimes,
    faSave,
    // faKey
} from '@fortawesome/fontawesome-free-solid';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../shared/category.service';
import { MatPaginator } from '@angular/material';
import { QuestionService } from '../shared/question.service';
import { SaySuaDialog } from 'framework/shared/dialog/dialog.service' ;
import { UtilsService } from 'framework/shared/utils/utils.service';
import { TableDataSource } from 'framework/components/table-material/table-data-source';

@Component({
    selector: 'my-question-list',
    templateUrl: 'question-list.component.html'
})

export class QuestionListComponent implements OnInit, AfterViewInit, OnDestroy {

    faPlus = faPlus;
    faTrashAlt = faTrashAlt;
    faEdit = faEdit;
    faTimes = faTimes;
    faSave = faSave;

    selectedCategoryId: number;
    categories: any[];
    questions: any[] = [];

    pageIndex = 0;
    pageSize = 10;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    tableData: TableDataSource<any>;

    private searchTimer;

    constructor(
        private route: Router,
        private categoryService: CategoryService,
        private questionService: QuestionService,
        private activatedRoute: ActivatedRoute,
        private ssDialog: SaySuaDialog,
        private utils: UtilsService
    ) {
        this.tableData = new TableDataSource({
            data: [],
            columnsDefine: []
        });
    }

    ngOnInit () {
        this.activatedRoute.queryParams.subscribe ( params => {
            this.selectedCategoryId = Number(params.category);
            this.getCategories();
        });
    }

    ngAfterViewInit() {
        this.tableData.paginator = this.paginator;
    }

    getCategories () {
        this.categoryService.getList()
        .subscribe ( data => {
            data.forEach(item => {
                this.convertItem(item);
            });
            data.sort((a, b) => {
                return a.vnAlias < b.vnAlias ? -1 : 1;
            });
            this.categories = data;

            if (!this.selectedCategoryId) {
                this.selectedCategoryId = data[0].id;
            }
            this.getQuestions(this.selectedCategoryId);
        });
    }

    getQuestions (categoryId) {
        this.questionService.getByCategory(categoryId)
        .subscribe( data => {
            this.questions = data;
            this.tableData.data = data;
        });
    }

    goToQuestionAddScreen() {
        this.route.navigate(['/admin/questions/add'], { queryParams: {category: this.selectedCategoryId} });
    }

    editQuestion(question) {
        let origin = Object.assign({}, question);
        question.isEditing = true;
        question.origin = origin;
    }

    cancelEditQuestion(question) {
        Object.assign(question, question.origin);
        question.isEditing = false;
    }

    saveQuestion(question) {
        this.questionService.saveOrCreate(question)
        .subscribe(
            data => {
                Object.assign(question, data);
                delete question.origin;
                question.isEditing = false;
            },
            err => {
                console.log(err);
            }
        )
    }

    // onPageEvent(event) {
    //     this.getItemsForPage(event);
    // }

    // getItemsForPage(pageEvent) {
    //     let startIndex = pageEvent.pageIndex * pageEvent.pageSize;
    //     this.displayedQuestions = this.questions.slice(startIndex, startIndex + pageEvent.pageSize);
    // }

    removeQuestion(question) {
        this.ssDialog.openConfirm({
            title: 'Xóa câu hỏi',
            content: 'Bạn có chắc muốn xóa câu hỏi này?',
            okText: 'Đúng',
            cancelText: 'Không'
        }).subscribe(result => {
            if (result) {
                this.questionService.remove(question)
                .subscribe( () => {
                    this.questions.splice(this.questions.indexOf(question), 1);
                    this.tableData.update(this.questions);
                });
            }
        });
    }

    onSearchTextChange(text: string) {
        clearTimeout(this.searchTimer);
        this.searchTimer = setInterval(() => {
            this.tableData.filter = text;
        }, 300);
    }

    private convertItem(item) {
        item.vnAlias = this.utils.changeVN(item.name);
    }

    ngOnDestroy(): void {
        clearTimeout(this.searchTimer);
    }
}

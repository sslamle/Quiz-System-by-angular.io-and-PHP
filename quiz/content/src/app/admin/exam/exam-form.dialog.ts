
import { ExamService } from '../shared/exam.service';
import { CategoryService } from '../shared/category.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'my-exam-form',
    templateUrl: 'exam-form.dialog.html'
})
export class ExamFormDialogComponent implements OnInit {
    title = 'Tạo đợt thi mới';
    exam: any = {};
    isRequesting = false;
    error: any = {};
    generalCategories = []; // Danh sach cac chuyên mục chung

    constructor(
        public dialogRef: MatDialogRef<ExamFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private examService: ExamService,
        private categoryService: CategoryService
    ) {}

    ngOnInit(): void {
        if (this.data.exam.id) {
            this.title = 'Chỉnh sửa đợt thi';
        } else {
            this.data.exam.is_active = true;
            this.data.exam.general_categories = [];
        }
        this.exam = Object.assign({}, this.data.exam);

        this.categoryService.getList()
        .subscribe(
            data => {
                data.forEach(cat => {
                    if (cat.is_general) {
                        let existCat = this.exam.general_categories.find(c => c.cat === cat.id);
                        if (existCat) {
                            cat.number_of_question = existCat.noq;
                        }
                        this.generalCategories.push(cat);
                    }
                })
            }
        )
    }

    save() {
        this.error = {};
        if (this.isRequesting) {
            return;
        }

        this.isRequesting = true;

        // Lấy thông tin chuyên mục chung
        let generalCats = [];
        this.generalCategories.forEach((cat) => {
            if (cat.number_of_question) {
                generalCats.push({cat: cat.id, noq: cat.number_of_question});
            }
        });
        this.exam.general_categories = generalCats;

        this.examService.saveOrCreate(this.exam)
        .subscribe(
            data => {
                this.close(data);
            },
            err => { this.error = err; this.isRequesting = false; },
            () => { this.isRequesting = false; }
        );
    }

    close(data?) {
        this.dialogRef.close(data);
    }
}

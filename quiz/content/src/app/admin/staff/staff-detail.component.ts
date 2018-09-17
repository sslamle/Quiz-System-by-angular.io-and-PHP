import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from '../shared/exam.service';
import { StaffService } from '../shared/staff.service';
import { TableDataSource }  from 'framework/components/table-material/table-data-source';
import { forkJoin } from 'rxjs';
import { CategoryService } from '../shared/category.service';
import { SaySuaDialog } from 'framework/shared/dialog/dialog.service';
import { TestDetailDialogComponent } from '../test/test-detail.dialog';

@Component({
    selector: 'my-staff-detail',
    templateUrl: 'staff-detail.component.html'
})

export class StaffDetailComponent implements OnInit {

    @ViewChild('testResultTemplate') testResultTemplate:  TemplateRef<any>;

    staff: any = {};
    tableData: TableDataSource<any>;

    constructor(
        private examService: ExamService,
        private staffService: StaffService,
        private categoryService: CategoryService,
        private activatedRoute: ActivatedRoute,
        private ssDialog: SaySuaDialog
    ) { }

    ngOnInit() {
        this.tableData = new TableDataSource({
            data: [],
            columnsDefine: [
                {field: 'name', label: 'Đợt thi'},
                {field: 'did_at', label: 'Ngày thi'},
                {field: 'category', label: 'Chuyên ngành'},
                {field: 'is_pass_for_order', label: 'Kết quả', template: this.testResultTemplate}
            ]
        });

        // Get data
        this.activatedRoute.params.subscribe(params => {
            let id = params.id;
            forkJoin(
                this.examService.getList(),
                this.staffService.getTests(id),
                this.staffService.get(params.id),
                this.categoryService.getList()
            ).subscribe( data => {
                this.staff = data[2];
                let tests = data[1];
                let exams = data[0];
                let categories = data[3];
                let examIndex = {};
                let categoryIndex = {};
                exams.forEach(exam => {
                    examIndex[exam.id] = exam;
                    exam.is_pass_for_order = -1; // Use for sorting
                });
                categories.forEach(cat => {
                    categoryIndex[cat.id] = cat;
                });

                // Update result for staff
                tests.forEach(test => {
                    let exam = examIndex[test.exam_id];
                    if (exam) {
                        exam.is_pass = test.is_pass;
                        exam.is_pass_for_order = test.score;
                        exam.score = test.score;
                        exam.did_at = test.created_at;
                        exam.anwsers = test.anwsers;
                        exam.test_id = test.id;

                        let category = categoryIndex[test.category_id];
                        if (category) {
                            exam.category = category.name;
                        }
                    }
                });

                // Sort staff by result, show has result first
                exams.sort((a, b) => { return b.id - a.id; });

                this.tableData.update(exams);

            });
        });
    }

    viewTest(exam) {
        this.ssDialog.open(TestDetailDialogComponent, {
            // width: '500px',
            data: {
                staffName: this.staff.name,
                testId: exam.test_id,
                category: exam.category,
                exam: exam.name,
                scoreToPass: exam.score_to_pass,
                numberOfQuestion: exam.number_of_questions
            }
        });
    }
}

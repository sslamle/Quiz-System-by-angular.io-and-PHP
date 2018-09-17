import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from '../shared/exam.service';
import { StaffService } from '../shared/staff.service';
import { TableDataSource }  from 'framework/components/table-material/table-data-source';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { CategoryService } from '../shared/category.service';
import { SaySuaDialog } from 'framework/shared/dialog/dialog.service';
import { TestDetailDialogComponent } from '../test/test-detail.dialog';

@Component({
    selector: 'my-exam-detail',
    templateUrl: 'exam-detail.component.html'
})

export class ExamDetailComponent implements OnInit {

    @ViewChild('testResultTemplate') testResultTemplate:  TemplateRef<any>;

    exam: any = {};
    tableData: TableDataSource<any>;
    resultCount = {
        pass: 0,
        notPass: 0,
        dontHaveTest: 0
    };

    private searchTimer;

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
                {field: 'code', label: 'Mã NV'},
                {field: 'name', label: 'Tên'},
                {field: 'did_at', label: 'Ngày thi'},
                {field: 'category', label: 'Chuyên ngành'},
                {field: 'is_pass_for_order', label: 'Kết quả', template: this.testResultTemplate}
            ]
        });

        // Get data
        this.activatedRoute.params.subscribe(params => {
            let id = params.id;
            forkJoin(
                this.examService.get(params.id),
                this.examService.getTests(id),
                this.staffService.getList(),
                this.categoryService.getList()
            ).subscribe( data => {
                this.exam = data[0];
                let tests = data[1];
                let staffs = data[2];
                let categories = data[3];
                let staffIndex = {};
                let categoryIndex = {};
                staffs.forEach(staff => {
                    staffIndex[staff.id] = staff;
                    staff.is_pass_for_order = -1; // Use for sorting
                });
                categories.forEach(cat => {
                    categoryIndex[cat.id] = cat;
                });

                this.resultCount.dontHaveTest = staffs.length - tests.length;
                // Update result for staff
                tests.forEach(test => {
                    let staff = staffIndex[test.staff_id];
                    if (staff) {
                        staff.is_pass = test.is_pass;
                        staff.is_pass_for_order = test.score;
                        staff.score = test.score;
                        staff.did_at = test.created_at;
                        staff.anwsers = test.anwsers;
                        staff.test_id = test.id;
                        if (staff.score === undefined) {
                            this.resultCount.dontHaveTest ++;
                        } else {
                            if (staff.is_pass) {
                                this.resultCount.pass ++;
                            } else {
                                this.resultCount.notPass ++;
                            }
                        }

                        let category = categoryIndex[test.category_id];
                        if (category) {
                            staff.category = category.name;
                        }
                    }
                });

                // Sort staff by result, show has result first
                staffs.sort((a, b) => { return b.is_pass_for_order - a.is_pass_for_order; });

                this.tableData.update(staffs);

            });
        });
    }

    viewTest(staff) {
        this.ssDialog.open(TestDetailDialogComponent, {
            // width: '500px',
            data: {
                staffName: staff.name,
                testId: staff.test_id,
                category: staff.category,
                exam: this.exam.name,
                scoreToPass: this.exam.score_to_pass,
                numberOfQuestion: this.exam.number_of_questions
            }
        });
    }

    onSearchTextChange(text: string) {
        clearTimeout(this.searchTimer);
        this.searchTimer = setInterval(() => {
            this.tableData.filter = text;
        }, 300);
    }
}

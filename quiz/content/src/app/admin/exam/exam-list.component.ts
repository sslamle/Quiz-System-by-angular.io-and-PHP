import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TableDataSource }  from 'framework/components/table-material/table-data-source';
import { ExamService } from '../shared/exam.service';
import { faEdit, faTrash, faPlus, faEye } from '@fortawesome/fontawesome-free-solid';
import { SaySuaDialog } from 'framework/shared/dialog/dialog.service';
import { ExamFormDialogComponent } from './exam-form.dialog';
import { Router } from '@angular/router';
import { SSToasterService } from 'framework/shared/toaster/toaster.service';

@Component({
    selector: 'my-exam-list',
    templateUrl: 'exam-list.component.html'
})

export class ExamListComponent implements OnInit {
    @ViewChild('examActionTemplate') examActionTemplate:  TemplateRef<any>;
    @ViewChild('examCreatedTemplate') examCreatedTemplate: TemplateRef<any>;
    @ViewChild('examActiveTemplate') examActiveTemplate: TemplateRef<any>;

    faEdit = faEdit;
    faTrash = faTrash;
    faPlus = faPlus;
    faEye = faEye;

    tableData: TableDataSource<any>;

    constructor(
        private examService: ExamService,
        private ssDialog: SaySuaDialog,
        private router: Router,
        private toaster: SSToasterService
    ) { }

    ngOnInit() {
        this.tableData = new TableDataSource({
            data: [],
            columnsDefine: [
                {field: 'created_at', label: 'Ngày tạo', template: this.examCreatedTemplate},
                {field: 'name', label: 'Tên'},
                {field: 'number_of_questions', label: 'Số câu hỏi', isCenter: true},
                {field: 'score_to_pass', label: 'Số điểm để đậu', isCenter: true},
                {field: 'time_in_minute', label: 'Thời gian (phút)', isCenter: true},
                {field: 'is_active', label: 'Tình trạng', template: this.examActiveTemplate},
                {field: 'action', label: 'Thao tác', template: this.examActionTemplate}
            ]
        });

        this.getExamList();
    }

    getExamList() {
        this.examService.getList()
        .subscribe( data => {
            this.tableData.update(data);
        });
    }

    openExamForm(item?) {
        if (!item) {
            item = {};
        }

        this.ssDialog.open(ExamFormDialogComponent,  {
            width: '500px',
            data: {exam: item}
        }).subscribe( newItem => {
            if (!newItem) {
                return;
            }

            if (item.id) {
                Object.assign(item, newItem);
            } else {
                this.tableData.data.push(newItem);
                this.tableData.update();
                this.toaster.info('Thêm đợt thi', 'Đã thêm đợt thi thành công');
            }
        });
    }

    openExamDetail(item) {
        this.router.navigateByUrl('/admin/exams/detail/' + item.id);
    }

    deleteItem(item) {
        this.ssDialog.openConfirm({
            title: `Xóa đợt thi`,
            content: ` Bạn có muốn xóa đợt thi [${item.name}] không?`
        }).subscribe( result => {
            if (result) {
                this.examService.remove(item)
                .subscribe( () => {
                    this.tableData.data.splice(this.tableData.data.indexOf(item), 1);
                    this.tableData.update();
                });
            }
        });
    }

}

import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TableDataSource }  from 'framework/components/table-material/table-data-source';
import { CategoryService } from '../shared/category.service';
import { faEdit, faTrash, faPlus, faKey, faGlobe, faEye } from '@fortawesome/fontawesome-free-solid';
import { SaySuaDialog } from 'framework/shared/dialog/dialog.service';
import { CategoryFormDialogComponent } from './category-form.dialog';
import { UtilsService } from 'framework/shared/utils/utils.service';
import { SSToasterService } from 'framework/shared/toaster/toaster.service';

@Component({
    selector: 'my-category-list',
    templateUrl: 'category-list.component.html'
})

export class CategoryListComponent implements OnInit {
    @ViewChild('categoryActionTemplate') categoryActionTemplate:  TemplateRef<any>;
    @ViewChild('categoryNameTemplate') categoryNameTemplate:  TemplateRef<any>;

    faEdit = faEdit;
    faTrash = faTrash;
    faPlus = faPlus;
    faKey = faKey;
    faGlobe = faGlobe;
    faEye = faEye;

    tableData: TableDataSource<any>;

    constructor(
        private categoryService: CategoryService,
        private ssDialog: SaySuaDialog,
        private utils: UtilsService,
        private toaster: SSToasterService
    ) { }

    ngOnInit() {
        this.tableData = new TableDataSource({
            data: [],
            columnsDefine: [
                // {field: 'id', label: 'ID'},
                {field: 'name', label: 'Tên', template: this.categoryNameTemplate},
                {field: 'questions_count', label: 'Số câu hỏi'},
                {field: 'action', label: 'Thao tác', template: this.categoryActionTemplate}
            ]
        });

        this.getCategoryList();
    }

    getCategoryList() {
        this.categoryService.getList()
        .subscribe( data => {
            data.forEach(item => {
                this.convertItem(item);
            });
            data.sort((a, b) => {
                return a.vnAlias < b.vnAlias ? -1 : 1;
            });
            this.tableData.update(data);
        });
    }

    openCategoryForm(item?) {
        if (!item) {
            item = {};
        }

        this.ssDialog.open(CategoryFormDialogComponent,  {
            width: '500px',
            data: {category: item}
        }).subscribe( newItem => {
            if (!newItem) {
                return;
            }
            this.convertItem(newItem);
            if (item.id) {
                Object.assign(item, newItem);
            } else {
                this.tableData.data.push(newItem);
                this.tableData.update();
                this.toaster.info('Thêm chuyên ngành', 'Đã thêm chuyên ngành thành công');
            }
        });
    }

    deleteItem(item) {
        this.ssDialog.openConfirm({
            title: `Xóa chuyên ngành`,
            content: `Bạn có muốn xóa chuyên ngành [${item.name}] không?`
        }).subscribe( result => {
            if (result) {
                this.categoryService.remove(item)
                .subscribe( () => {
                    this.tableData.data.splice(this.tableData.data.indexOf(item), 1);
                    this.tableData.update();
                });
            }
        });
    }

    private convertItem(item) {
        item.vnAlias = this.utils.changeVN(item.name);
    }
}

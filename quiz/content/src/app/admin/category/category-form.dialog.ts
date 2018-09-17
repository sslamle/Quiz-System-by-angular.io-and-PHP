
import { CategoryService } from '../shared/category.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'my-category-form',
    templateUrl: 'category-form.dialog.html'
})
export class CategoryFormDialogComponent implements OnInit {
    title = 'Thêm chuyên ngành';
    category: any = {};
    isRequesting = false;

    constructor(
        public dialogRef: MatDialogRef<CategoryFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private categoryService: CategoryService
    ) {}

    ngOnInit(): void {
        if (this.data.category.id) {
            this.title = 'Sửa chuyên ngành';
        }
        this.category = Object.assign({}, this.data.category);
    }

    save() {
        if (this.isRequesting) {
            return;
        }

        this.isRequesting = true;
        this.categoryService.saveOrCreate(this.category)
        .subscribe(
            data => {
                this.close(data);
            },
            err => { console.log(err); },
            () => { this.isRequesting = false; }
        );
    }

    close(data?) {
        this.dialogRef.close(data);
    }
}

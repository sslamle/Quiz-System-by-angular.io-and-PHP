import { Component, OnInit } from '@angular/core';
import { faCog } from '@fortawesome/fontawesome-free-solid';
import { HttpClient } from '@angular/common/http';
import { SaySuaDialog } from 'framework/shared/dialog/dialog.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'framework/shared/localstorage/localstorage.service'
import { UtilsService } from 'framework/shared/utils/utils.service';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  faCog = faCog;

  exams: any = [];
  selectedExam;
  categories: any = [];
  selectedCategory;
  staffCode;
  staff: any = {};

  constructor(
    private http: HttpClient,
    private ssDialog: SaySuaDialog,
    private router: Router,
    private localStorage: LocalStorageService,
    private utils: UtilsService
  ) {
    // Do stuff
  }

  ngOnInit() {
    this.getExams();
    this.getCategories();
  };

  getExams() {
    this.http.get<any>('api/public/exams')
    .subscribe( data => {
      this.exams = data;
      this.selectedExam = this.exams[0];
    });
  }

  getCategories() {
    this.http.get<any>('api/public/categories')
    .subscribe( data => {
      data.forEach(item => {
          this.convertItem(item);
      });
      data.sort((a, b) => {
        return a.vnAlias < b.vnAlias ? -1 : 1;
      });
      this.categories = data;
      this.selectedCategory = this.categories[0];
    });
  }

  checkStaffCode() {
    this.staff = {};
    this.http.get<any>('api/public/staffs/' + this.staffCode)
    .subscribe( data => {
      this.staff = data;
      this.staff.isChecked = true;
    });
  }

  goToTest() {
    if (!this.selectedExam && !this.staff.id) {
      return;
    }
    this.ssDialog.openConfirm({
      title: 'Vào thi',
      content: `Vui lòng kiểm tra thông tin trước khi vào thi. Bạn tên là [${this.staff.name}] sẽ vào thi đợt [${this.selectedExam.name}] với chuyên ngành [${this.selectedCategory.name}]`,
      okText: 'Chính xác',
      cancelText: 'Không đúng'
    }).subscribe( result => {
      if (result) {
        // Save staff info
        this.localStorage.set('testInfo', {
          staff_id: this.staff.id,
          staffName: this.staff.name,
          staffCode: this.staff.code,
          exam_id: this.selectedExam.id,
          examName: this.selectedExam.name,
          category_id: this.selectedCategory.id,
          categoryName: this.selectedCategory.name
        });
        // Go to test screen
        this.router.navigateByUrl('/staff/test');
      }
    });
  }

  private convertItem(item) {
      item.vnAlias = this.utils.changeVN(item.name);
  }
}

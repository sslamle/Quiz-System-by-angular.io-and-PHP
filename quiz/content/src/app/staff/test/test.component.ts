import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from 'framework/shared/localstorage/localstorage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SaySuaDialog } from 'framework/shared/dialog/dialog.service';
import {
    faArrowCircleRight,
    faArrowCircleLeft,
    faFlag
} from '@fortawesome/fontawesome-free-solid';

@Component({
    selector: 'my-test',
    templateUrl: 'test.component.html'
})

export class TestComponent implements OnInit, OnDestroy {
    faArrowCircleRight = faArrowCircleRight;
    faArrowCircleLeft = faArrowCircleLeft;
    faFlag = faFlag;

    testInfo: ITestInfo;
    questions: any[] = [];
    anwsers: any[] = [];
    exam: any = {};
    test: any = {};

    timeUsed: number;
    timeUsedInMinute = '00:00';
    examTime: number;
    currentQuestion: any = {};
    isFinish = false;

    private timer1;

    constructor(
        private localStorage: LocalStorageService,
        private router: Router,
        private http: HttpClient,
        private ssDialog: SaySuaDialog
    ) { }

    ngOnInit() {
        // Get test info
        this.testInfo = this.localStorage.get('testInfo');
        if (!this.testInfo) {
            this.goToHome();
        }

        this.loadAnwsers();
        this.getQuestions();
    }

    ngOnDestroy(): void {
        clearInterval(this.timer1);
    }

    getQuestions() {
        let startRequestTime = new Date().getTime();
        this.http.post<any>('api/public/exams/questions', this.testInfo)
        .subscribe( data =>  {
            this.exam = data.exam;
            this.questions = data.questions;
            this.test = data.test;

            if (this.test.ended_at) {
                this.ssDialog.openConfirm({
                    title: 'Không thể làm lại bài thi',
                    content: 'Bạn đã hoàn thành bài thi này nên không thể làm lại.'
                }).subscribe(() => {
                    this.goToHome();
                });
                return;
            }

            if (!this.exam.is_active) {
               return this.goToHome();
            }

            // Calculate time left
            let endRequestTime = new Date().getTime();
            this.examTime = this.exam.time_in_minute * 60;
            this.timeUsed = Math.floor((new Date().getTime() - new Date(this.test.created_at).getTime() - (endRequestTime - startRequestTime)) / 1000);

            if (this.timeUsed < 5) {    // Allow 5 seconds difference
                this.timeUsed = 0;
            }

            if (this.timeUsed > this.examTime && this.timeUsed < this.examTime + 5) {
                this.timeUsed -= 5;
            }

            if (this.timeUsed >= this.examTime + 5) {
                // Notify end of time, show result and go to home
                this.ssDialog.openConfirm({
                    title: 'Bài thi đã kết thúc',
                    content: 'Bài thi của bạn đã kết thúc. Bạn không thể tiếp tục làm bài.'
                }).subscribe(() => {
                    this.goToHome();
                });
                return;
            }

            this.calcTimeUsedInMinute();
            this.selectQuestion(0);

            // Update anwsers array
            this.questions.forEach( (question, index) => {
                question.index = index;

                if (!this.anwsers[index] || this.anwsers[index].id !== question.id) {
                    this.anwsers[index] = {
                        id: question.id,
                        is_anwser1_right: false,
                        is_anwser2_right: false,
                        is_anwser3_right: false,
                        is_anwser4_right: false,
                    }
                }
            });
            this.saveAnwsers();
        },
        err => {
            this.ssDialog.openConfirm({
                title: 'Không thể làm bài',
                content: 'Xin lỗi bạn! Hiện tại bạn không thể làm bài thi ví lý do: [' + err.error + ']. Vui lòng về lại trang chủ và báo cho người quản lý. Xin cảm ơn.'
            }).subscribe( () => {
                this.goToHome();
            });
        });
    }

    // Go to home screen
    goToHome() {
        this.localStorage.remove('testInfo');
        this.clearSavedAnwsers();
        this.router.navigateByUrl('/staff/home');
    }

    str_pad_left (str , pad, length) {
        return (new Array(length + 1).join(pad) + str).slice(-length);
    }

    calcTimeUsedInMinute() {
        this.timer1 = setInterval( () => {
            let minutes = Math.floor(this.timeUsed / 60);
            let seconds = this.timeUsed - minutes * 60;
            this.timeUsedInMinute = this.str_pad_left(minutes, '0', 2) + ':' + this.str_pad_left(seconds, '0', 2);

            // Out of time
            if (this.timeUsed >= this.examTime) {
                this.finish();
            }

            this.timeUsed ++;
        }, 1000);
    }

    selectQuestion(index) {
        if (index < 0) {
            index = this.questions.length - 1;
        }
        if (index >= this.questions.length) {
            index = 0;
        }

        this.currentQuestion = this.questions[index];
    }

    getColor(question) {
        let anwser = this.anwsers[question.index];
        if (question === this.currentQuestion) {
            return 'primary';
        } else if (question.isFlagged) {
            return 'accent';
        } else if (anwser && (anwser.is_anwser1_right || anwser.is_anwser2_right || anwser.is_anwser3_right || anwser.is_anwser4_right)) {
            return 'teal';
        }

        return 'basic';
    }

    loadAnwsers() {
        let data = this.localStorage.get('anwsers');
        if (data) {
            this.anwsers = data;
        }
    }

    saveAnwsers() {
        this.localStorage.set('anwsers', this.anwsers);
    }

    clearSavedAnwsers() {
        this.localStorage.remove('anwsers');
    }

    preFinish() {
        this.ssDialog.openConfirm({
            title: 'Kết thúc',
            content: 'Bạn có muốn kết thúc bài thi không?',
            okText: 'Có',
            cancelText: 'Không'
        }).subscribe( choice => {
            if (choice) {
                this.finish();
            }
        });
    }

    finish() {
        if (this.isFinish) {
            return;
        }

        this.isFinish = true;
        clearInterval(this.timer1);
        this.http.post<any>('api/public/exams/anwsers', {
            staff_id: this.testInfo.staff_id,
            exam_id: this.testInfo.exam_id,
            category_id: this.testInfo.category_id,
            anwsers: this.anwsers
        }).subscribe( result => {
            let ketqua = '';
            if (result.is_pass) {
                ketqua = `Chúc mừng bạn đã vượt qua bài thi với điểm số ${result.score}`;
            } else {
                ketqua = `Rất tiếc! Bạn đã không hoàn thành bài thi với điểm số ${result.score}`;
            }

            this.ssDialog.openConfirm({
                title: 'Kết quả thi',
                content: ketqua
            }).subscribe(() => {
                this.goToHome();
            });
        });
        this.clearSavedAnwsers();
    }

    preExit() {
        this.ssDialog.openConfirm({
            title: 'Thoát',
            content: 'Bạn có muốn thoát mà không nộp bài thi không?',
            okText: 'Có',
            cancelText: 'Không'
        }).subscribe( choice => {
            if (choice) {
                this.goToHome();
            }
        });
    }
}

interface ITestInfo {
    staff_id: number,
    exam_id: number,
    category_id: number,
    staffName: string,
    staffCode: string,
    categoryName: string,
    examName: string
}

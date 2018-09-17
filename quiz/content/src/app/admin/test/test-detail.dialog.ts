
// import { QuestionService } from '../shared/question.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TestService } from '../shared/test.service';

@Component({
    selector: 'my-category-form',
    templateUrl: 'test-detail.dialog.html'
})
export class TestDetailDialogComponent implements OnInit {
    questions: any = [];
    test: any = {};

    constructor(
        private testService: TestService,
        public dialogRef: MatDialogRef<TestDetailDialogComponent>,

        /* data
            staffName: staff.name,
            testId: staff.test_id,
            scoreToPass: 5,
            numberOfQuestion: 6,
            exam: exam name
            category: staff.category
        */
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
        this.getTestDetail().subscribe(data => {
            this.test = data.test;
            this.questions = data.questions;
            let questionIndex = {};
            this.questions.forEach(question => {
                questionIndex[question.id] = question;
            });

            // Update user anwsers
            let anwserArr = this.test.anwsers.split('|');
            anwserArr.forEach(anwser => {
                let temp = anwser.split(',');
                let question = questionIndex[temp[0]];
                if (question) {
                    question.is_staff_anwser1_right = Number(temp[1]);
                    question.is_staff_anwser2_right = Number(temp[2]);
                    question.is_staff_anwser3_right = Number(temp[3]);
                    question.is_staff_anwser4_right = Number(temp[4]);
                }

            });
        });
    }

    close(data?) {
        this.dialogRef.close(data);
    }

    getTestDetail() {
        return this.testService.getDetailWithQuestions(this.data.testId);
    }
}

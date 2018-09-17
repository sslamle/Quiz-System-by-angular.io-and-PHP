<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Exam;
use App\Test;
use App\Question;

class ExamController extends BaseController
{
    public function showAll() {
        return response()->json(Exam::orderBy('created_at', 'desc')->get());
    }

    public function showAllActiveExams() {
        return response()->json(Exam::where('is_active', true)->get());
    }

    public function showOne($id) {
        return response()->json(Exam::find($id));
    }

    // Get questions for a staff does the test
    public function getQuestions(Request $request) {
        $this->validate($request, [
            'category_id' => 'required',
            'staff_id' => 'required',
            'exam_id' => 'required'
        ]);
        $data = $request->all();
        $test = Test::findByData($data);
        $exam = Exam::find($data['exam_id']);

        if (!$test) {
            $questionsArr = [];

            // Lấy các câu hỏi chung
            foreach ($exam->general_categories as $cat) {
                $catQuestions = Question::getRandomQuestions($cat['cat'], $cat['noq']);
                if (!isset($catQuestions['error'])) {
                    $questionsArr = array_merge($questionsArr, $catQuestions);
                } else {
                    return response()->json(array('error' => 'Không đủ câu hỏi ['.$cat['cat'].']' ), 422);
                }
            }

            // Lấy câu hỏi từ chuyên mục chính
            $mainQuestions = Question::getRandomQuestions($data['category_id'], $exam->number_of_questions - count($questionsArr));
            if (!isset($catQuestions['error'])) {
                $questionsArr = array_merge($questionsArr, $mainQuestions);
                shuffle($questionsArr);
                $data['questions'] = join(',', $questionsArr);
                $test = Test::create($data);
            } else {
                return response()->json(array('error' => 'Không đủ câu hỏi ['.$test->category_id.']' ), 422);
            }
            
        }

        return response()->json(array('exam' => $exam, 'test' => $test, 'questions' => $test->questions()));
    }

    
    // Staff anwser the test of exam
    public function Anwsers(Request $request) {
        $this->validate($request, [
            'category_id' => 'required',
            'staff_id' => 'required',
            'exam_id' => 'required',
            'anwsers' => 'required'
        ]);
        $data = $request->all();
        $test = Test::findByData($data);      

        if (!$test) {
            return response()->json(array('error' => 'Không tồn tại bài kiểm tra'), 422);
        }

        // Check already submit before
        if ($test->anwsers) {
            return response()->json(array('error' => 'Không thể nộp lại bài lần 2'), 422);
        }

        $exam = Exam::find($data['exam_id']);
        // Check end time, allow user add more 3 minutes to end
        $allowEndedTime = new Carbon($test->created_at);
        $allowEndedTime = $allowEndedTime->addMinutes($exam->time_in_minute + 3);
        
        $now = Carbon::now();

        // Over time
        if ($now->gt($allowEndedTime)) {
            if (!$test->anwsers){
                $test->anwsers = 'OVER_TIME';
                $test->is_pass = false;
            }
            $test->save();
            return response()->json(array('error' => 'Đã hết thời gian nộp bài.'), 422);
        }
        
        // Check anwsers
        $questions = $test->questions();
        $score = 0;
        $saveAnwsers = '';
        foreach($questions as $index=>$question) {
            $anwser = $data['anwsers'][$index];
            if (
                 $anwser['is_anwser1_right'] == $question['is_anwser1_right']
              && $anwser['is_anwser2_right'] == $question['is_anwser2_right']
              && $anwser['is_anwser3_right'] == $question['is_anwser3_right']
              && $anwser['is_anwser4_right'] == $question['is_anwser4_right']
            ) {
                $score ++;
            }

            // Save staff's anwsers
            $anwser1 = $anwser['is_anwser1_right']? '1' : '0';
            $anwser2 = $anwser['is_anwser2_right']? '1' : '0';
            $anwser3 = $anwser['is_anwser3_right']? '1' : '0';
            $anwser4 = $anwser['is_anwser4_right']? '1' : '0';
            $id = (string)$anwser['id'];
            $saveAnwsers .= "{$id},{$anwser1},{$anwser2},{$anwser3},{$anwser4}|";
        }

        $isPass = $score >= $exam->score_to_pass;

        $test->anwsers = $saveAnwsers;
        $test->is_pass = $isPass;
        $test->ended_at = Carbon::now();
        $test->score = $score;
        $test->save();

        return response()->json($test);
    }


    public function create(Request $request) {
        $this->validate($request, [
            'name' => 'required',
            'is_active' => 'required',
            'number_of_questions' => 'required',
            'score_to_pass' => 'required',
            'time_in_minute' => 'required'
        ]);

        $exam = Exam::create($request->all());
        return response()->json($exam, 201);
    }

    public function update($id, Request $request) {
        $exam = Exam::findOrFail($id);
        $exam->update($request->all());

        return response()->json($exam, 200);
    }

    public function delete($id) {
        Exam::findOrFail($id)->delete();
        return response()->json(array('result'=> 'Deleted successfully'), 200);
    }

    // Get all tests of exam
    public function getTestsOfExam($id) {
        $exam = Exam::findOrFail($id);
        return response()->json($exam->tests);
    }
}

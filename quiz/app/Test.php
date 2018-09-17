<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Question;
use App\AdminQuestion;

class Test extends Model
{
    protected $table = 'tests';
    
    protected $fillable = [
        'staff_id',
        'category_id',
        'exam_id',
        'questions',    // Format: id1,id2,id3,id4...
        'score',
        'is_pass',
        'anwsers',      // Format: id1,anw1,anw2,anw3,anw4|id2,anw1,anw2,anw3,anw4
        'ended_at'
    ];

    protected $casts = [
        'score' => 'integer',
        'is_pass' => 'boolean',
    ];

    protected $hidden = [];
    
    protected $dates = [
        'ended_at'
    ];

    public function staff() {
        return $this->belongTo('App\Staff', 'staff_id');
    }

    public function category() {
        return $this->belongTo('App\Category', 'category_id');
    }

    public function exam() {
        return $this->belongTo('App\Exam', 'exam_id');
    }

    public function questions() {
        $questionIDs = explode(',', $this->questions);
        $questions = Question::find($questionIDs);
        $questionsInOrder = array();
        foreach ($questions as $question) {
            $questionsInOrder[$question->id] = $question;
        }
        $result = [];
        foreach ($questionIDs as $id) {
            if (isset($questionsInOrder[$id])) $result[] = $questionsInOrder[$id];
            else $result[] = array(
                'id' => (int)$id,
                'content' => 'Câu hỏi không còn tồn tại.'
            );
        }
        return $result;
    }

    public function adminQuestions() {
        $questionIDs = explode(',', $this->questions);
        $questions = AdminQuestion::find($questionIDs);
        $questionsInOrder = array();
        foreach ($questions as $question) {
            $questionsInOrder[$question->id] = $question;
        }
        $result = [];
        foreach ($questionIDs as $id) {
            if (isset($questionsInOrder[$id])) $result[] = $questionsInOrder[$id];
            else $result[] = array(
                'id' => (int)$id,
                'content' => 'Câu hỏi không còn tồn tại.'
            );
        }
        return $result;
    }
    
    public static function findByData($data) {
        return Test::where('category_id', $data['category_id'])
                          ->where('staff_id', $data['staff_id'])  
                          ->where('exam_id', $data['exam_id'])
                          ->first();
    }
}
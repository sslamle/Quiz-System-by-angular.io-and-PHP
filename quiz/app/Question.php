<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $table = 'questions';
    
    protected $hidden = [
        'is_anwser1_right',
        'is_anwser2_right',
        'is_anwser3_right',
        'is_anwser4_right',
        'is_anwser5_right'
    ];
    
    public function category() {
        return $this->belongsTo('App\Category', 'category_id');
    }

    public function creator() {
        return $this->belongsTo('App\User', 'creator_id');
    }

    public static function getRandomQuestions($categoryId, $numberOfQuestion) {
        $availabeQuestions = Question::where('category_id', $categoryId)
            ->pluck('id')
            ->all();

        // Not enough questions
        if (count($availabeQuestions) < $numberOfQuestion) {
            return array('error' => 'Not enought questions');
        }

        shuffle($availabeQuestions);
        $questionsArr = array_slice($availabeQuestions, 0, $numberOfQuestion);
        return $questionsArr;
    }

}
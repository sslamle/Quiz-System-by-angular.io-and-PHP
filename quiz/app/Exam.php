<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    protected $table = 'exams';
    
    protected $fillable = [
        'name',
        'is_active',
        'number_of_questions',
        'score_to_pass',
        'time_in_minute',
        'general_categories'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'number_of_questions' => 'integer',
        'score_to_pass' => 'integer',
        'time_in_minute' => 'integer',
        'general_categories' => 'array'
    ];

    protected $hidden = [];
    
    public function tests() {
        return $this->hasMany('App\Test', 'exam_id');
    }
}
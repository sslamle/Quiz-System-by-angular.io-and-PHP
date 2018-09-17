<?php
namespace App;

use App\Question;

class AdminQuestion extends Question
{
    protected $fillable = [
        'creator_id',
        'category_id',
        'content',
        'anwser1', 'is_anwser1_right',
        'anwser2', 'is_anwser2_right',
        'anwser3', 'is_anwser3_right',
        'anwser4', 'is_anwser4_right',
        'anwser5', 'is_anwser5_right',
	];
    protected $hidden = [];
    

}
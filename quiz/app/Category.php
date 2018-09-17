<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
	
	protected $fillable = [
		'name',
		'is_general'
	];

	protected $hidden = [];

	protected $casts = [
        'is_general' => 'boolean'
	];
	
	public function questions() {
		return $this->hasMany('App\Question', 'category_id');
	}

	public function adminQuestions() {
		return $this->hasMany('App\AdminQuestion', 'category_id');
	}
}
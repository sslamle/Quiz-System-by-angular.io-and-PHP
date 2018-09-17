<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    protected $table = 'staffs';
    
    protected $fillable = [
        'name',
        'code',
        'unit_id'
    ];

    protected $hidden = [];

    protected $casts = [
        'unit_id' => 'integer'
    ];

    public function tests() {
        return $this->hasMany('App\Test', 'staff_id');
    }
}
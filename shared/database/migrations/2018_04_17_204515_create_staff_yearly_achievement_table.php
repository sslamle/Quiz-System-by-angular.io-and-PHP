<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStaffYearlyAchievementTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('staff_yearly_achievement', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('staff_id');
            $table->unsignedSmallInteger('year');
            $table->unsignedTinyInteger('achievement_code');
            $table->string('note', 300)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('staff_yearly_achievement');
    }
}

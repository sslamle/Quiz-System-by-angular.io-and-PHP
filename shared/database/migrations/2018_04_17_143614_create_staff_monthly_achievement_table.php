<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStaffMonthlyAchievementTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('staff_monthly_achievement', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('staff_id');
            $table->unsignedSmallInteger('year');
            $table->unsignedTinyInteger('month_1')->nullable();
            $table->string('note_1', 300)->nullable();
            $table->unsignedTinyInteger('month_2')->nullable();
            $table->string('note_2', 300)->nullable();
            $table->unsignedTinyInteger('month_3')->nullable();
            $table->string('note_3', 300)->nullable();
            $table->unsignedTinyInteger('month_4')->nullable();
            $table->string('note_4', 300)->nullable();
            $table->unsignedTinyInteger('month_5')->nullable();
            $table->string('note_5', 300)->nullable();
            $table->unsignedTinyInteger('month_6')->nullable();
            $table->string('note_6', 300)->nullable();
            $table->unsignedTinyInteger('month_7')->nullable();
            $table->string('note_7', 300)->nullable();
            $table->unsignedTinyInteger('month_8')->nullable();
            $table->string('note_8', 300)->nullable();
            $table->unsignedTinyInteger('month_9')->nullable();
            $table->string('note_9', 300)->nullable();
            $table->unsignedTinyInteger('month_10')->nullable();
            $table->string('note_10', 300)->nullable();
            $table->unsignedTinyInteger('month_11')->nullable();
            $table->string('note_11', 300)->nullable();
            $table->unsignedTinyInteger('month_12')->nullable();
            $table->string('note_12', 300)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('staff_monthly_achievement');
    }
}

<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUnitRegisterAchievementTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unit_register_achievement', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('unit_id');
            $table->unsignedTinyInteger('achievement_code');
            $table->unsignedSmallInteger('year');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('unit_register_achievement');
    }
}

<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tests', function (Blueprint $table) {
            $table->mediumIncrements('id');
            $table->timestamps();
            $table->integer('staff_id');
            $table->integer('exam_id');
            $table->integer('category_id');
            $table->string('questions', 500);
            $table->unsignedTinyInteger('score');
            $table->boolean('is_pass');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tests');
    }
}

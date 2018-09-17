<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('questions', function (Blueprint $table) {
            $table->string('anwser1', 1000);
            $table->boolean('is_anwser1_right');
            $table->string('anwser2', 1000);
            $table->boolean('is_anwser2_right');
            $table->string('anwser3', 1000)->nullable();
            $table->boolean('is_anwser3_right')->nullable();
            $table->string('anwser4', 1000)->nullable();
            $table->boolean('is_anwser4_right')->nullable();
            $table->string('anwser5', 1000)->nullable();
            $table->boolean('is_anwser5_right')->nullable();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('questions', function (Blueprint $table) {
            $table->dropColumn('anwser1');
            $table->dropColumn('is_anwser1_right');
            $table->dropColumn('anwser2');
            $table->dropColumn('is_anwser2_right');
            $table->dropColumn('anwser3');
            $table->dropColumn('is_anwser3_right');
            $table->dropColumn('anwser4');
            $table->dropColumn('is_anwser4_right');
            $table->dropColumn('anwser5');
            $table->dropColumn('is_anwser5_right');
        });
    }
}

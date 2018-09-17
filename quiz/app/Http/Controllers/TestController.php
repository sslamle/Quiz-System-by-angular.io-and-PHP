<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use App\Test;

class TestController extends BaseController
{
    public function getDetailWithQuestions($id) {
        $test = Test::find($id);
        $questions = $test->adminQuestions();
        return response()->json(array('test' => $test, 'questions' => $questions));
    }
}

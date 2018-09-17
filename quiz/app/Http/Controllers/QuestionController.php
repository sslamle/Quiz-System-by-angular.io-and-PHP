<?php

namespace App\Http\Controllers;

use App\AdminQuestion;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function showAll() {
        return response()->json(AdminQuestion::all());
    }

    public function showOne($id) {
        return response()->json(AdminQuestion::find($id));
    }
    
    public function create(Request $request) {
        $this->validate($request, [
            'content' => 'required',
            'anwser1' => 'required',
            'anwser2' => 'required'
        ]);
        $data = $request->all();
        $data['creator_id'] = $request->user()->id;

        $question = AdminQuestion::create($data);
        return response()->json($question, 201);
    }

    public function update($id, Request $request) {
        $question = AdminQuestion::findOrFail($id);
        $question->update($request->all());

        return response()->json($question, 200);
    }

    public function delete($id) {
        AdminQuestion::findOrFail($id)->delete();
        return response(array('result' => 'Deleted successfully'), 200);
    }
}
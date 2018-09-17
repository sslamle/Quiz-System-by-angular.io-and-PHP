<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function showAllCategories() {
        return response()->json(Category::withCount('questions')->get());
    }

    public function showOneCategory($id) {
        return response()->json(Category::find($id));
    }
    
    public function showQuestionsOfCategory($id) {
        $questions = Category::find($id)->questions;
        return response()->json($questions);
    }

    public function showAdminQuestionsOfCategory($id) {
        $questions = Category::find($id)->adminQuestions;
        return response()->json($questions);
    }

    public function create(Request $request) {
        $this->validate($request, [
            'name' => 'required'
        ]);

        $category = Category::create($request->all());
        return response()->json($category, 201);
    }

    public function update($id, Request $request) {
        $category = Category::findOrFail($id);
        $category->update($request->all());

        return response()->json($category, 200);
    }

    public function delete($id) {
        Category::findOrFail($id)->delete();
        return response(array('result' => 'Deleted successfully'), 200);
    }
}
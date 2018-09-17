<?php

namespace App\Http\Controllers;

use App\Unit;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    public function showAll() {
        return response()->json(Unit::all());
    }

    public function showOne($id) {
        return response()->json(Unit::find($id));
    }
    
    public function create(Request $request) {
        $this->validate($request, [
            'name' => 'required'
        ]);

        $unit = Unit::create($request->all());
        return response()->json($unit, 201);
    }

    public function update($id, Request $request) {
        $unit = Unit::findOrFail($id);
        $unit->update($request->all());

        return response()->json($unit, 200);
    }

    public function delete($id) {
        Unit::findOrFail($id)->delete();
        return response(array('result' => 'Deleted successfully'), 200);
    }
}
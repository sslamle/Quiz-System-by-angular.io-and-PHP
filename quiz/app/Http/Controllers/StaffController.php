<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Staff;

class StaffController extends BaseController
{
    public function showAll() {
        return response()->json(Staff::orderBy('code')->get());
    }

    public function showOne($id) {
        return response()->json(Staff::find($id));
    }

    public function showOneByCode($code) {
        return response()->json(Staff::where('code', $code)->first());
    }
    
    public function create(Request $request) {
        $this->validate($request, [
            'name' => 'required',
            'code' => 'required|unique:staffs'
        ]);

        $staff = Staff::create($request->all());
        return response()->json($staff, 201);
    }

    public function createFromArray(Request $request) {
        $staffs = $request->all();

        foreach($staffs as $staff) {
            try {
                Staff::create($staff);
            } catch (\Illuminate\Database\QueryException $e) {
                // Do nothing
            }
        }
        
        return response()->json(array('result' => 'ok'), 201);
    }

    public function update($id, Request $request) {
        $staff = Staff::findOrFail($id);
        $staff->update($request->all());

        return response()->json($staff, 200);
    }

    public function delete($id) {
        Staff::findOrFail($id)->delete();
        return response(array('result'=> 'Deleted successfully'), 200);
    }

    // Get all tests of staff
    public function getTestsOfStaff($id) {
        $staff = Staff::findOrFail($id);
        return response()->json($staff->tests);
    }
}

<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

use App\User;
use Illuminate\Http\Request;

class UserController extends BaseController
{
    public function showAllUsers() {
        return response()->json(User::orderBy('id')->get());
    }
    
    public function create(Request $request) {
        $this->validate($request, [
            'name' => 'required',
            'username' => 'required|unique:users',
            'password' => 'required',
            'repassword' => 'required',
            'role' => 'required'
        ]);

        $data = $request->all();

        if (!$this->check_repassword($data)) {
            return response()->json(array('repassword' => 'Not match'), 422);
        }

        $data['password'] = User::hashPass($data['password']);
        $user = User::create($data);
        return response()->json($user, 201);
    }

    public function update($id, Request $request) {
        $this->validate($request, [
            'name' => 'nullable',
            'password' => 'nullable',
            'role' => 'nullable'
        ]);

        $user = User::findOrFail($id);
        $data = $request->all();

        if (array_key_exists('password', $data)) {
            if (!$this->check_repassword($data)) {
                return response()->json(array('repassword' => 'Not match'), 422);
            }

            $data['password'] = User::hashPass($data['password']);
            $user->password = $data['password'];
        }
        
        if (array_key_exists('name', $data)) {
            $user->name = $data['name'];
        }
        if (array_key_exists('role', $data)) {
            $user->role = $data['role'];
        }

        $user->save();
        return response()->json($user, 201);
    }

    public function updateCurrent(Request $request) {
        $this->validate($request, [
            'oldPassword' => 'required',
            'password' => 'required',
            'repassword' => 'required'
        ]);
        $data = $request->all();
        if (!$this->check_repassword($data)) {
            return response()->json(array('repassword' => 'Not match'), 422);
        }

        $user = User::findOrFail($request->user()->id)->makeVisible(['password']);
        if ($user->password !== User::hashPass($data['oldPassword'])) {
            return response()->json(array('oldPassword' => 'Mật khẩu cũ không đúng'), 422);
        }

        $data['password'] = User::hashPass($data['password']);
        $user->password = $data['password'];
        $user->save();
        return response()->json(['result' => 'ok']);
    }

    private function check_repassword($data) {
        return array_key_exists('password', $data) && array_key_exists('repassword', $data) && $data['password'] == $data['repassword'];
    }

    public function delete($id) {
        User::findOrFail($id)->delete();
        return response(array('result' => 'Deleted successfully'), 200);
    }
}

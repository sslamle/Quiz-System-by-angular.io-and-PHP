<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

use App\User;
use Illuminate\Http\Request;
use \Firebase\JWT\JWT;

class AuthController extends BaseController
{
    public function login(Request $request) {
        $this->validate($request, [
            'username' => 'required',
            'password' => 'required'
        ]);
        $data = $request->all();
        $data['password'] = User::hashPass($data['password']);

        
        $user = User::where('username', $data['username'])->where('password', $data['password'])->first();
        if (is_null($user)) {
            return response()->json('Login faild', 422);
        }
        
        $user['access_token'] = $this->generateToken($user);

        return response()->json($user, 200);
    }

    public function test(Request $request) {
        $user = $request->user();
        return response()->json($user, 200);
    }

    public function renew(Request $request) {
        $user = $request->user();
        return response()->json(array('access_token' => $this->generateToken($user)), 201);
    }
    
    public function currentUser(Request $request) {
        return response()->json($request->user());
    }

    private function generateToken($user) {
        $key = config('jwt.secret');
        $token = array(
            "id" => $user->id,
            "iat" => time(),
            "exp" => time() + (7 * 24 * 60 * 60)    // 7 days
            // "exp" => time() + 1 * 10
        );
        $jwt = JWT::encode($token, $key);
        return $jwt;
    }
}
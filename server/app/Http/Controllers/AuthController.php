<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function logout()
    {
        auth('api')->logout();
        return ['success' => true];
    }

    public function refresh()
    {
        return $this->respondWithToken(auth('api')->refresh(true, true));
    }

    protected function respondWithToken($token)
    {
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ];
    }

    public function login()
    {
        $credentials = request(['email', 'password']);
        if (!$token = auth('api')->attempt($credentials)) {
            return ['error' => 'Wrong credentials'];
        }
        return $this->respondWithToken($token);
    }

    public function me() {
        $user = User::find(auth('api')->user()->id);
        if (!$user) {
            return ['error' => 'User does not exist'];
        }
        return new UserResource($user->with('books')->with('reviews')->first());
    }
}

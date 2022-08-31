<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);
        
        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
 
        $rol = User::where('email', $credentials['email'])->first()->rol;
        return $this->respondWithToken($token, $rol);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token, $rol)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'rol' => $rol
        ]);
    }

    public function register(Request $request){

        $validator = Validator::make($request->all(), [

            'name' => 'required|string',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string'
        ]);

        if($validator->fails()){

            return response()->json($validator->errors()->token(),400);
        }

        $user = User::create(array_merge(
            $validator->validate(),
            [
                'password' => Hash::make($request->password),
                'rol' => 0
            ]
        ));

        return response()->json([
            'message' => '!Usuario registrado existosamente',
            'user' => $user
        ], 201);
    }
}
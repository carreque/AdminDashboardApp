<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function getUsers(Request $request){

        $usuarios = User::all();
        return $usuarios != null ? response()->json($usuarios, 200) : response()->json('Error al obtener los usuarios', 400);
    }

    public function getAUser(Request $request){

        if($request->id != null){

            return response()->json(User::find($request->id), 200);
        }

        return response()->json('Se ha producido un error al buscar al usuario', 400);
    }


    public function editUser(Request $request){

        if($request->all() != null){

            User::where('id', $request->id)->update(["name" => $request->name, "email" => $request->email, "rol" => $request->rol]);
            $request->password != null ?  User::where('id', $request->id)->update(["password" => Hash::make($request->password)]) : null;
            return response()->json('Usuario editado Correctamente', 200);
        }

        return response()->json('Se ha producido un error al editar un usuario', 400);
    }

    public function deleteUser(Request $request){

        if($request->id != null){

            User::find($request->id)->delete();
            return response()->json('Usuario eliminado Correctamente',200);
        }

        return response()->json('Se ha producido un error al borrar el usuario',400);
    }

    public function newUser(Request $request){

        // return $request->all();
        $validator = Validator::make($request->all(), [

            'name' => 'required|string',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string',
            'rol' => 'required'
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

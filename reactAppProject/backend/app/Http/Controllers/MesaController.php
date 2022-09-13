<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mesa;

class MesaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllTables()
    {
        $mesas = Mesa::all();
        return $mesas != null ? response()->json($mesas, 200) : response()->json('Se ha producido un error al obtener las mesas', 500);
    }

    public function createNewTable(Request $request){

        if($request->all() != null){

            $nuevaMesa = Mesa::create([
                "name" => $request->name,
                "activa" => $request->activa,
                "estado" => $request->estado,
                "comensales" => $request->comensales
            ]);

            return $nuevaMesa != null ? response()->json($nuevaMesa, 200) : response()->json('Se ha producido un error al insertar', 500);
        }

        return response()->json('Se ha producido un error al crear una mesa', 500);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        if($request->id != null){

            $mesaDeleted = Mesa::where('id', $request->id)->delete();
            return $mesaDeleted != null ? response()->json('Mesa eliminada correctamente', 200) : response()->json('Se ha producido un error al eliminar la mesa', 500);
        }

        return response()->json('Se ha producido un error al borrar', 500);
    }

    public function deactivateTable(Request $request){

        if($request->id != null){

            $mesaDesactivada = Mesa::where('id', $request->id)->update(['estado' => 0]);
            return $mesaDesactivada != null ? response()->json('Mesa desactivada correctamente', 200) : response()->json('Se ha producido un error al desactivar la mesa', 500);
        }

        return response()->json('Se ha producido un error al desactivar', 500);
    }

    public function editTable(Request $request){

        if($request->all() != null){

            $mesaUpdated = Mesa::where('id', $request->id)->update([
                'name' => $request->name, 
                'estado' => $request->estado, 
                'activa' => $request->activa, 
                'comensales' => $request->comensales
            ]);

            return $mesaUpdated != null ? response()->json('Mesa Actualizada Correctamente', 200) : response()->json('Se ha producido un error al actualizar la mesa', 500);
        }

        return response()->json('Se ha producido un error al editar la mesa', 500);
    }

    public function getInfoTable(Request $request){

        if($request->id != null){

            $mesa = Mesa::find($request->id);
            return $mesa != null ? response()->json($mesa, 200) : response()->json('Se ha producido un error al obtener la mesa', 500);
        }

        return response()->json('Se ha producido un error al obtener la mesa', 500);
    }
}

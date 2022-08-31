<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Producto;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if($request->all() != null){

            $nuevaCategoria = Category::create(["name" => $request->name]);
            return response()->json('Categoria creada satisfactoriamente',201);
        }

        return response()->json('Se ha producido un error al crear la categoria', 400);
    }

    /**
     * Display all categories.
     *
     * @param  Request
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $categorias = Category::all();

        return $categorias != null ?  response()->json($categorias, 200) : response()->json('Se ha producido un error al obtener las categorias', 400);
        
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

            Producto::where('tipo', $request->id)->delete();
            Category::where('id', $request->id)->delete();
            return response()->json('Categoria eliminada satisfactoriamente', 200);
        }

        return response()->json('Se ha producido un error al eliminar la categoria', 400);
    }
}

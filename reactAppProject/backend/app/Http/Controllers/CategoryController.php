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

    public function getCategoryConsumptionWeekly(Request $request){

        if($request->id != null){

            $facturasSemanales = FacturaController::getWeeklyBills();
            $totalCategoriasConsumidas = 0;
            $timesCategoryConsumedWeekly = 0;

            foreach($facturasSemanales as $factura){

                $categoriasFactura = is_Array(unserialize($factura->tipos)) ? unserialize($factura->tipos) : [unserialize($factura->tipos)];
                // return $categoriasFactura;
                while(in_array($request->id, $categoriasFactura)){
                    $clave = array_search($request->id, $categoriasFactura);
                    unset($categoriasFactura[$clave]);
                    $timesCategoryConsumedWeekly += 1;
                }

                $totalCategoriasConsumidas += sizeof($categoriasFactura);
            }

            return response()->json([$totalCategoriasConsumidas, $timesCategoryConsumedWeekly],200);
        }

        return response()->json('Se ha producido un error al obtener la consumicion semanal', 500);
    }

    public function getCategoryConsumptionMonthly(Request $request){

        if($request->id != null){

            $facturasMensuales = FacturaController::getMonthlyBills();
            $totalCategoriasConsumidasMensuales = 0;
            $timesCategoryConsumedMonthly = 0;
            
            foreach($facturasMensuales as $factura){

                $tiposFactura = is_Array(unserialize($factura->tipos)) ? unserialize($factura->tipos) : [unserialize($factura->tipos)];
                while(in_array($request->id, $tiposFactura)){

                    $clave = array_search($request->id, $tiposFactura);
                    unset($tiposFactura[$clave]);
                    $timesCategoryConsumedMonthly += 1;
                }

                $totalCategoriasConsumidasMensuales += sizeof($tiposFactura);
            }

            return response()->json([$totalCategoriasConsumidasMensuales, $timesCategoryConsumedMonthly],200);
        }

        return response()->json('Se ha producido un error al obtener la consumicion mensual', 500);
    }
}

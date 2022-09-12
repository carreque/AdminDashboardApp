<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;
use App\Models\Factura;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\FacturaController;

class ProductoController extends Controller
{

    public function getMediaOfPrices(Request $request){

        $media = 0;
        $productos = Producto::all();
        foreach($productos as $producto){

            $media += $producto->tipo == 9 || $producto->tipo == 10 ? $producto->precio_bebida : $producto->precio_racion;
        }

        return $media != null ? response()->json(number_format($media/sizeof($productos),3), 200) : response()->json('Se ha producido un error al obtener la media',400);
    }

    
    public function getAllProducts(Request $request)
    {
        $productos = Producto::all();
        return $productos != null ? response()->json($productos, 200) : response()->json('Se ha producido un error al obtener productos', 400);
    }

    public function getProductsOfCertainCategory(Request $request){

        
        if($request->id != null){
            
            $productos = $request->id != 0 ? Producto::where('tipo', $request->id)->get() : Producto::all();
            return $productos != null ? response()->json($productos, 200) : response()->json('Se ha producido un error al obtener los productos',400);
        }

        return response()->json('Se ha producido un error al obtener los productos',400);
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

            // return $request->all();
            $nuevoProducto = Producto::create([
                'name' => $request->name,
                'tipo' => $request->tipo,
                'precio_tapa' => $request->precio_tapa ? : 0,
                'precio_media' => $request->precio_media ? : 0,
                'precio_racion' => $request->precio_racion ? : 0,
                'precio_bebida' => $request->precio_bebida ? : 0,
                'IVA' => $request->IVA,
                'Cocina' => $request->Cocina,
                'Activado' => $request->Activado,
                'Imagen' => $request->Imagen ? : null
            ]);

            return response()->json('Producto Creado Correctamente', 201);
        }

        return response()->json('Se ha producido un error al crear un producto', 400);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {

        if($request->id != null){

            $productoEncontrado = Producto::find($request->id) ? : null ;
            return response()->json($productoEncontrado, 200);
        }
    
        return response()->json('Se ha producido un error al obtener el producto', 400);
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        if($request->all() != null){

            Producto::find($request->id)->update(['name' => $request->name, 'precio_bebida' => $request->precio_bebida, 'precio_racion' => $request->precio_racion, 'IVA' => $request->IVA,'Activado' => $request->Activado, 'Cocina' => $request->Cocina]);
            return response()->json('Actualizado Correctamente', 200);
        }

        return response()->json('Se ha producido un error al actualizar', 400);
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
            
            Producto::where('id',$request->id)->delete();
            return response()->json('Producto eliminado',200);
        }

        return response()->json('Se ha producido un error al intentar eliminar producto', 400);
    }

    public function deactivateProduct(Request $request){

        if($request->id != null){

            Producto::where('id', $request->id)->update(['Activado'=> 0]);
            return response()->json('Producto desactivado correctamente', 200);
        }

        return response()->json('Se ha producido un error al desactivar el producto', 400);
    }

    public function changeIva(Request $request){

        if($request->all() != null){

            $request->selectorValor === 0 ? DB::table('productos')->increment('IVA', doubleval($request->newIva)) : Producto::where('tipo', $request->selectorValor)->increment('IVA' , doubleval($request->newIva));
            return response()->json('Iva Cambiao Correctamente', 200);
        }

        return response()->json('Se ha producido un error al cambiar el IVA', 400);
    }

    public function changePriceProduct(Request $request){

        if($request->all() != null){

            if($request->selectorValor == 0){

                Producto::where('precio_bebida', '>', '0')->increment('precio_bebida', doubleval($request->newPrices));
                Producto::where('precio_racion', '>', '0')->increment('precio_racion', doubleval($request->newPrices));
                
            }else{

                Producto::where('tipo', $request->selectorValor)->where('precio_bebida', '>', '0')->increment('precio_bebida', doubleval($request->newPrices));
                Producto::where('tipo', $request->selectorValor)->where('precio_racion', '>', '0')->increment('precio_racion', doubleval($request->newPrices));
                
            }

            return response()->json('Se ha actualizado correctamente el precio de los productos', 200);
        }

        return response()->json('Se ha producido un error al cambiar el precio de los productos', 400);
    }

    public function getConsumptionOfaProductWeekly(Request $request){

        if($request->id != null){

            $facturasSemanales = FacturaController::getWeeklyBills();
            $totalConsumidos = 0;
            $vecesProductoConsumido = 0;
            foreach($facturasSemanales as $facturaSemanal){

                $comanda = is_Array(unserialize($facturaSemanal->consumiciones)) ? unserialize($facturaSemanal->consumiciones) : [unserialize($facturaSemanal->consumiciones)];
                while(in_array($request->id, $comanda)){

                    $clave =  array_search($request->id, $comanda);
                    unset($comanda[$clave]);
                    $vecesProductoConsumido += 1;
                }

                $totalConsumidos += sizeof($comanda);
            }
            
            return response()->json([$totalConsumidos, $vecesProductoConsumido], 200);
        }

        return response()->json('Se ha producido un error al obtener la consumicion semanal', 500);
    }

    public function getConsumptionOfaProductMonthly(Request $request){

        if($request->id != null){

            $facturasMensuales = FacturaController::getMonthlyBills();
            $totalConsumidosMensuales = 0;
            $productoConsumidosMensuales = 0;

            foreach($facturasMensuales as $facturaMensual){

                $comanda = is_Array(unserialize($facturaMensual->consumiciones)) ? unserialize($facturaMensual->consumiciones) : [unserialize($facturaSemanal->consumiciones)];
                while(in_array($request->id, $comanda)){

                    $clave =  array_search($request->id, $comanda);
                    unset($comanda[$clave]);
                    $productoConsumidosMensuales += 1;
                }

                $totalConsumidosMensuales += sizeof($comanda);
            }

            return response()->json([$totalConsumidosMensuales, $productoConsumidosMensuales], 200);
        }

        return response()->json('Se ha producido un error al obtener la consumición mensual', 500);
    }
}

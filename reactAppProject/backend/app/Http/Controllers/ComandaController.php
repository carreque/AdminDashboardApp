<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Factura;
use App\Models\Producto;
class ComandaController extends Controller
{
    public function getOrderFromOneBill(Request $request){

        if($request->id != null){

            $factura = Factura::find($request->id);

            if($factura === null) return response()->json('Se ha producido un error al obtener la factura, 500');

            $comanda = array();
            foreach(is_array(unserialize($factura->consumiciones)) ? unserialize($factura->consumiciones) : [unserialize($factura->consumiciones)] as $consumisicion){

                $producto = Producto::find($consumisicion);

                if($producto != null){

                    if(array_key_exists($producto->name, $comanda)){

                        $comanda[$producto->name] += 1;
                    }else{
    
                        $comanda[$producto->name] = 1;
                    }
                }  
            }

            return response()->json($comanda,200);
            
        }

        return response()->json('Se ha producido un error al obtener la informacion', 500);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Factura;
use App\Models\Producto;

class FacturaController extends Controller
{

    public function getAmountOfPricesEarnToday(Request $request){

        $facturas = Factura::all();
        $total = 0;
        $fechaActual = strtotime(date('y-m-d'));
        foreach($facturas as $factura){

            $fechaActual == strtotime(substr($factura->created_at, 0,10)) ? ($total += $factura->total) : null;
        }
        
        return $total != null || $total == 0 ? response()->json($total, 200) : response()->json('No se ha podido obtener lo recaudado hoy', 400);
    }

    public function getPricesLastSixMonth(Request $request){

        $facturas = Factura::all();
        $totalPorMes = [0,0,0,0,0,0];
        $mesActual = 6; //intval(date("m"));
        $mesesAnteriores = [$mesActual,0,0,0,0,0];
        $mesesAñosAnteriores = [];
        $mesesAñoActual = [];

        foreach($mesesAnteriores as $index => $mes){

            if($index == 1){

                $mesesAnteriores[$index] = ($mesActual - 1) == 0 ? 12 : $mesActual - 1;
            }else if($index > 1){

                $mesesAnteriores[$index] = ($mesesAnteriores[$index-1] - 1) == 0 ? 12 : ($mesesAnteriores[$index-1] - 1);
            }
        }

        $mesesAnteriores = array_reverse($mesesAnteriores);

        //Procesar el array en caso de que se hayan obtenido meses de año anterior
        if(array_search(1, $mesesAnteriores) != false && array_search(12, $mesesAnteriores) != false){

            $claveSeparadora = array_search(1, $mesesAnteriores);
            $mesesAñosAnteriores = array_slice($mesesAnteriores, 0, $claveSeparadora);
            $mesesAñoActual = array_slice($mesesAnteriores, $claveSeparadora, sizeof($mesesAnteriores)-1);
            $añoAnterior = date('Y') - 1;
            $totalmesesAnteriores = [];
            $totalmesesActuales = [];

            ///Facturas de meses de años anteriores
            foreach($mesesAñosAnteriores as $index => $mesAnterior){

                $totalmes = 0;

                foreach($facturas as $factura){

                    if(strlen($mesesAñosAnteriores[$index]) == 1){

                        strcasecmp(substr($factura->created_at,0,7), $añoAnterior.'-0'.$mesesAñosAnteriores[$index]) == 0 ? $totalmes += $factura->total : null;
                    
                    }else if(strlen($mesesAñosAnteriores[$index]) == 2){

                        strcasecmp(substr($factura->created_at,0,7), $añoAnterior.'-'.$mesesAñosAnteriores[$index]) == 0 ? $totalmes += $factura->total : null;
                    }
                }
                
                array_push($totalmesesAnteriores, $totalmes);
            }


            foreach($mesesAñoActual as $index => $mesactual){

                $totalMesActual = 0;

                foreach($facturas as $factura){

                    if(strlen($mesesAñoActual[$index]) == 1){

                        strcasecmp(substr($factura->created_at,0,7), date('Y').'-0'.$mesesAñoActual[$index]) == 0 ? $totalMesActual += $factura->total : null;
                    }else if(strlen($mesesAñoActual[$index]) == 2){

                        strcasecmp(substr($factura->created_at,0,7), date('Y').'-'.$mesesAñoActual[$index]) == 0 ? $totalMesActual += $factura->total : null;
                    }
                }

            array_push($totalmesesActuales, $totalMesActual);
            }

            return $totalmesesAnteriores != null && $totalmesesActuales != null ? response()->json([array_merge($totalmesesAnteriores, $totalmesesActuales), $mesesAnteriores], 200) : response()->json([0,0], 400);
        
        }else{

            foreach($mesesAnteriores as $index => $mesactual){

                $totalRecaudado = 0;

                foreach($facturas as $factura){

                    if(strlen($mesesAnteriores[$index]) == 1){

                        strcasecmp(substr($factura->created_at,0,7), date('Y').'-0'.$mesesAnteriores[$index]) == 0 ? $totalRecaudado += $factura->total : null;
                    }else if(strlen($mesesAnteriores[$index]) == 2){

                        strcasecmp(substr($factura->created_at,0,7), date('Y').'-'.$mesesAnteriores[$index]) == 0 ? $totalRecaudado += $factura->total : null;
                    }
                }

                $totalPorMes[$index] = $totalRecaudado;
            }

            return [$totalPorMes, $mesesAnteriores];
        }
        
    }

    public function getTodayBills(Request $request){

        $facturas = Factura::all();
        $facturasDiarias = [];
        $fechaActual = strtotime(date('y-m-d'));
        foreach($facturas as $factura){

            strtotime(substr($factura->created_at,0,10)) === $fechaActual ? array_push($facturasDiarias, $factura->id) : null;

        }

        return !count($facturasDiarias) ? response()->json('No existen facturas de hoy', 500) : response()->json($facturasDiarias, 200);
    }

    public function getAllBills(Request $request){

        $facturas = Factura::all();

        return $facturas != null ? response()->json($facturas, 200) : response()->json('No hay facturas', 400);
    }

    public function deleteOneBill(Request $request){

        if($request->id != null){

            $billDeleted = Factura::where('id', $request->id)->delete();
            return $billDeleted ? response()->json('Factura eliminada Correctamente', 200) : response()->json('Se ha producido un error', 500);
        }

        return response()->json('Se ha producido un error al eliminar la factura', 500);
    }
    
    public function incrementProductOneBill(Request $request){

        if($request->id != null && $request->factura != null){

            $factura = Factura::find($request->factura);
            $consumiciones = !is_Array(unserialize($factura->consumiciones)) ? [unserialize($factura->consumiciones)] : unserialize($factura->consumiciones);
            array_push($consumiciones, intval($request->id));
            $producto = Producto::where('id', $request->id)->first(); 
            $factura->total += $producto->precio_racion != 0 ? $producto->precio_racion : $producto->precio_bebida;
            $factura->total_base = $factura->total - ($factura->total * $factura->total_iva/100);
            $rowsUpdated = Factura::where('id', $factura->id)->update(['consumiciones'=> serialize($consumiciones), 'total_base' => $factura->total_base, 'total' => $factura->total]);
            return $rowsUpdated != 0 ? response()->json('Fila Actualizada Correctamente', 200) : response()->json('Se ha producido un error al actualizar fila', 500);
        }

        return response()->json('Se ha producido un error al actualizar la factura', 500);
    }

    public function decrementProductOneBill(Request $request){

        if($request->id != null && $request->factura != null){

            $factura = Factura::find($request->factura);
            $consumiciones = !is_Array(unserialize($factura->consumiciones)) ? [unserialize($factura->consumiciones)] : unserialize($factura->consumiciones);
            $clave = array_search($request->id, $consumiciones);
            $consumiciones[$clave] = null;
            $producto = Producto::where('id', $request->id)->first();
            $factura->total -= $producto->precio_racion != 0 ? $producto->precio_racion : $producto->precio_bebida;
            $factura->total_base = $factura->total - ($factura->total * $factura->total_iva/100);
            $rowsUpdated = Factura::where('id', $factura->id)->update(['consumiciones'=> serialize(array_values($consumiciones)), 'total_base' => $factura->total_base, 'total' => $factura->total]);
            return $rowsUpdated != 0 ? response()->json('Fila Actualizada Correctamente', 200) : response()->json('Se ha producido un error al actualizar fila', 500);
        }

        return response()->json('Se ha producido un error al actualizar la factura', 500);
    }

    public function getOrdersFiltered(Request $request){

        if($request->all() !== null){

            $facturasToDatatable = [];
            $facturas = $request->referencia !== null ? [Factura::where('referencia', $request->referencia)->first()] : ($request->numMesa !== null ? $factura = Factura::where('id_mesa', $request->numMesa)->get() : Factura::all());
            foreach($facturas as $factura){
                if(strtotime(substr($factura->created_at,0,10)) > strtotime($request->fechaInicio) && strtotime($request->fechaFin) < strtotime(substr($factura->created_at, 0,10))){

                    array_push($facturasToDatatable, $factura);
                }
            }

            return response()->json($facturasToDatatable, 200);
        }

        return response()->json('Se ha producido un error al filtrar facturas', 500);
    }
}

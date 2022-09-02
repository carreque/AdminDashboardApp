<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Factura;

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
    public function destroy($id)
    {
        //
    }
}

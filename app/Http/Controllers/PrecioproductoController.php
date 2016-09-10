<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests;

use App\Precioproducto;
use App\Insumos;
use App\Bolsa;


class PrecioproductoController extends Controller
{
    public function store(Request $request){
    	try{
    		$data = $request->all();
    		$precio = new Precioproducto();
    		$precio->cantidad = $data['cantidad'];
    		$precio->idproducto = $data['idproducto'];
    		$precio->save();
    		return JsonResponse::create(array('std' => 1,'message' => "Guardado Correctamente"), 200);

    	}catch (Exception $exc){
			return JsonResponse::create(array('message' => "No se pudo guardar el cliente", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
		}
    }

    public function update(Request $request, $id){
        try{

            $data = $request->all();
            $insumo = Precioproducto::find($id);

            $cantidad = $data['cantidad'];
            $idbolsa = $data['idbolsa'];
            $precio = Insumos::select('*')
                        ->where('idproducto','=',$insumo->idproducto)
                        ->sum('precio');

            $bolsa = Bolsa::select('*')
                            ->where('id','=',$idbolsa)
                            ->first();            
            $preciobolsa = $bolsa->preciounidad;
            $amarre = 30;
            $etiquetas = 350;    
            $preciounidad = $precio / $cantidad;
            $preciototaluni = $preciounidad + $preciobolsa + $amarre + $etiquetas;

            $preciodistribuidor = (($preciototaluni*0.6)+$preciototaluni); 
            $preciocliente = (($preciodistribuidor*0.3)+$preciodistribuidor);
            $preciopublico = (($preciocliente*0.3)+$preciocliente);
            $administracion = $preciodistribuidor - ($preciodistribuidor*0.667);
            $utilidad = $preciodistribuidor - ($preciodistribuidor*0.333);

            $insumo->cantidad = $cantidad;
            $insumo->preciounidad = $preciounidad;
            $insumo->preciototalunidad = $preciototaluni;
            $insumo->preciodistribuidor = $preciodistribuidor;
            $insumo->preciocliente = $preciocliente;
            $insumo->preciopublico = $preciopublico;
            $insumo->administracion = $administracion;
            $insumo->utilidad = $utilidad;
            $insumo->idbolsa = $idbolsa;
            $insumo->save();



            return JsonResponse::create(array('std' => 1,'message' => "Guardado Correctamente", "request" =>$data), 200);
            
        }catch(Exception $ex){
            return JsonResponse::create(array('message' => "No se pudo Modificar el Grupo", "exception"=>$exc->getMessage(), 
                "request" =>json_encode($data)), 401);
        }
    }

    public function precioproducto($idproducto){
        return Precioproducto::select('*')
                            ->where('idproducto','=',$idproducto)
                            ->first();
    }

}

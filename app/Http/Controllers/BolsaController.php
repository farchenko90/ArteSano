<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests;

use App\Bolsa;

class BolsaController extends Controller
{
    public function store(Request $request){
    	try{

    		$data = $request->all();
    		$bolsa = new Bolsa();
    		$precio = $data['precio'];
    		$paquete = $data['paquete'];
    		$preciounidad = $precio / $paquete;
    		$bolsa->nombre = $data['nombre'];
    		$bolsa->precio = $precio;
            $bolsa->paquete = $paquete;
            $bolsa->preciounidad = $preciounidad;
    		$bolsa->save();
    		return JsonResponse::create(array('std' => 1,'message' => "Guardado Correctamente", "request" =>$data), 200);

    	}catch (Exception $exc){
			return JsonResponse::create(array('message' => "No se pudo guardar el cliente", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
		}
    }

    public function update(Request $request,$id)
    {
    	try{

    		$data = $request->all();
    		$precio = $data['precio'];
    		$paquete = $data['paquete'];
    		$preciounidad = $precio / $paquete;
    		$bolsa = Bolsa::find($id);
    		$bolsa->nombre = $data['nombre'];
    		$bolsa->precio = $precio;
            $bolsa->paquete = $paquete;
            $bolsa->preciounidad = $preciounidad;
    		$bolsa->save();
            
    		return JsonResponse::create(array('std' => 1,'message' => "Modificado Correctamente", "request" =>$data), 200);

    	}catch (Exception $exc){
			return JsonResponse::create(array('message' => "No se pudo guardar el cliente", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
		}
    }

    public function index()
    {
        return Bolsa::All();
    }

}

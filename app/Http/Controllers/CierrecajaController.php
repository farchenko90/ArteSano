<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests;
use App\Cierrecaja;
use DB;
use Carbon\Carbon;

class CierrecajaController extends Controller
{

    public function store(Request $request)
    {
    	try{
    		$data = $request->all();
    		$date = Carbon::now();
    		$user = Cierrecaja::select('*')
    					->where('idusuario','=',$data['idusuario'])
    					->where('fecha','=',$date->toDateString())
    					->first();
    		if($user == null){
	    		
	    		$cierre = new Cierrecaja();
	    		$cierre->total = $data['total'];
	    		$cierre->fecha = $date->toDateString();
	            $cierre->idusuario = $data['idusuario'];
	    		$cierre->save();
	    		return JsonResponse::create(array('std' => 1,'message' => "Guardado Correctamente", "request" =>$data), 200);
    		}else{
    			return JsonResponse::create(array('std' => 2,'message' => "El Cierre de caja ya se efectuo para este día"), 200);
    		}

    	}catch (Exception $exc){
			return JsonResponse::create(array('message' => "No se pudo guardar el cliente", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
		}
    }

    public function update(Request $request,$id)
    {
    	try{
    		$data = $request->all();
    		$date = Carbon::now();
    		
    		$cierre = Cierrecaja::find($id);
            $cierre->total = $data['total'];
    		$cierre->fecha = $date->toDateString();
            $cierre->idusuario = $data['idusuario'];
    		$cierre->save();

            return JsonResponse::create(array('std' => 1,'message' => "Modificado Correctamente"), 200);

    	}catch (Exception $exc){
			return JsonResponse::create(array('message' => "No se pudo guardar el cliente", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
		}
    }

}

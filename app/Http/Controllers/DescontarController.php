<?php

namespace App\Http\Controllers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Descontar;
use Carbon\Carbon;
use DB;

class DescontarController extends Controller
{

    public function sumadescuento($id){
        $date = Carbon::now();
        $fecha = $date->toDateString();
        return Descontar::select('*')
                        ->where('idusuario','=',$id)
                        ->where('fechaingreso','=',$fecha)
                        ->sum('valor');
    }

	public function verDiario($idusuario){
		$date = Carbon::now();
		return Descontar::select('descontar.*','usuario.nombre_apellido')
					->join('usuario','usuario.id','=','descontar.idusuario')
					->where('descontar.idusuario','=',$idusuario)
					->where('descontar.fechaingreso','=',$date->toDateString())
					->get();
	}

    public function store(Request $request){
    	try{
    		
    		$date = Carbon::now();
			$data = $request->all();
    		$descontar = new Descontar();
    		$descontar->valor = $data['valor'];
    		$descontar->fechaingreso =  $date->toDateString();
    		$descontar->hora = $date->toTimeString();
    		$descontar->idusuario = $data['idusuario'];
    		$descontar->save();

    		return JsonResponse::create(array('std' => 1,'message' => "Guardado Correctamente"), 200);
    		
    	}catch (Exception $exc){
			return JsonResponse::create(array('message' => "No se pudo guardar el cliente", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
		}
    }

    public function update(Request $request, $id){
        try{

            $date = Carbon::now();
			$data = $request->all();
    		$descontar = Descontar::find($id);
    		$descontar->valor = $data['valor'];
    		$descontar->fechaingreso =  $date->toDateString();
    		$descontar->hora = $date->toTimeString();
    		$descontar->idusuario = $data['idusuario'];
    		$descontar->save();

            return JsonResponse::create(array('std' => 1,'message' => "Modificado Correctamente"), 200);
            
        } catch(Exception $ex){
            return JsonResponse::create(array('message' => "No se pudo Modificar el Grupo", "exception"=>$exc->getMessage(), 
                "request" =>json_encode($data)), 401);
        }
    }
}

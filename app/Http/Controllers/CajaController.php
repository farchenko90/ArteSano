<?php

namespace App\Http\Controllers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Caja;
use DB;
use App\Usuario;
use Carbon\Carbon;

class CajaController extends Controller
{	

    public function sumacaja($id){
        return Caja::select('*')
                    ->where('idusuario','=',$id)
                    ->sum('valor');
    }

	public function index()
    {
        return Caja::All();
    }

    public function caja($id){
    	return Caja::select('caja.*','usuario.nombre_apellido')
    				->join('usuario','usuario.id','=','caja.idusuario')
    				->where('caja.idusuario','=',$id)
    				->get();
    }

    public function store(Request $request){
    	try{
    		$data = $request->all();
    		$user = Caja::select('*')
    					->where('idusuario','=',$data['idusuario'])
    					->first();
    		if($user == null){
    			$data = $request->all();
	    		$caja = new Caja();
	    		$caja->valor = $data['valor'];
	    		$caja->idusuario = $data['idusuario'];
	    		$caja->save();

	    		return JsonResponse::create(array('std' => 1,'message' => "Credito Guardado Correctamente"), 200);
    		}else{
    			return JsonResponse::create(array('std' => 2,'message' => "Ya se registro un precio de caja menor"), 200);
    		}

    	}catch (Exception $exc){
			return JsonResponse::create(array('message' => "No se pudo guardar el cliente", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
		}
    }

    public function update(Request $request, $id){
        try{

            $data = $request->all();
            $caja = Caja::find($id);
            $caja->valor = $data['valor'];
    		$caja->idusuario = $data['idusuario'];
    		$caja->save();

            return JsonResponse::create(array('std' => 1,'message' => "Modificado Correctamente"), 200);
            
        } catch(Exception $ex){
            return JsonResponse::create(array('message' => "No se pudo Modificar el Grupo", "exception"=>$exc->getMessage(), 
                "request" =>json_encode($data)), 401);
        }
    }

}

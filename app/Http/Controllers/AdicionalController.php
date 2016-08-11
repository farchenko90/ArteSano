<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests;

use App\Adicional;
use DB;

class AdicionalController extends Controller
{

	public function index()
    {
        return Adicional::All();
    }

    public function show($id)
    {
        return Adicional::find($id);
    }

    public function adicional($idmateria){
    	return Adicional::select('adicionale.*','materia.nombre as materia')
    			->join('materia','materia.id','=','adicionale.idmateria')
                ->where('materia.campo','=','RESTAURANTE')
                ->where('adicionale.idmateria','=',$idmateria)
    			->get();
    }

    public function getAdicionRestaurante(){
        return Adicional::select('adicionale.*','materia.nombre as materia')
                ->join('materia','materia.id','=','adicionale.idmateria')
                ->where('materia.campo','=','RESTAURANTE')
                ->get();
    }

    public function adicionalheladeria(){
        return Adicional::select('adicionale.*','materia.nombre as materia')
                ->join('materia','materia.id','=','adicionale.idmateria')
                ->where('materia.campo','=','HELADERIA')
                ->get();
    }

    public function store(Request $request)
    {
    	try{

    		$data = $request->all();
    		$adicional = new Adicional();
    		$adicional->nombre = $data['adicional'];
    		$adicional->idmateria = $data['idmateria'];
            $adicional->valor = $data['valor'];
    		$adicional->save();
    		return JsonResponse::create(array('std' => 1,'message' => "Producto Guardado Correctamente", "request" =>$data), 200);

    	}catch (Exception $exc){
			return JsonResponse::create(array('message' => "No se pudo guardar el cliente", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
		}
    }

    public function update(Request $request,$id)
    {
    	try{

    		$data = $request->all();
    		$adicional = Adicional::find($id);
    		$adicional->nombre = $data['adicional'];
    		$adicional->idmateria = $data['idmateria'];
            $adicional->valor = $data['valor'];
    		$adicional->save();
            
    		return JsonResponse::create(array('std' => 1,'message' => "Producto Modificado Correctamente", "request" =>$data), 200);

    	}catch (Exception $exc){
			return JsonResponse::create(array('message' => "No se pudo guardar el cliente", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
		}
    }

}

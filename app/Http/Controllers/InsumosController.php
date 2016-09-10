<?php

namespace App\Http\Controllers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\Http\Requests;

use App\Insumos;
use App\Precioproducto;

class InsumosController extends Controller
{
    public function store(Request $request){
    	try{
    		$data = $request->all();
    		$insumo = new Insumos();
    		$insumo->ingredientes = $data['ingredientes'];
    		$insumo->peso = $data['peso'];
    		$insumo->precio = $data['precio'];
    		$insumo->idproducto = $data['idproducto'];
    		$insumo->save();

            $existe = Precioproducto::select('*')
                        ->where('idproducto','=',$data['idproducto'])
                        ->first();

            if($existe == null){
                $precio = new Precioproducto();
                $precio->cantidad = 10;
                $precio->idproducto = $data['idproducto'];
                $precio->save();
            }

    		return JsonResponse::create(array('std' => 1,'message' => "Insumos Guardado Correctamente"), 200);

    	}catch (Exception $exc){
			return JsonResponse::create(array('message' => "No se pudo guardar el cliente", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
		}
    }

    public function update(Request $request, $id){
        try{

            $data = $request->all();
            $insumo = Insumos::find($id);
            $insumo->ingredientes = $data['ingredientes'];
            $insumo->peso = $data['peso'];
            $insumo->precio = $data['precio'];
            $insumo->save();

            return JsonResponse::create(array('std' => 1,'message' => "Insumos Guardado Correctamente", "request" =>$data), 200);
            
        }catch(Exception $ex){
            return JsonResponse::create(array('message' => "No se pudo Modificar el Grupo", "exception"=>$exc->getMessage(), 
                "request" =>json_encode($data)), 401);
        }
    }

    public function insumosxproducto($idproducto){
    	return Insumos::select('insumos.*','producto.nombre')
    					->join('producto','producto.id','=','insumos.idproducto')
    					->where('insumos.idproducto','=',$idproducto)
    					->get();
    }

    public function totalpeso($idproducto){
        $peso = Insumos::select('*')
                        ->where('idproducto','=',$idproducto)
                        ->sum('peso');
        return round($peso,PHP_ROUND_HALF_UP);
    }

    public function totalprecio($idproducto){
        return Insumos::select('*')
                        ->where('idproducto','=',$idproducto)
                        ->sum('precio');
    }

}

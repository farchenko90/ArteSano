<?php

namespace App\Http\Controllers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Inventario;
use DB;

class InventarioController extends Controller
{
    
    public function inventario_usuario($id){
        return Inventario::select('inventario.*','producto.nombre','producto.valor','producto.imagen','producto.valor')
                    ->join('producto','producto.id','=','inventario.idproducto')
                    ->where('inventario.idusuario','=',$id)
                    ->get();
    }

    public function ver_inventario($idproducto,$idusuario){
        return Inventario::select('cantidad')
                    ->where('idproducto','=',$idproducto)
                    ->where('idusuario','=',$idusuario)
                    ->first();
    }

    public function store(Request $request){
    	try{
    		
    		$data = $request->all();
    		$user = Inventario::select('*')
    					->where('idproducto','=',$data['idproducto'])
    					->where('idusuario','=',$data['idusuario'])
    					->first();
    		if($user == null){
    			$data = $request->all();
	    		$inventario = new Inventario();
	    		$inventario->cantidad = $data['cantidad'];
	    		$inventario->idusuario = $data['idusuario'];
	    		$inventario->idproducto = $data['idproducto'];
	    		$inventario->save();

	    		return JsonResponse::create(array('std' => 1,'message' => "Guardado Correctamente"), 200);
    		}else{
    			return JsonResponse::create(array('std' => 2,'message' => "Ya tiene registrado este producto"), 200);
    		}

    	}catch (Exception $exc){
			return JsonResponse::create(array('message' => "No se pudo guardar el cliente", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
		}
    }

    public function update(Request $request, $id){
        try{

            $data = $request->all();
            $inventario = Inventario::find($id);
            $inventario->cantidad = $data['cantidad'];
            $inventario->idusuario = $data['idusuario'];
            $inventario->idproducto = $data['idproducto'];
            $inventario->save();

            return JsonResponse::create(array('std' => 1,'message' => "Guardado Correctamente", "request" =>$data), 200);
            
        }catch(Exception $ex){
            return JsonResponse::create(array('message' => "No se pudo Modificar el Grupo", "exception"=>$exc->getMessage(), 
                "request" =>json_encode($data)), 401);
        }
    }

    public function reducircantidad($idproducto,$idusuario,$cantidad){
        $datos = Inventario::select('inventario.*','producto.nombre')
                        ->join('producto','producto.id','=','inventario.idproducto')
                        ->where('idproducto','=',$idproducto)
                        ->where('idusuario','=',$idusuario)
                        ->first();
        if($datos == null){
            return JsonResponse::create(array('std' => 1,'msg' => "No se encontro"), 200);
        }else{
            if($datos->cantidad <= 0){
                return JsonResponse::create(array('std' => 2,'message' => "El producto $datos->nombre se encuentra agotado y no se registrara el pedido"), 200);
            }else{
                $cant = $datos->cantidad - $cantidad;
                if($cant<0){
                    $can = 0;
                }
                $inventario = Inventario::find($datos->id);
                $inventario->cantidad = $can;
                $inventario->save();
                return JsonResponse::create(array('std' => 3,'message' => "Hecho"), 200);
            }
        }

    }

    public function eliminar_inventario($idproducto,$idusuario){
        return Inventario::select('*')
                    ->where('idproducto','=',$idproducto)
                    ->where('idusuario','=',$idusuario)
                    ->delete();
        //return JsonResponse::create(array('std' => 2,'message' => "Se ha elimiindo Correctamente","request" =>$inv), 200);
    }

}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests;

use App\Producto;

use DB;

class ProductoController extends Controller
{
    
    public function index()
    {
        return Producto::All();
    }

    public function show($id)
    {
        return Producto::find($id);
    }

    public function Allproductorestaurante(){
        return Producto::select('producto.*','materia.nombre as materia','usuario.nombre_apellido')
                    ->join('materia','producto.idmateria','=','materia.id')
                    ->join('usuario','usuario.id','=','producto.idusuario')
                    ->where('producto.tipo','=','RESTAURANTE')
                    ->get();
        
    }

    public function productorestaurante($id){
        return Producto::select('producto.*','materia.nombre as materia','usuario.nombre_apellido')
                    ->join('materia','producto.idmateria','=','materia.id')
                    ->join('usuario','usuario.id','=','producto.idusuario')
                    ->where('producto.tipo','=','RESTAURANTE')
                    ->where('producto.idusuario','=',$id)
                    ->get();
        
    }

    public function productopanaderia(){
        return Producto::select('producto.*','materia.nombre as materia')
                    ->join('materia','producto.idmateria','=','materia.id')
                    ->where('producto.tipo','=','PANADERIA')
                    ->get();
        
    }

    public function productoheladeria(){
        return Producto::select('producto.*','materia.nombre as materia')
                    ->join('materia','producto.idmateria','=','materia.id')
                    ->where('producto.tipo','=','HELADERIA')
                    ->get();
        
    }

    public function ver_Galeria($id){
        return Producto::select('producto.nombre','producto.imagen','producto.estadogaleria','materia.nombre as materia')
                ->join('materia','producto.idmateria','=','materia.id')
                ->where('idmateria','=',$id)
                ->where('estadogaleria','=','ACTIVO')
                ->get();
    }

    public function producto_materia($id){
        return Producto::select('producto.*')
                    ->where('idmateria','=',$id)
                    ->where('estado','=','ACTIVO')
                    ->get();
    }

    public function producto_materia_restaurante($iduser,$id){
        return Producto::select('producto.*')
                    ->where('idmateria','=',$id)
                    ->where('estado','=','ACTIVO')
                    ->where('producto.idusuario','=',$iduser)
                    ->get();
    }

    
    public function store(Request $request){
    	try{

    		$data = $request->all();
    		$producto = new Producto();
    		$producto->nombre = $data['nombre'];
            $producto->valor = $data['valor'];
    		$producto->estado = 'ACTIVO';
    		$producto->idmateria = $data['idmateria'];
            $producto->tipo = $data['tipo'];
            $producto->idusuario = $data['idusuario'];
    		$producto->save();

    		$producto->imagen = "http://".$_SERVER['HTTP_HOST'].'/img/producto/'.$producto->id.".jpg";
            $producto->save();
            
            if ($request->hasFile('imagen')) {
                $request->file('imagen')->move("../img/producto/",$producto->id.'.jpg');
            }

    		return JsonResponse::create(array('std' => 1,'message' => "Producto Guardado Correctamente", "request" =>$data), 200);

    	}catch (Exception $exc){
			return JsonResponse::create(array('message' => "No se pudo guardar el cliente", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
		}
    }

    public function update(Request $request, $id){
        try{

            $data = $request->all();
            $producto = Producto::find($id);
            $producto->nombre = $data['nombre'];
            $producto->valor = $data['valor'];
            $producto->idmateria = $data['idmateria'];
            $producto->save();

            return JsonResponse::create(array('std' => 1,'message' => "Producto Guardado Correctamente", "request" =>$data), 200);
            
        }catch(Exception $ex){
            return JsonResponse::create(array('message' => "No se pudo Modificar el Grupo", "exception"=>$exc->getMessage(), 
                "request" =>json_encode($data)), 401);
        }
    }

    public function cambiarestadogaleria(Request $request, $id){
        try{

            $data = $request->all();
            $producto = Producto::find($id);
            $producto->estadogaleria = $data['estadogaleria'];
            $producto->save();

            return JsonResponse::create(array('std' => 1,'message' => "Producto Modificado Correctamente", "request" =>$data), 200);
            
        }catch(Exception $ex){
            return JsonResponse::create(array('message' => "No se pudo Modificar el Grupo", "exception"=>$exc->getMessage(), 
                "request" =>json_encode($data)), 401);
        }
    }

    public function storeImage(Request $request){
        
        try {
            $data = $request->all();
            
            $id = $data["id"];
            
            $producto = Producto::find($id);
            $producto->imagen = "http://".$_SERVER['HTTP_HOST'].'/img/producto/'.$id.".jpg";
            $producto->save();
            
            
            if ($request->hasFile('imagen')) {
                $request->file('imagen')->move("../img/producto/", $id.".jpg");
                return JsonResponse::create(array('message' => "Imagen Guardada Correctamente","request"=>  json_encode($data)), 200);
            }
            return JsonResponse::create(array('message' => "Error al Guardar imagen","request"=>  json_encode($data)), 200);
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo guardar La imagen", "exception"=>$exc->getMessage()), 401);
        }
        
    }

    public function desactivar_producto(Request $request,$id){
        try{

            $data = $request->all();
            $producto = Producto::find($id);
            $producto->estado = $data['estado'];
            $producto->save();

            return JsonResponse::create(array('std' => 1,'message' => "Producto Modificado Correctamente", "request" =>$data), 200);
            
        }catch(Exception $ex){
            return JsonResponse::create(array('message' => "No se pudo Modificar el Grupo", "exception"=>$exc->getMessage(), 
                "request" =>json_encode($data)), 401);
        }
    }


}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use Crypt;

use App\Http\Requests;

use App\Usuario;
use App\Tipo_permiso;
use App\Permiso;

use DB;

class UsuarioController extends Controller
{
    
    public function store(Request $request){
		try{
			
			$data = $request->all();
			$user = new Usuario();
			$user->nombre_apellido  = $data['nombre_apellido'];
			$user->celular 			= $data['celular'];
			$user->correo 			= $data['correo'];
			$user->usuario 			= $data['usuario'];
			$user->contrasena		= Crypt::encrypt($data['contrasena']);
			$user->estado 			= 'ACTIVO';
			$user->modulo 			= $data['modulo'];
            $user->imagen           = "http://artesano.gpsarduino.com/img/perfil/ninja-cat.png";
			$user->idtipo			= $data['idtipo'];
            $user->idperfil         = $data['idperfil'];
			$user->save();

            $tipo = Permiso::select('id')
                        ->get();
            if($data['idtipo'] == 1){
                foreach ($tipo as $row) {
                    $tipo_permiso = new Tipo_permiso();
                    $tipo_permiso->idpermiso = $row->id;
                    $tipo_permiso->idusuario = $user->id;
                    $tipo_permiso->save();
                }
            }else if($data['idtipo'] == 2){
                $tipo1 = Permiso::select('id','nombre')
                        ->where('nombre','<>','INICIO')
                        ->get();
                foreach ($tipo1 as $row) {
                    $tipo_permiso = new Tipo_permiso();
                    $tipo_permiso->idpermiso = $row->id;
                    $tipo_permiso->idusuario = $user->id;
                    $tipo_permiso->save();
                }
            }

			return JsonResponse::create(array('std' => 1,'message' => "Usuario Guardado Correctamente", "request" =>$data), 200);	

		}catch (Exception $exc){
			return JsonResponse::create(array('message' => "No se pudo guardar el cliente", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
		}
	}

	public function login(Request $request){
		try{
            $data = $request->all();
            $user = Usuario::select('nombre_apellido','celular','correo','usuario','id','contrasena')
                                ->where('usuario',$data['user'])
                                ->first();
            if (empty($user)){
                return JsonResponse::create(array('message' => "1", "request" =>'Usuario no existe en el Sistema'), 200);
            }   

            $clave =   Crypt::decrypt($user["contrasena"]);

            $usuario = DB::select("Select usuario.nombre_apellido,usuario.celular,usuario.correo,usuario.usuario,GROUP_CONCAT(tipo_permiso.idpermiso SEPARATOR ',') as permisos,usuario.id,tipo.nombre as tipouser,usuario.idperfil from usuario inner join tipo_permiso on tipo_permiso.idusuario = usuario.id 
                inner join tipo on tipo.id = usuario.idtipo 
                where usuario.id = ".$user['id']);

            
            
            if($data['clave'] != $clave){
                return JsonResponse::create(array('message' => "2", "request" =>'Clave Incorrecta'), 200);
            }

            return JsonResponse::create(array('message' => "3","admin" =>$usuario), 200);

        }catch(Exception $ex){
            return JsonResponse::create(array('message' => "No se puedo autenticar el usuario", "request" =>json_encode($data)), 401);
        }
	}

    public function index()
    {
        return Usuario::All();
    }

    public function show($id)
    {
        return Usuario::find($id);
    }

    public function update(Request $request, $id){
        try{

            $data = $request->all();
            $user = Usuario::find($id);
            $user->nombre_apellido  = $data['nombre_apellido'];
            $user->celular          = $data['celular'];
            $user->correo           = $data['correo'];
            $user->usuario          = $data['usuario'];
            $user->idtipo           = $data['idtipo'];
            $user->idperfil         = $data['idperfil'];
            $user->save();

            return JsonResponse::create(array('std' => 1,'message' => "Usuario Modificado Correctamente", "request" =>$data), 200);
            
        } catch(Exception $ex){
            return JsonResponse::create(array('message' => "No se pudo Modificar el Grupo", "exception"=>$exc->getMessage(), 
                "request" =>json_encode($data)), 401);
        }
    }

    public function imagenperfil(Request $request){
        
        try {
            $data = $request->all();
            
            $id = $data["id"];
            
            $usuario = Usuario::find($id);
            $usuario->imagen = "http://".$_SERVER['HTTP_HOST'].'/img/perfil/'.$id.".jpg";
            $usuario->save();
            
            
            if ($request->hasFile('imagen')) {
                $request->file('imagen')->move("../img/perfil/", $id.".jpg");
                return JsonResponse::create(array('message' => "Perfil Actualizado Correctamente","request"=>  json_encode($data)), 200);
            }
            return JsonResponse::create(array('message' => "Error al Guardar imagen","request"=>  json_encode($data)), 200);
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo guardar La imagen", "exception"=>$exc->getMessage()), 401);
        }
        
    }

}

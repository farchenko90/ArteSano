<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests;
use App\Credito;
use App\Usuario;
use App\Inventario;
use DB;
use Carbon\Carbon;
use App\Venta;

class CreditoController extends Controller
{

	public function index()
    {
        return Credito::All();
    }

    public function store(Request $request){
    	try{

    		$date = Carbon::now();
    		$data = $request->all();
            //$idproducto = $data['idproducto'];
    		$credito = new Credito();
    		$credito->fecha = $date->toDateString();
            $credito->hora = $date->toTimeString();
    		$credito->total = $data['total'];
    		$credito->ingreso = $data['ingreso'];
    		$credito->cambio = $data['cambio'];
            $credito->formapago = $data['formapago'];
    		$credito->idusuario = $data['idusuario'];
    		$credito->save();

            for($i=0;$i<count($data['producto']);$i++){
                $inv = Inventario::select('cantidad','id')
                            ->where('idproducto','=',$data['producto'][$i]['id'])
                            ->where('idusuario','=',$data['idusuario'])
                            ->first();
                if($inv != null){
                    $can = $data['producto'][$i]['cantidad'];
                    $cantidad = $inv->cantidad - $can;
                    $inventario = Inventario::find($inv->id);
                    $inventario->cantidad = $cantidad;
                    $inventario->save();
                }

                $venta = new Venta();
                $venta->productos = $data['producto'][$i]['productos'];
                $venta->valor = $data['producto'][$i]['valor'];
                $venta->cantidad = $data['producto'][$i]['cantidad'];
                $venta->fecha = $date->toDateString();
                $venta->idproducto = $data['producto'][$i]['id'];
                $venta->idusuario = $data['idusuario'];
                $venta->idcredito = $credito->id;
                $venta->save();
            }

            

    		return JsonResponse::create(array('std' => 1,'message' => "Credito Guardado Correctamente", "request" =>$data), 200);

    	}catch (Exception $exc){
			return JsonResponse::create(array('message' => "No se pudo guardar el cliente", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
		}
    }

    public function totaldepositosdiariocredito(){
        $date = Carbon::now();
        $fecha = $date->toDateString();
        $usuario = Usuario::select('id')
                    ->where('estado','=','ACTIVO')
                    ->get();
            for ($i=0;$i<count($usuario);$i++) {
                $credito = DB::select(DB::raw("select credito.fecha,sum(credito.total) as total,usuario.id,usuario.nombre_apellido
                    from credito 
                    inner join usuario on usuario.id = credito.idusuario
                    where credito.formapago = 'CONTADO' and credito.fecha = '$fecha' and credito.idusuario = ".$usuario[$i]->id.""));
                $total[$i] = $credito;
            }
            return $total;
    }

    public function totaldepositoscreditoxfecha($finicial,$ffinal){
        $usuario = Usuario::select('id')
                    ->where('estado','=','ACTIVO')
                    ->get();
            for ($i=0;$i<count($usuario);$i++) {
                $credito = DB::select(DB::raw("select credito.fecha,sum(credito.total) as total,credito.idusuario,usuario.nombre_apellido  
                    from credito 
                    inner join usuario on usuario.id = credito.idusuario 
                    where credito.formapago = 'CONTADO' and credito.idusuario = ".$usuario[$i]->id." and 
                    credito.fecha BETWEEN '$finicial' and '$ffinal'"));
                $total[$i] = $credito;
                
            }
            return $total;
    }

    public function totaldepositosdiariotarjeta(){
        $date = Carbon::now();
        $fecha = $date->toDateString();
        $usuario = Usuario::select('id')
                    ->where('estado','=','ACTIVO')
                    ->get();
            for ($i=0;$i<count($usuario);$i++) {
                $credito = DB::select(DB::raw("select credito.fecha,sum(credito.total) as total,credito.idusuario,usuario.nombre_apellido from credito 
                    inner join usuario on usuario.id = credito.idusuario
                    where credito.formapago = 'CREDITO' and credito.fecha = 
                    '$fecha' and credito.idusuario = ".$usuario[$i]->id));
                $total[$i] = $credito;
                
            }
            return $total;
    }

    public function totaldepositostarjetaxfecha($finicial,$ffinal){
        $usuario = Usuario::select('id')
                    ->where('estado','=','ACTIVO')
                    ->get();
            for ($i=0;$i<count($usuario);$i++) {
                $credito = DB::select(DB::raw("select credito.fecha,sum(credito.total) as total,credito.idusuario,usuario.nombre_apellido 
                    from credito 
                    inner join usuario on usuario.id = credito.idusuario 
                    where credito.formapago = 'CREDITO' and credito.idusuario = ".$usuario[$i]->id." and 
                    credito.fecha BETWEEN '$finicial' and '$ffinal'"));
                $total[$i] = $credito;
                
            }
            return $total;
    }

    public function diariocreditopanaderia($id){
        $date = Carbon::now();
        $fecha = $date->toDateString();
        return $credito = DB::select(DB::raw("select credito.fecha,sum(credito.total) as total,usuario.nombre_apellido from credito 
            inner join usuario on usuario.id = credito.idusuario 
            where credito.formapago = 'CONTADO' and credito.fecha = '$fecha' 
            and credito.idusuario = ".$id));
    }

    public function diariotarjetapanaderia($id){
        $date = Carbon::now();
        $fecha = $date->toDateString();
        return $credito = DB::select(DB::raw("select credito.fecha,sum(credito.total) as total,usuario.nombre_apellido from credito 
            inner join usuario on usuario.id = credito.idusuario 
            where credito.formapago = 'CREDITO' and credito.fecha = '$fecha' 
            and credito.idusuario = ".$id));
    }

    public function contadopanaderiafecha($id,$finicial,$ffinal){
        return $credito = DB::select(DB::raw("select credito.fecha,sum(credito.total) as total,usuario.nombre_apellido from credito 
            inner join usuario on usuario.id = credito.idusuario 
            where credito.formapago = 'CONTADO' and 
            credito.fecha BETWEEN '$finicial' and '$ffinal'  
            and credito.idusuario = ".$id));
    }

    public function creditopanaderiafecha($id,$finicial,$ffinal){
        return $credito = DB::select(DB::raw("select credito.fecha,sum(credito.total) as total,usuario.nombre_apellido from credito 
            inner join usuario on usuario.id = credito.idusuario 
            where credito.formapago = 'CREDITO' and 
            credito.fecha BETWEEN '$finicial' and '$ffinal'  
            and credito.idusuario = ".$id));
    }

    public function tickets_diario($idusuario){
        $date = Carbon::now();
        $credito = Credito::select('credito.*','usuario.nombre_apellido')
                    ->join('usuario','usuario.id','=','credito.idusuario')
                    ->where('credito.idusuario','=',$idusuario)
                    ->where('credito.fecha','=',$date->toDateString())
                    ->orderBy('credito.id', 'desc')
                    ->get();
        for($i=0;$i<count($credito);$i++){
            $venta = Venta::select('venta.id','venta.valor','venta.cantidad','producto.nombre',
                                    'producto.valor as unitario')
                            ->join('producto','producto.id','=','venta.idproducto')
                            ->where('venta.idcredito','=',$credito[$i]->id)
                            ->get();
            $credito[$i]['venta'] = $venta;
        }
        return $credito;
    }

}

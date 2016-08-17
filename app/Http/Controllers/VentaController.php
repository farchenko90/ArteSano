<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Venta;

use DB;

use Carbon\Carbon;

class VentaController extends Controller
{
    public function ventaxfecha($finicial,$idusuario){
    	/*$venta = Venta::select('venta.idproducto','venta.cantidad','producto.nombre')
    				->join('producto','producto.id','=','venta.idproducto')
    				->where('venta.fecha','=',$finicial)
    				->where('venta.idusuario','=',$idusuario)
    				->groupBy('venta.idproducto')
    				->get();
    		for($i=0;$i<count($venta);$i++){
    			if($venta[$i]->idproducto)
    		}*/

        $venta = DB::select(DB::raw("Select venta.idproducto,venta.cantidad,producto.nombre,
                        sum(venta.cantidad) as suma,materia.nombre as materia,
                        usuario.nombre_apellido from venta
                        inner join usuario on usuario.id = venta.idusuario
                        inner join producto on producto.id = venta.idproducto 
                        inner join materia on materia.id = producto.idmateria 
                        where venta.fecha = '$finicial' and venta.idusuario = $idusuario 
                        group By venta.idproducto"));

    	return $venta;
    }

    public function cantidadmateria($finicial,$idusuario){
        $venta = DB::select(DB::raw("Select count(venta.idproducto) as value,
                        materia.color,materia.highlight,materia.nombre as label
                        from venta
                        inner join producto on producto.id = venta.idproducto 
                        inner join materia on materia.id = producto.idmateria 
                        where venta.fecha = '$finicial' and venta.idusuario = $idusuario 
                        group By materia.nombre"));

        return $venta;
    }


    public function ticket_perdido($iduser){
        $date = Carbon::now();
        return Venta::select('venta.id','venta.valor','venta.cantidad','venta.fecha','producto.nombre','credito.total','credito.ingreso','credito.cambio','usuario.nombre_apellido')
                        ->join('producto','producto.id','=','venta.idproducto')
                        ->join('credito','credito.id','=','venta.idcredito')
                        ->join('usuario','usuario.id','=','venta.idusuario')
                        ->where('venta.idusuario','=',$iduser)
                        ->where('venta.fecha','=',$date->toDateString())
                        ->get();
    }


}

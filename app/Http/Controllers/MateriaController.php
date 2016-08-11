<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Materia;

class MateriaController extends Controller
{
    public function index()
    {
        return Materia::All();
    }

    public function materiarestaurante(){
    	return Materia::select('*')
    			->where('campo','=','RESTAURANTE')
    			->get();
    }

    public function materiapanaderia(){
    	return Materia::select('*')
    			->where('campo','=','PANADERIA')
    			->get();
    }

    public function materiaheladeria(){
        return Materia::select('*')
                ->where('campo','=','HELADERIA')
                ->get();
    }
}

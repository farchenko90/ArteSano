<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Tipo_perfil;

class Tipo_perfilController extends Controller
{
    public function index()
    {
        return Tipo_perfil::All();
    }
}

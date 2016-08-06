<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

include 'Routes/routesUsuario.php';
include 'Routes/routesTipo.php';
include 'Routes/routesTipo_permiso.php';
include 'Routes/routesTipo_perfil.php';
include 'Routes/routesMateria.php';
include 'Routes/routesProducto.php';
include 'Routes/routesAdicional.php';
include 'Routes/routesCredito.php';
include 'Routes/routesCaja.php';
include 'Routes/routesDescontar.php';
include 'Routes/routesCierrecaja.php';
include 'Routes/routesInventario.php';
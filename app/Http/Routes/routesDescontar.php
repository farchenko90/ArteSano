<?php 
	
	Route::get('api/ver_descuento/{idusuario}','DescontarController@verDiario');

	Route::get('api/descuento/{id}','DescontarController@sumadescuento');

	Route::resource('api/descontar', 'DescontarController');
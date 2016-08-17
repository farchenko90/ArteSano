<?php 
	
	Route::get('api/cierre_caja/{idusuario}','CierrecajaController@cierrecajadiario');

	Route::resource('api/cierrecaja', 'CierrecajaController');
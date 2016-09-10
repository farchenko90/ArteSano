<?php 

	Route::get('api/detallado/{finicial}/{idusuario}','VentaController@ventaxfecha');

	Route::get('api/detalle/materia/{finicial}/{idusuario}','VentaController@cantidadmateria');	

	Route::get('api/ticket/usuario/{iduser}','VentaController@ticket_perdido');

	Route::resource('api/venta', 'VentaController');
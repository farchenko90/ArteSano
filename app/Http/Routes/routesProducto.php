<?php 
	
	Route::get('api/producto/materia','ProductoController@productorestaurante');

	Route::get('api/producto/panaderia','ProductoController@productopanaderia');

	Route::get('api/producto/heladeria','ProductoController@productoheladeria');

	Route::get('api/galeria/{id}','ProductoController@ver_Galeria');

	Route::post("api/producto/imagen","ProductoController@storeImage");

	Route::get('api/imagen/materia/{id}','ProductoController@producto_materia');

	Route::put('api/estado/galeria/{id}','ProductoController@cambiarestadogaleria');	

	Route::put('api/cambiar/estado/{id}','ProductoController@desactivar_producto');	

	Route::resource('api/producto', 'ProductoController');
<?php
	
	Route::get('api/usuario/{idusuario}/inventario','InventarioController@inventario_usuario');

	Route::put('api/restarcantidad/{idproducto}/{idusuario}/{cantidad}','InventarioController@reducircantidad');

	Route::get('api/producto/{idproducto}/usuario/{idusuario}','InventarioController@ver_inventario');

	Route::delete('api/eliminar/inventario/{idproducto}/{idusuario}','InventarioController@eliminar_inventario');

	Route::resource('api/inventario', 'InventarioController');

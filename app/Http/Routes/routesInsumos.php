<?php 
	
	Route::get('api/producto/{idproducto}/insumos','InsumosController@insumosxproducto');

	Route::get('api/producto/{idproducto}/peso','InsumosController@totalpeso');	

	Route::get('api/producto/{idproducto}/precio','InsumosController@totalprecio');	

	Route::resource('api/insumos', 'InsumosController');
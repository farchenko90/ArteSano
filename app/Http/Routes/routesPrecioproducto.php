<?php 
	
	Route::get('api/producto/{idproducto}/precioproducto','PrecioproductoController@precioproducto');

	Route::resource('api/precioproducto', 'PrecioproductoController');
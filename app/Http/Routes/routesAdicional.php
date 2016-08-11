<?php 
	
	Route::get('api/adicion/{idmateria}','AdicionalController@adicional');

	Route::get('api/heladeria/adicion','AdicionalController@adicionalheladeria');

	Route::get('api/restaurante/adicion','AdicionalController@getAdicionRestaurante');

	Route::resource('api/adicional', 'AdicionalController');
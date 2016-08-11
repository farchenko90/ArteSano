<?php 
	
	Route::get('api/totalcaja/{id}','CajaController@sumacaja');

	Route::get('api/cajamenor/{id}','CajaController@caja');

	Route::resource('api/caja', 'CajaController');
<?php 
	
	Route::get('api/adicion','AdicionalController@adicional');

	Route::get('api/adicion/heladeria','AdicionalController@adicionalheladeria');

	Route::resource('api/adicional', 'AdicionalController');
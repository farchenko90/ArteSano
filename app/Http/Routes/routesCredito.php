<?php

	Route::get('api/credito/diario','CreditoController@totaldepositosdiariocredito');

	Route::get('api/credito/fecha/{finicial}/{ffinal}','CreditoController@totaldepositoscreditoxfecha');

	Route::get('api/tarjeta/diario','CreditoController@totaldepositosdiariotarjeta');

	Route::get('api/tarjeta/fecha/{finicial}/{ffinal}','CreditoController@totaldepositostarjetaxfecha');

	Route::get('api/contado/panaderia/diario/{id}','CreditoController@diariocreditopanaderia');

	Route::get('api/credito/panaderia/diario/{id}','CreditoController@diariotarjetapanaderia');

	Route::get('api/fecha/contado/{id}/{finicial}/{ffinal}','CreditoController@contadopanaderiafecha');

	Route::get('api/fecha/credito/{id}/{finicial}/{ffinal}','CreditoController@creditopanaderiafecha');

	Route::get('api/tickets/usuario/{idusuario}','CreditoController@tickets_diario');

	Route::resource('api/credito', 'CreditoController');
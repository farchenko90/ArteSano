<?php 
	
	Route::post('api/login','UsuarioController@login');

	Route::post("api/perfil/imagen","UsuarioController@imagenperfil");

	Route::resource('api/usuario', 'UsuarioController');
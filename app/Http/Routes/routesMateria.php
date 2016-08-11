<?php 

	Route::get('api/restaurante/materia','MateriaController@materiarestaurante');

	Route::get('api/restaurante/panaderia','MateriaController@materiapanaderia');

	Route::get('api/restaurante/heladeria','MateriaController@materiaheladeria');	

	Route::resource('api/materia', 'MateriaController');
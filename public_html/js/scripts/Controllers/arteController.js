app.controller('arteController', function ($scope,arteService) {

	$scope.arrayGaleria = [];
	$scope.Imagen;

	galeria(11);

	$scope.Artesano = {
		usuario: "",
		clave: ""
	};

	function validar(){
		if($scope.Artesano.usuario || $scope.Artesano.clave)
			return true;
		else 
			return false;
	}

	$scope.ingresar = function(){
		if(validar()){
			var object = {
	            user: 	$scope.Artesano.usuario,
	            clave: 	$scope.Artesano.clave
	        };
	        var promisePost = arteService.post(object);
	        promisePost.then(function (d) {
	            
	            if(d.data.message == 3){
	            	//alert(JSON.stringify(d.data.admin))
	            	if(d.data.admin[0].idperfil == 1){
	            		sessionStorage.setItem("usuario","");
                    	session.setUsuario(JSON.stringify(d.data.admin));
	            		location.href = rutasesion+"/menu.html";
	            	}
	            	if(d.data.admin[0].idperfil == 3){
	            		sessionStorage.setItem("usuario","");
                    	session.setUsuario(JSON.stringify(d.data.admin));
	            		location.href = rutasesion+"/menupanaderia.html";
	            	}
	            	if(d.data.admin[0].idperfil == 2){
	            		sessionStorage.setItem("usuario","");
                    	session.setUsuario(JSON.stringify(d.data.admin));
	            		location.href = rutasesion+"/menuheladeria.html";
	            	}
	            }else if(d.data.message == 1){
	            	Materialize.toast(JSON.stringify(d.data.request),2000,'rounded');
	            }else if(d.data.message == 2){
	            	Materialize.toast(JSON.stringify(d.data.request),2000,'rounded');
	            }
	            
	        }, function (err) {

	            if(err.status == 401){
	                alert(err.data.message);
	                console.log(err.data.exception);

	            }else{

	                alert("Error Al procesar Solicitud");

	            }

	            console.log("Some Error Occured "+ JSON.stringify(err));
	        });
		}else{
			Materialize.toast('Los campos son obligatorios', 2000, 'rounded')
		}
		
	}

	function galeria(id){
		var promiseGet = arteService.galeria(id); //The Method Call from service
    
        promiseGet.then(function (pl) {
        	$scope.arrayGaleria = pl.data;
        	$scope.Imagen = "images/bread_pastries.jpg";
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
	}

	$scope.galerias = function(id){
		var promiseGet = arteService.galeria(id); //The Method Call from service
    	
        promiseGet.then(function (pl) {
        	parallax(id);
        	$scope.arrayGaleria = pl.data;
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
	}

	function parallax(id){
		if(id == 8){
			$scope.Imagen = "images/bread_pastries.jpg";
		}
		if(id == 10){
			$scope.Imagen = "images/icecream.jpg";
		}
		if(id == 2){
			$scope.Imagen = "images/pizetta.jpg";
		}
		if(id == 3){
			$scope.Imagen = "images/fruitjuice.jpg";
		}
		if(id == 1){
			$scope.Imagen = "images/break.jpg";
		}
		if(id == 6){
			$scope.Imagen = "images/desayunos.jpg";
		}
		if(id == 5){
			$scope.Imagen = "images/tiendaartes.jpg";
		}
		if(id == 7){
			$scope.Imagen = "images/break.jpg";
		}
	}

});
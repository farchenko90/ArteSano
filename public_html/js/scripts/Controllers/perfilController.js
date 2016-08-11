app.controller('perfilController', function ($scope,perfilService) {

	$scope.Usuario = {};
	$scope.Id = session.getId();
	$scope.Idperfil = session.getIdperfil();
	$scope.tipouser = session.getTipouser();
	$scope.tipo;
    $scope.ruta;

	loadUsuario();
	initialize();

	function initialize(){
        $scope.user = {
            id:"",
			nombre_apellido: "",
			celular: "",
			correo: "",
			usuario: "",
			contrasena: "",
			contrasena1: "",
			estado: "",
            imagen:"",
			tipo: "",
            perfil: ""
		}
	}

	function loadUsuario(){
        
        var promiseGet = perfilService.getUsuario($scope.Id); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.Usuario = pl.data;
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
    }

    $scope.modificar = function(){
    	if($scope.tipouser == 'ADMINISTRADOR'){
			$scope.tipo = 1;
    	}else{
    		$scope.tipo = 2;
    	}
        var object = {
            nombre_apellido:     $scope.Usuario.nombre_apellido.toUpperCase(),
            celular:             $scope.Usuario.celular,
            correo:       	     $scope.Usuario.correo,
            usuario: 			 $scope.Usuario.usuario,
            idtipo:  			 $scope.tipo,
            idperfil: 			 $scope.Idperfil	
        }; 
        
        var promisePut  = perfilService.putUsuario($scope.Id, object);
        
        promisePut.then(function (d) {

            Materialize.toast(JSON.stringify(d.data.message),2000,'rounded');


        }, function (err) {
            
            if(err.status == 401){
                alert(err.data.message);
                console.log(err.data.exception);
                
            }else{
                
                alert("Error Al procesar Solicitud");
                
            }

            console.log("Some Error Occured "+ JSON.stringify(err));
        });
        
    };

    $scope.modificarImagen = function(){
        var formData = new FormData();
        formData.append('imagen',$scope.Usuario.imagen);
        formData.append('id', $scope.Id);
        
        var promisePost = perfilService.postperfil(formData);
        
        promisePost.then(function (d) {

            Materialize.toast(JSON.stringify(d.data.message),2000,'rounded');

        }, function (err) {
            
            if(err.status == 401){
                alert(err.data.message);
                console.log(err.data.exception);
                
            }else{
                
                alert("Error Al procesar Solicitud");
                
            }

            console.log(err);
        });
        
    };

});
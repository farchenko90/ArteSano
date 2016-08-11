app.controller('configuracionController', function ($scope,configuracionService) {

	$scope.arrayRestaurante = [];
    $scope.perfil = session.getIdperfil();
    $scope.Id = session.getId();
	loadRestaurante();
	initialize();

	function initialize(){
		$scope.restaurante = {
			estadogaleria: ""
		}
	}

	function loadRestaurante(){
        if($scope.perfil == 1){
            var promiseGet = configuracionService.getRestaurante($scope.Id); //The Method Call from service
    
            promiseGet.then(function (pl) {
                $scope.arrayRestaurante = pl.data;
            },
            
            function (errorPl) {
                console.log('failure loading Tipo', errorPl);
            });
        }else if($scope.perfil == 3){
            var promiseGet = configuracionService.getPanaderia(); //The Method Call from service
    
            promiseGet.then(function (pl) {
                $scope.arrayRestaurante = pl.data;
            },
            
            function (errorPl) {
                console.log('failure loading Tipo', errorPl);
            });
        }else if($scope.perfil == 2){
            var promiseGet = configuracionService.getHeladeria(); //The Method Call from service
    
            promiseGet.then(function (pl) {
                $scope.arrayRestaurante = pl.data;
            },
            
            function (errorPl) {
                console.log('failure loading Tipo', errorPl);
            });
        }
    }

    $scope.modificarestado = function(restaurante){
    	
    	var object = {
            estadogaleria:             restaurante.estadogaleria
        }; 
        var promisePut  = configuracionService.putRestaurante(restaurante.id, object);
        
        promisePut.then(function (d) {

        	loadRestaurante();
            
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

});
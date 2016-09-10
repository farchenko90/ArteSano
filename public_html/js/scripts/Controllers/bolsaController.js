app.controller('bolsaController', function ($scope,insumoService) {

	$scope.arrayBolsa = [];
	$scope.bolsa = {};
	init();
	loadBolsa();

	function init(){
		$scope.bolsa = {
			id: "",
			nombre: "",
			precio: "",
			paquete: ""
		}
	}

	function loadBolsa(){
        
        var promiseGet = insumoService.getbolsa(); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.arrayBolsa = pl.data;
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
    }

    $scope.nuevo = function(){
        $scope.title = "Guardar Bolsa";
        $scope.editMode = false;
        $scope.active = "";
        $('#modal1').openModal();
    }

    $scope.guardar = function(){

        var object = {
            nombre:             $scope.bolsa.nombre.toUpperCase(),
            precio:         	$scope.bolsa.precio,
            paquete: 			$scope.bolsa.paquete
        }; 
        
        var promisePost  = insumoService.postbolsa(object);
        
        promisePost.then(function (d) {

            Materialize.toast(JSON.stringify(d.data.message),2000,'rounded');
            loadBolsa();
            $('#modal1').closeModal();


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

    $scope.get = function(bolsa){
        $scope.title = "Modificar Bolsa";
        $scope.editMode = true;
        $scope.active = "active";
        $scope.bolsa = bolsa;
        $('#modal1').openModal();
    }

    $scope.modificar = function(){

        var object = {
            nombre:             $scope.bolsa.nombre.toUpperCase(),
            precio:         	$scope.bolsa.precio,
            paquete: 			$scope.bolsa.paquete
        }; 
        
        var promisePut  = insumoService.putbolsa($scope.bolsa.id, object);
        
        promisePut.then(function (d) {

            Materialize.toast(JSON.stringify(d.data.message),2000,'rounded');
            loadBolsa();
            $('#modal1').closeModal();


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

})
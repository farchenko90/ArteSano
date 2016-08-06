app.controller('cajaController', function ($scope,cajaService) {

	$scope.arrayCaja = [];
    $scope.arrayEfectivo = [];
    $scope.Caja = {};
    $scope.Efectivo = {};
	$scope.Id = session.getId();
    $scope.editMode = false;
    $scope.active;
    $scope.title;

	tablacajamenor();
    efectivo();

	function tablacajamenor(){

		var promiseGet = cajaService.cajamenor($scope.Id); //The Method Call from service
    
        promiseGet.then(function (pl) {
        	/*var object = {
                id: pl.data.id,
        		usuario: pl.data.nombre_apellido,
        		valor: pl.data.valor
        	}
        	$scope.arrayCaja.push(object);*/
            $scope.arrayCaja = pl.data;
            //alert(JSON.stringify($scope.arrayCaja))
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
	}

    function efectivo(){

        var promiseGet = cajaService.efectivo($scope.Id); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.arrayEfectivo = pl.data;
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
    }

    $scope.nuevo = function(){
        $scope.title = "Guardar Precio Caja Menor";
        $scope.editMode = false;
        $scope.active = "";
        $('#modalacaja1').openModal();
    }

    $scope.guardar = function(){

        var object = {
            valor:             $scope.Caja.valor,
            idusuario:         $scope.Id
        }; 
        
        var promisePost  = cajaService.postcaja(object);
        
        promisePost.then(function (d) {

            Materialize.toast(JSON.stringify(d.data.message),2000,'rounded');
            tablacajamenor();
            $('#modalacaja1').closeModal();


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

    $scope.get = function(caja){
        $scope.title = "Modificar Precio Caja Menor";
        $scope.editMode = true;
        $scope.active = "active";
        $scope.Caja = caja;
        $('#modalacaja1').openModal();
    }

    $scope.modificar = function(){

        var object = {
            valor:             $scope.Caja.valor,
            idusuario:         $scope.Id
        }; 
        
        var promisePut  = cajaService.putcaja($scope.Caja.id, object);
        
        promisePut.then(function (d) {

            Materialize.toast(JSON.stringify(d.data.message),2000,'rounded');
            tablacajamenor();
            $('#modalacaja1').closeModal();


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

    $scope.nuevoefectivo = function(){
        $scope.title = "Sacar Efectivo";
        $scope.editMode = false;
        $scope.active = "";
        $('#modalacaja2').openModal();
    }

    $scope.guardarefectivo = function(){

        var object = {
            valor:             $scope.Efectivo.valor,
            idusuario:         $scope.Id
        }; 
        
        var promisePost  = cajaService.postefectivo(object);
        
        promisePost.then(function (d) {

            Materialize.toast(JSON.stringify(d.data.message),2000,'rounded');
            efectivo();
            $('#modalacaja2').closeModal();


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

    $scope.getefectivo = function(efectivo){
        $scope.title = "Modificar Efectivo";
        $scope.editMode = true;
        $scope.active = "active";
        $scope.Efectivo = efectivo;
        $('#modalacaja2').openModal();
    }

    $scope.modificarefectivo = function(){

        var object = {
            valor:             $scope.Efectivo.valor,
            idusuario:         $scope.Id
        }; 
        
        var promisePut  = cajaService.putefectivo($scope.Efectivo.id, object);
        
        promisePut.then(function (d) {

            Materialize.toast(JSON.stringify(d.data.message),2000,'rounded');
            efectivo();
            $('#modalacaja2').closeModal();


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
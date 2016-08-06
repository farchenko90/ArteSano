app.controller('inventarioController', function ($scope,ngTableParams,$filter,inventarioService,inicioService) {

	$scope.arrayProducto = [];
	$scope.Idperfil = session.getIdperfil();
	$scope.Id = session.getId();
	$scope.arrayInventario = [];
	$scope.producto = {};
	$scope.editMode;
	
	loadProductoselect();
	loadinventariouser();

	function loadinventariouser(){
		var promiseGet = inventarioService.getinventariouser($scope.Id); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.arrayInventario = pl.data;
            $scope.totalItems = $scope.arrayInventario;
            crearNgTabla()
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
	}

	function crearNgTabla(){
        self = this;
        data = $scope.arrayInventario;
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: undefined
        }, { 
            total: $scope.arrayInventario,
            getData: function (a, b) {
                var c = b.sorting ?
                        $filter('orderBy')($scope.arrayInventario, b.orderBy()) :
                        $scope.arrayInventario;
                c = b.filter() ?
                        $filter('filter')(c, b.filter()) :
                        c;
                $scope.usuario = c.slice((b.page() - 1) * b.count(), b.page() * b.count());
                b.total(c.length);
                a.resolve($scope.usuario);
            }
        });
    }

	function loadProductoselect(){
        
        if($scope.Idperfil == 1){
        	var promiseGet = inicioService.getProductorestaurante(); //The Method Call from service
    
	        promiseGet.then(function (pl) {
	            $scope.arrayProducto = pl.data;
	        },
	        
	        function (errorPl) {
	            console.log('failure loading Tipo', errorPl);
	        });
        }else if($scope.Idperfil == 3){
        	var promiseGet = inicioService.getProductopanaderia(); //The Method Call from service
    
	        promiseGet.then(function (pl) {
	            $scope.arrayProducto = pl.data;
	        },
	        
	        function (errorPl) {
	            console.log('failure loading Tipo', errorPl);
	        });
        }else if($scope.Idperfil == 2){
        	var promiseGet = inicioService.getProductoheladeria(); //The Method Call from service
    
	        promiseGet.then(function (pl) {
	            $scope.arrayProducto = pl.data;
	        },
	        
	        function (errorPl) {
	            console.log('failure loading Tipo', errorPl);
	        });
        }
        
    }

    $scope.nuevo = function(){
    	$scope.active = "";
    	$scope.editMode = false;
		$scope.title = "Registrar Inventario";
		document.getElementsByName('marca')[0].value = "";
		$('#modalinventario').openModal();
    }

    $scope.get = function(inventario){
    	$scope.active = "active";
    	$scope.editMode = true;
		$scope.inventario = inventario;
		document.getElementsByName('marca')[0].value = inventario.idproducto;
		$scope.title = "Modificar Inventario";
		$('#modalinventario').openModal();
    }


	$scope.guardar = function(){
    	
        var object = {
            cantidad: 	$scope.inventario.cantidad,
            idusuario: 	$scope.Id,
            idproducto: document.getElementsByName('marca')[0].value
        }; 
        
        var promisePost  = inventarioService.postInventario(object);
        
        promisePost.then(function (d) {

            if(d.data.std == 1){
                Materialize.toast(JSON.stringify(d.data.message),2000,'rounded');
                loadinventariouser();
                $('#modalinventario').closeModal();
                $scope.inventario.cantidad = "";
                document.getElementsByName('marca')[0].value = "";
            }else{
                Materialize.toast(JSON.stringify(d.data.message),2000,'rounded');
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
        
    };

    $scope.modificar = function(){

        var object = {
            cantidad: 	$scope.inventario.cantidad,
            idusuario: 	$scope.Id,
            idproducto: document.getElementsByName('marca')[0].value
        }; 
        
        
        var promisePut  = inventarioService.putInventario($scope.inventario.id, object);
        
        promisePut.then(function (d) {

            Materialize.toast(JSON.stringify(d.data.message),2000,'rounded');
            loadinventariouser();
            $('#modalinventario').closeModal();


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

    $scope.delete = function(inventario){
        //alert(JSON.stringify(inventario));
        var promisePost  = inventarioService.deleteinventario(inventario.idproducto,$scope.Id);
        
        promisePost.then(function (d) {

            Materialize.toast("Eliminado Correctamente",2000,'rounded');
            loadinventariouser();

        }, function (err) {
            
            if(err.status == 401){
                alert(err.data.message);
                console.log(err.data.exception);
                
            }else{
                
                alert("Error Al procesar Solicitud");
                
            }

            console.log("Some Error Occured "+ JSON.stringify(err));
        });
    }

});
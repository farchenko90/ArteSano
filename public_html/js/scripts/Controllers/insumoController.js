app.controller('insumoController', function ($scope,insumoService) {

	$scope.arrayPanaderia = [];
    $scope.arrayBolsa = [];
	$scope.producto	= {};
	$scope.estado = false;
	$scope.editMode;
	$scope.active;
	$scope.Pan = {};
	$scope.Insumos = [];
	$scope.peso = 0;
	$scope.preciototal = 0;
    $scope.cantidadpan = {};
    $scope.estadoprecio = false;
    $scope.precioproducto = [];
    init();
	loadPanaderia();
    loadBolsa();

	function init(){
		$scope.producto = {
			modelo: ""
		}
		$scope.insumo = {
			ingredientes:"",
			peso:"",
			precio:""
		}
        $scope.precio = {
            id:"",
            cantidad: ""
        }
        $scope.bolsas = {
            id: ""
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

	function loadPanaderia(){
        
        var promiseGet = insumoService.getpanaderia(); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.arrayPanaderia = pl.data;
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
    }

    $scope.selecion = function(){
    	$scope.estado = true;
        $scope.estadoprecio = false;
    	//alert(JSON.stringify($scope.producto.modelo));
    	loadproducto($scope.producto.modelo);
    	loadInsumosproducto($scope.producto.modelo);
    	loadsumapeso($scope.producto.modelo);
    	loadsumaprecio($scope.producto.modelo);
    }

    function loadproducto(id){
    	var promiseGet = insumoService.getproductoById(id); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.Pan = pl.data;
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
    }

    function loadInsumosproducto(id){
    	var promiseGet = insumoService.getinsumoproducto(id); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.Insumos = pl.data;
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
    }

    function loadsumapeso(id){
    	var promiseGet = insumoService.getsumpeso(id); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.peso = pl.data;
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
    }

    function loadsumaprecio(id){
    	var promiseGet = insumoService.getsumprecio(id); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.preciototal = pl.data;
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
    }

    $scope.nuevo = function(){
        $scope.editMode = false;
        $scope.active = "";
        $scope.title = "Registrar Insumo";
        $('#modal1').openModal();
    }

    $scope.update = function(insumo){
        $scope.insumo = insumo;
        $scope.editMode = true;
        $scope.active = "active";
        $scope.title = "Registrar Insumo";
        $('#modal1').openModal();
    }

    $scope.guardarinsumo = function(){
    	var object = {
            ingredientes:       $scope.insumo.ingredientes.toUpperCase(),
            peso:            	$scope.insumo.peso,
            precio:       		$scope.insumo.precio,
            idproducto: 		$scope.producto.modelo
        };

        var promisePost = insumoService.postinsumo(object);

            promisePost.then(function (d) {

                Materialize.toast(JSON.stringify(d.data.message),2000,'rounded');
                loadInsumosproducto($scope.producto.modelo);
                loadsumapeso($scope.producto.modelo);
    			loadsumaprecio($scope.producto.modelo);
                $('#modal1').closeModal();
                $scope.insumo.ingredientes = "";
                $scope.insumo.peso = "";
                $scope.insumo.precio = "";

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

    $scope.modificar = function(){

        var object = {
            ingredientes:               $scope.insumo.ingredientes.toUpperCase(),
            peso:                       $scope.insumo.peso,
            precio:                     $scope.insumo.precio
        }; 
        
        var promisePut  = insumoService.putinsumo($scope.insumo.id, object);
        
        promisePut.then(function (d) {

            Materialize.toast(JSON.stringify(d.data.message),2000,'rounded');
            loadInsumosproducto($scope.producto.modelo);
            loadsumapeso($scope.producto.modelo);
            loadsumaprecio($scope.producto.modelo);
            loadprecioproducto($scope.producto.modelo);
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

    function loadprecioproducto(id){
        var promiseGet = insumoService.getprecioproducto(id); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.precio = pl.data;
            var object = {
                preciounidad: $scope.precio.preciounidad,
                preciototalunidad: $scope.precio.preciototalunidad,
                preciodistribuidor: $scope.precio.preciodistribuidor,
                preciocliente: $scope.precio.preciocliente,
                preciopublico: $scope.precio.preciopublico,
                administracion: $scope.precio.administracion,
                utilidad: $scope.precio.utilidad
            }
            if($scope.precioproducto == ""){
                $scope.precioproducto.push(object);
            }
            document.getElementsByName('cantidad')[0].value = JSON.stringify(pl.data.cantidad)
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
    }

    $scope.vermodal = function(){
        loadprecioproducto($scope.producto.modelo);
        $scope.active = "active";
        $scope.title1 = "Calcular Precio";
        $scope.estadoprecio = true;
        $('#modal2').openModal();
    }

    $scope.updateprecio = function(){
        var object = {
            cantidad:       $scope.precio.cantidad,
            idbolsa:        $scope.precio.idbolsa   
        }; 
        
        var promisePut  = insumoService.putprecioproducto($scope.precio.id, object);
        
        promisePut.then(function (d) {

            Materialize.toast(JSON.stringify(d.data.message),2000,'rounded');
            $('#modal2').closeModal();


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
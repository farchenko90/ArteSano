app.controller('consultafechaController', function ($scope,consultaService,ngTableParams,$filter) {

	$scope.arrayDiario = [];
	$scope.arrayTarjeta = [];
	
	$scope.loadDiaro = function(){
		$scope.arrayDiario = [];
		var finicial = document.getElementsByName('finicial')[0].value;
		var ffinal = document.getElementsByName('ffinal')[0].value;
		if(finicial == "" || ffinal == ""){
        	Materialize.toast("Error las fechas estan vacias",2000,'rounded');
        }else{
        	var promiseGet = consultaService.getcreditofecha(finicial,ffinal); //The Method Call from service
    
	        promiseGet.then(function (pl) {

	        	for(i=0;i<pl.data.length;i++){
	        		//alert(JSON.stringify(pl.data[i][0].nombre_apellido));
	        		if(pl.data[i][0].total == null || pl.data[i][0].fecha == null){
	        			$scope.total = 0;
	        			$scope.fecha = new Date();
	        		}else{
	        			$scope.total = 	pl.data[i][0].total;
	        			$scope.fecha = pl.data[i][0].fecha;
	        		}
	        		object = {
	        			fecha: $scope.fecha,
	        			total: $scope.total,
	        			user: pl.data[i][0].nombre_apellido	
	        		}
	        		$scope.arrayDiario.push(object);
	        	}
	            $scope.totalItems = $scope.arrayDiario;
	            crearNgTablacredito();
	        },
	        
	        function (errorPl) {
	            console.log('failure loading Tipo', errorPl);
	        });
        }
        
    }

    function crearNgTablacredito(){
        self = this;
        data = $scope.arrayDiario;
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: undefined
        }, { 
            total: $scope.arrayDiario,
            getData: function (a, b) {
                var c = b.sorting ?
                        $filter('orderBy')($scope.arrayDiario, b.orderBy()) :
                        $scope.arrayDiario;
                c = b.filter() ?
                        $filter('filter')(c, b.filter()) :
                        c;
                $scope.usuario = c.slice((b.page() - 1) * b.count(), b.page() * b.count());
                b.total(c.length);
                a.resolve($scope.usuario);
            }
        });
    }

    $scope.loadTarjeta = function(){
		$scope.arrayTarjeta = [];
		var finicial = document.getElementsByName('finicial1')[0].value;
		var ffinal = document.getElementsByName('ffinal1')[0].value;
		if(finicial == "" || ffinal == ""){
        	Materialize.toast("Error las fechas estan vacias",2000,'rounded');
        }else{
        	var promiseGet = consultaService.gettarjetafecha(finicial,ffinal); //The Method Call from service
    
	        promiseGet.then(function (pl) {

	        	for(i=0;i<pl.data.length;i++){
	        		//alert(JSON.stringify(pl.data[i][0].nombre_apellido));
	        		if(pl.data[i][0].total == null || pl.data[i][0].fecha == null){
	        			$scope.total = 0;
	        			$scope.fecha = new Date();
	        		}else{
	        			$scope.total = 	pl.data[i][0].total;
	        			$scope.fecha = pl.data[i][0].fecha;
	        		}
	        		object = {
	        			fecha: $scope.fecha,
	        			total: $scope.total,
	        			user: pl.data[i][0].nombre_apellido	
	        		}
	        		$scope.arrayTarjeta.push(object);
	        	}
	        	$scope.totalItems = $scope.arrayTarjeta;
	            crearNgTablatarjeta();
	        },
	        
	        function (errorPl) {
	            console.log('failure loading Tipo', errorPl);
	        });
        }
        
    }

    function crearNgTablatarjeta(){
        self = this;
        data = $scope.arrayTarjeta;
        $scope.tableParams1 = new ngTableParams({
            page: 1,
            count: 10,
            sorting: undefined
        }, { 
            total: $scope.arrayTarjeta,
            getData: function (a, b) {
                var c = b.sorting ?
                        $filter('orderBy')($scope.arrayTarjeta, b.orderBy()) :
                        $scope.arrayTarjeta;
                c = b.filter() ?
                        $filter('filter')(c, b.filter()) :
                        c;
                $scope.usuario = c.slice((b.page() - 1) * b.count(), b.page() * b.count());
                b.total(c.length);
                a.resolve($scope.usuario);
            }
        });
    }

})
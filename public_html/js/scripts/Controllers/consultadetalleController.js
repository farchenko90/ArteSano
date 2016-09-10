app.controller('consultadetalleController', function ($scope,consultaService,ngTableParams,$filter) {

	$scope.arrayUsuario = [];
	$scope.User = {}
	$scope.Materia;
	$scope.IdUser = session.getId();
	$scope.arrayDetalladoMateria = [];
        
	inicial();
	
	function inicial(){
		$scope.User = {
			fecha: ""
		}
	}

	$scope.Detallado = function(){
        
        var promiseGet = consultaService.getDetallado($scope.User.fecha,$scope.IdUser); //The Method Call from service
    
        promiseGet.then(function (pl) {
        	$scope.arrayDetallado = pl.data;
        	$scope.DetalladoMateria();
            //alert(JSON.stringify($scope.arrayDetallado))
            
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
    }

    $scope.DetalladoMateria = function(){
        
        var promiseGet = consultaService.getMateriaDetallado($scope.User.fecha,$scope.IdUser); //The Method Call from service
    	promiseGet.then(function (pl) {
            $scope.arrayDetalladoMateria = pl.data;
            window.PolarChartSample = new Chart(document.getElementById("polar-chart-sample").getContext("2d")).PolarArea($scope.arrayDetalladoMateria,{
				responsive:true
			});
            //alert(JSON.stringify($scope.arrayDetalladoMateria))
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
    }	


});
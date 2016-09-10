app.controller('detalladaController', function ($scope,consultaService,ngTableParams,$filter) {

	$scope.arrayUsuario = [];
	$scope.User = {}
	$scope.Materia;
	$scope.tipoUser = session.getTipouser();
	$scope.arrayDetalladoMateria = [];
	
	inicial();
	loadUsuario();

	function inicial(){
		$scope.User = {
			perfil: "",
			fecha: ""
		}
	}

	$scope.Detallado = function(){
        
        var promiseGet = consultaService.getDetallado($scope.User.fecha,$scope.User.perfil); //The Method Call from service
    
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
        
        var promiseGet = consultaService.getMateriaDetallado($scope.User.fecha,$scope.User.perfil); //The Method Call from service
    
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

    

    function loadUsuario(){
        
        var promiseGet = consultaService.getAlluser(); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.arrayUsuario = pl.data;
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
    }

	/*function inicial(){
		//alert("sd")
		var PolarChartSampleData = [
		    {
		        value: 300,
		        color:"#F7464A",
		        highlight: "#FF5A5E",
		        label: "Red"
		    },
		    {
		        value: 50,
		        color: "#46BFBD",
		        highlight: "#5AD3D1",
		        label: "Green"
		    },
		    {
		        value: 100,
		        color: "#FDB45C",
		        highlight: "#FFC870",
		        label: "Yellow"
		    },
		    {
		        value: 40,
		        color: "#949FB1",
		        highlight: "#A8B3C5",
		        label: "Grey"
		    },
		    {
		        value: 120,
		        color: "#4D5360",
		        highlight: "#616774",
		        label: "Dark Grey"
		    }

		];
		//alert(JSON.stringify(PolarChartSampleData))
		window.PolarChartSample = new Chart(document.getElementById("polar-chart-sample").getContext("2d")).PolarArea(PolarChartSampleData,{
   			responsive:true
  		});
	}*/

});
app.controller('sesionController', function ($scope,perfilService) {

	$scope.usuario = session.getNomape();
	$scope.tipouser = session.getUser();
	$scope.Usuario = {};
	$scope.Id = session.getId();

	loadUsuario();

	function loadUsuario(){
        
        var promiseGet = perfilService.getUsuario($scope.Id); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.Usuario = pl.data;
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
    }
	
});
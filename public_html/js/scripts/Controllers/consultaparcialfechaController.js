app.controller('consultaparcialfechaController', function ($scope,consultaService,ngTableParams,$filter) {

    $scope.Id = session.getId();
	$scope.arrayDiario = [];
    $scope.arrayTarjeta = [];
    
    $scope.loadDiaro = function(){
        $scope.arrayDiario = [];
        var finicial = document.getElementsByName('finicial')[0].value;
        var ffinal = document.getElementsByName('ffinal')[0].value;
        if(finicial == "" || ffinal == ""){
            Materialize.toast("Error las fechas estan vacias",2000,'rounded');
        }else{
            var promiseGet = consultaService.getfechaparcialcontado($scope.Id,finicial,ffinal); //The Method Call from service
    
            promiseGet.then(function (pl) {

                $scope.arrayDiario = pl.data;
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
            var promiseGet = consultaService.getfechaparcialcredito($scope.Id,finicial,ffinal); //The Method Call from service
    
            promiseGet.then(function (pl) {

                $scope.arrayTarjeta = pl.data;
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
app.controller('consultafechaController', function ($scope,consultaService,ngTableParams,$filter) {

	$scope.arrayDiario = [];
	$scope.arrayTarjeta = [];
	$scope.Imprimir = {};
    $scope.Tarjeta = 0;
	
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
	        			iduser:    pl.data[i][0].idusuario,
	        			fecha: $scope.fecha,
	        			total: $scope.total,
	        			user: pl.data[i][0].nombre_apellido,
	        			caja: pl.data[i][0].valor	
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
	        			iduser:    pl.data[i][0].id,
	        			fecha: $scope.fecha,
	        			total: $scope.total,
	        			user: pl.data[i][0].nombre_apellido,
	        			caja: pl.data[i][0].valor	
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

    $scope.imprimir = function(diario){
        //alert(diario.iduser)
        if(diario.total != 0){
            $scope.Imprimir = diario;
            $scope.title = "Ventas Por Fecha";
            total_tarjeta(diario.iduser);
            $('#modalacierre').openModal();
        }else{
            Materialize.toast("No se ha registrado ninguna venta",2000,'rounded');
        }
    }

    function total_tarjeta(id){
        
        
        var finicial = document.getElementsByName('finicial')[0].value;
        var ffinal = document.getElementsByName('ffinal')[0].value;
        
        var promiseGet = consultaService.getfechaparcialcredito(id,finicial,ffinal); //The Method Call from service

        promiseGet.then(function (pl) {
            //alert(JSON.stringify(pl.data))
            if(pl.data.total == 0){
                $scope.Tarjeta = 0
            }else{
                $scope.Tarjeta = pl.data[0].total;
            }
            sumar();

        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
        
    }

    function sumar(){
        $scope.sumatotal = $scope.Imprimir.total + $scope.Tarjeta;
    }

    $scope.CurrentDate = new Date();
    $scope.nit = "77.092.443-1";

    $scope.imprimirfactura = function() {
        var data = jQuery('#impresion').html();
            var data = jQuery('#impresion').html();
            var mywindow = window.open('', 'Ticket', 'height=600,width=600');
            mywindow.document.write('<html><head><title>Ticket</title>');
            mywindow.document.write("<link href='https://fonts.googleapis.com/css?family=Inconsolata' rel='stylesheet' type='text/css'>");
            //mywindow.document.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>');
            
            mywindow.document.write('<style type="text/css">');
            mywindow.document.write('@media print {  @page { margin-top: 0mm;margin-left: 1mm;margin-right: 5mm;margin-bottom: 7mm; padding-bottom: 5px;}}');
            mywindow.document.write("body{font-family: 'Arial'};");
            mywindow.document.write('</style></head><body onfocus="javascript:gio();">');
            mywindow.document.write(data);
            //mywindow.document.write('<script type="text/javascript">var ban = true; function gio(){ if(ban){window.print(); ban = false;}}  </script>');
            mywindow.document.write('</body></html>');
            setTimeout(function(){
                mywindow.print();
                
                mywindow.close();
                            
                            
                //location.reload();
            }, 250);
                
    }

})
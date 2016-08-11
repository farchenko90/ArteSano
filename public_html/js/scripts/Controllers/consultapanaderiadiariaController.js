app.controller('consultapanaderiadiariaController', function ($scope,consultaService,ngTableParams,$filter) {

	$scope.id = session.getId();
	$scope.arrayDiario = [];
	$scope.arrayDiarioTarjeta = [];
	$scope.total;
	$scope.fecha;

	loadDiaro();
	loadTarjeta();

	function loadDiaro(){
        
        var promiseGet = consultaService.getdiariopanaderia($scope.id); //The Method Call from service
    
        promiseGet.then(function (pl) {

        	$scope.arrayDiario = pl.data;
            $scope.totalItems = $scope.arrayDiario;
            crearNgTablaadicion();
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
    }

    function crearNgTablaadicion(){
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

    function loadTarjeta(){
        
        var promiseGet = consultaService.gettarjetapanaderia($scope.id); //The Method Call from service
    
        promiseGet.then(function (pl) {

        	$scope.arrayDiarioTarjeta = pl.data;
            $scope.totalItems = $scope.arrayDiarioTarjeta;
            crearNgTablatarjeta();
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
    }

    function crearNgTablatarjeta(){
        self = this;
        data = $scope.arrayDiarioTarjeta;
        $scope.tableParams1 = new ngTableParams({
            page: 1,
            count: 10,
            sorting: undefined
        }, { 
            total: $scope.arrayDiarioTarjeta,
            getData: function (a, b) {
                var c = b.sorting ?
                        $filter('orderBy')($scope.arrayDiarioTarjeta, b.orderBy()) :
                        $scope.arrayDiarioTarjeta;
                c = b.filter() ?
                        $filter('filter')(c, b.filter()) :
                        c;
                $scope.usuario = c.slice((b.page() - 1) * b.count(), b.page() * b.count());
                b.total(c.length);
                a.resolve($scope.usuario);
            }
        });
    }

    /////////////////Impresion//////////////
    $scope.Imprimir = {};
    $scope.totalCaja = 0;
    $scope.Descuento = 0;
    $scope.Tarjeta = 0;
    $scope.sumatotal = 0;

    $scope.imprimir = function(diario){
        if(diario.total != 0){
            $scope.Imprimir = diario;
            $scope.title = "Cierre De Caja";
            total_caja($scope.id);
            $('#modalacierre').openModal();
        }else{
            Materialize.toast("No se ha registrado ninguna venta",2000,'rounded');
        }
    }

    function sumar(){
        $scope.sumatotal = $scope.Imprimir.total + $scope.Tarjeta + parseFloat($scope.totalCaja)-$scope.Descuento;
    }

    function total_caja(id){
        
        var promiseGet = consultaService.getcaja(id); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.totalCaja = pl.data;
            total_descuento(id);
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
    }

    function total_descuento(id){
        
        var promiseGet = consultaService.getdescuento(id); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.Descuento = pl.data;
            total_tarjeta(id);
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
    }

    function total_tarjeta(id){
        
        var promiseGet = consultaService.gettarjetapanaderia(id); //The Method Call from service
    
        promiseGet.then(function (pl) {
            
            if(pl.data[0].total == null){
                $scope.Tarjeta = 0;
            }else{
                $scope.Tarjeta = pl.data[0].total;
            }  
            sumar();
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
    }

    $scope.guardar = function(){

        var object = {
            total:             $scope.sumatotal,
            idusuario:         $scope.id
        }; 
        
        
        var promisePost  = consultaService.postCierrecaja(object);
        
        promisePost.then(function (d) {

            if(d.data.std == 1){
                Materialize.toast(JSON.stringify(d.data.message),2000,'rounded');
                imprimir();
                $('#modalacierre').closeModal();
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

    $scope.CurrentDate = new Date();

    function imprimir () {
        
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
                            
                            
                location.reload();
            }, 250);
                
    }


})
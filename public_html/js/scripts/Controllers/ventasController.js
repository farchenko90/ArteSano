app.controller('ventasController', function ($scope,ventasService) {

	$scope.arrayProducto = [];
    $scope.arrayRapidas = [];
    $scope.arrayVentas = [];
    $scope.arrayAdicion = [];
    $scope.arrayValor = [];
    $scope.arrayRestaurante = [];
    $scope.arrayPanaderia = [];
    $scope.arrayBebidas = [];
    $scope.arrayPostres = [];
    $scope.arrayPan = [];
    $scope.arrayTienda = [];
    $scope.arrayDesayuno = [];
    $scope.arrayEnsalada = [];
    $scope.arraytiendaPanaderia = [];
    $scope.Producto = {};
    $scope.sabor = [];
    $scope.total = 0;
    $scope.totaladicion = 0;
    $scope.subtotal = 0;
    $scope.item = 0; 
    $scope.cantidad = 0;
    $scope.title;
    $scope.arrayInventario = [];
    $scope.idperfil = session.getIdperfil();
    $scope.Idusuario = session.getId();
    
    loadadicionheladeria();
    
    

    $scope.loadproducto = function(id){
        
        var promiseGet = ventasService.getIdRestaurante($scope.Idusuario,id); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.arrayProducto = pl.data;
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
    }

    
    $scope.loadproductorapidas = function(id){
        
        var promiseGet = ventasService.getIdRestaurante($scope.Idusuario,id); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.arrayRapidas = pl.data;
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        ///http://sci-hub.bz/
    }

    $scope.loadproductobebidas = function(id){
        
        var promiseGet = ventasService.getIdRestaurante($scope.Idusuario,id); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.arrayBebidas = pl.data;
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });

    }

    $scope.loadproductopostres = function(id){
        
        var promiseGet = ventasService.getIdRestaurante($scope.Idusuario,id); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.arrayPostres = pl.data;
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
    }

    $scope.loadproductopanaderiarestaurante = function(id){
        
        var promiseGet = ventasService.getId(id); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.arrayPan = pl.data;
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
    }

    $scope.loadtienda = function(id){
        
        var promiseGet = ventasService.getIdRestaurante($scope.Idusuario,id); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.arrayTienda = pl.data;
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
    }

    $scope.loaddesayuno = function(id){
        
        var promiseGet = ventasService.getIdRestaurante($scope.Idusuario,id); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.arrayDesayuno = pl.data;
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
    }

    $scope.loadensalada = function(id){
        
        var promiseGet = ventasService.getIdRestaurante($scope.Idusuario,id); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.arrayEnsalada = pl.data;
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
    }

    $scope.loadpanaderia = function(id){
        
        var promiseGet = ventasService.getId(id); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.arrayPanaderia = pl.data;
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
    }

    $scope.loadtiendapanaderia = function(id){
        
        var promiseGet = ventasService.getId(id); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.arraytiendaPanaderia = pl.data;
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
    }

    $scope.loadheladeria = function(id){
        
        var promiseGet = ventasService.getId(id); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.arrayHeladeria = pl.data;
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
    }

    $scope.loadheladeriatienda = function(id){
        
        var promiseGet = ventasService.getId(id); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.arrayHeladeria = pl.data;
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
    }

    function loadadicionheladeria(){
        if($scope.idperfil == 2){
            var promiseGet = ventasService.adicionalheladeria(); //The Method Call from service
    
            promiseGet.then(function (pl) {
                $scope.arrayAdicion = pl.data;
            },
            
            function (errorPl) {
                console.log('failure loading Tipo', errorPl);
            });   
        }
    }

    function loadadicionales(id){
        
        if($scope.idperfil == 1){
            var promiseGet = ventasService.adicionalrestaurante(id); //The Method Call from service
    
            promiseGet.then(function (pl) {
                $scope.arrayAdicion = pl.data;
            },
            
            function (errorPl) {
                console.log('failure loading Tipo', errorPl);
            });   
        }
        
    }

    $scope.eliminarproducto = function(index){
        var producto = $scope.arrayVentas[index];
        $scope.arrayVentas.splice(index, 1);
        $scope.calcular();
    }

    $scope.subir = function(index,producto){
        
        var i = 1;var valor;var sum;
        $scope.arrayVentas[index].cantidad = producto.cantidad + 1;

        var promiseGet = ventasService.getUsarioInventario(producto.idproducto,$scope.Idusuario); //The Method Call from service
    
        promiseGet.then(function (pl) {
            //alert(JSON.stringify(pl.data.cantidad))
            if(pl.data.cantidad == null){
                if(producto.adicion == 0){
                    valor = ((producto.cantidad) * producto.valoruni);
                    $scope.arrayVentas[index].subtotal = valor;
                }else{
                    sum = producto.valoruni + producto.adicion;
                    valor = ((producto.cantidad) * sum);
                    $scope.arrayVentas[index].subtotal = valor;
                }
            }else{
                $scope.cantidad = JSON.stringify(pl.data.cantidad);
                if($scope.arrayVentas[index].cantidad > $scope.cantidad){
                    $scope.arrayVentas[index].cantidad = 5;
                    Materialize.toast("Has pasado la cantidad del producto guardado en el inventario",3000,'rounded');
                }else{
                    if(producto.adicion == 0){
                        valor = ((producto.cantidad) * producto.valoruni);
                        $scope.arrayVentas[index].subtotal = valor;
                    }else{
                        sum = producto.valoruni + producto.adicion;
                        valor = ((producto.cantidad) * sum);
                        $scope.arrayVentas[index].subtotal = valor;
                    }
                }
            }
            $scope.calcular();
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });

            /*if(producto.adicion == 0){
                valor = ((producto.cantidad) * producto.valoruni);
                $scope.arrayVentas[index].subtotal = valor;
            }else{
                sum = producto.valoruni + producto.adicion;
                valor = ((producto.cantidad) * sum);
                $scope.arrayVentas[index].subtotal = valor;
            }
            $scope.calcular();*/
        
    }

    $scope.bajar = function(index,producto){
        var i = 1;
        if(producto.cantidad <= 1){
            Materialize.toast("El limite es 1",2000,'rounded');
        }else{
            var valor;var sum;
            $scope.arrayVentas[index].cantidad = producto.cantidad - 1;
            if(producto.adicion == 0){
                valor = ((producto.cantidad) * producto.valoruni);
                $scope.arrayVentas[index].subtotal = valor;
            }else{
                sum = producto.valoruni + producto.adicion;
                valor = ((producto.cantidad) * sum);
                $scope.arrayVentas[index].subtotal = valor;
            }
            $scope.calcular();
        }
        
    }    

    $scope.adicionar = function(producto,id){
        loadadicionales(id);
        $scope.title = "Agregar Adicionales";
        $scope.Producto = producto;
        $('#modaladicion').openModal();
    }

    $scope.adicionarheladeria = function(producto){
        $scope.title = "Agregar Adicionales";
        $scope.Producto = producto;
        $('#modaladicion').openModal();
    }

    $scope.agregar = function(){
        var checkboxes = document.getElementById("formulario");
        $scope.totaladicion = 0;
        for(var x=0; x<checkboxes.length; x++){
            if(checkboxes[x].checked){
                $scope.totaladicion += Number(checkboxes[x].value);
            }
        }
        var sumatotal = $scope.totaladicion + $scope.Producto.valor;
        var _producto = {
            idproducto: $scope.Producto.id,
            cantidad: 1,
            producto: $scope.Producto.nombre,
            valoruni: $scope.Producto.valor,
            subtotal: sumatotal,
            adicion:  $scope.totaladicion
        };
        $scope.arrayVentas.push(_producto);
        $scope.calcular();
        for(var x=0; x<checkboxes.length; x++){
            if(checkboxes[x].checked){
                checkboxes[x].checked = 0;
            }
        }
        $('#modaladicion').closeModal();
    }

    function loadInventariouser(idpro,iduser,producto){
        var promiseGet = ventasService.getUsarioInventario(idpro,iduser); //The Method Call from service
    
        promiseGet.then(function (pl) {
            //$scope.arrayInventario = pl.data;
            if(pl.data.cantidad == null){
                var _producto = {
                    idproducto: JSON.stringify(producto.id),
                    cantidad: 1,
                    producto: JSON.stringify(producto.nombre),
                    valoruni: JSON.stringify(producto.valor),
                    subtotal: JSON.stringify(producto.valor),
                    adicion: 0
                };
                $scope.arrayVentas.push(_producto);
                $scope.calcular();
            }else if(pl.data.cantidad <= 0){
                Materialize.toast("El producto se encuentra agotado",2000,'rounded');
            }else{
                var _producto = {
                    idproducto: JSON.stringify(producto.id),
                    cantidad: 1,
                    producto: JSON.stringify(producto.nombre),
                    valoruni: JSON.stringify(producto.valor),
                    subtotal: JSON.stringify(producto.valor),
                    adicion: 0
                };
                $scope.arrayVentas.push(_producto);
                $scope.calcular();
            }
            
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
    }

    $scope.almuerzos = function(producto){
        loadInventariouser(producto.id,$scope.Idusuario,producto);
    }

    $scope.calcular = function(){
        $scope.total = 0;
        for(var i=0;i<$scope.arrayVentas.length;i++){
            $scope.item = $scope.arrayVentas[i].subtotal;
            $scope.total += Number($scope.arrayVentas[i].subtotal);
        }
    }

    ///////////////////////////////////////////////////////////////
    /*
    * Botones de pagos
    * variables
    */
    //////////////////////////////////////////////////////////////
    
    $scope.ingreso = 0;
    $scope.credito = 0;
    $scope.resto = 0;
    $scope.CurrentDate = new Date();
    $scope.usuario = session.getNomape();
    $scope.editMode = false;
    $scope.edittarjeta = false;
    $scope.std;
    $scope.msg;
    $scope.nit = "77.092.443-3";
    $scope.Celular = session.getCelular();
    $scope.Direccion = session.getDireccion();
    
    $scope.modalcredito = function(){
        if($scope.total == 0){
            Materialize.toast("No se ha agregado ningun producto",2000,'rounded');
        }else{
            $scope.title = "PAGAR A CREDITO";
            $scope.editMode = false;
            $scope.edittarjeta = true;
            document.getElementById('credito').style.display = 'block';
            document.getElementById('resto').style.display = 'block';
            $('#modalcambio').openModal();
        }
    }

    $scope.modaltarjeta = function(){
        if($scope.total == 0){
            Materialize.toast("No se ha agregado ningun producto",2000,'rounded');
        }else{
            $scope.title = "PAGAR A CREDITO";
            $scope.editMode = true;
            $scope.edittarjeta = false;
            document.getElementById('credito').style.display = 'none';
            document.getElementById('resto').style.display = 'none';
            $('#modalcambio').openModal();
        }
    }

    $scope.cinco = function(){
        $scope.ingreso = 500;
        $scope.credito += $scope.ingreso;
        $scope.resto = $scope.credito - $scope.total;
        if($scope.resto < 0){
            $scope.resto = 0;
        }
    }

    $scope.mil = function(){
        $scope.ingreso = 1000;
        $scope.credito += $scope.ingreso;
        $scope.resto = $scope.credito - $scope.total;
        if($scope.resto < 0){
            $scope.resto = 0;
        }
    }

    $scope.dosmil = function(){
        $scope.ingreso = 2000;
        $scope.credito += $scope.ingreso;
        $scope.resto = $scope.credito - $scope.total;
        if($scope.resto < 0){
            $scope.resto = 0;
        }
    }

    $scope.cincomil = function(){
        $scope.ingreso = 5000;
        $scope.credito += $scope.ingreso;
        $scope.resto = $scope.credito - $scope.total;
        if($scope.resto < 0){
            $scope.resto = 0;
        }
    }

    $scope.diezmil = function(){
        $scope.ingreso = 10000;
        $scope.credito += $scope.ingreso;
        $scope.resto = $scope.credito - $scope.total;
        if($scope.resto < 0){
            $scope.resto = 0;
        }
    }

    $scope.veinte = function(){
        $scope.ingreso = 20000;
        $scope.credito += $scope.ingreso;
        $scope.resto = $scope.credito - $scope.total;
        if($scope.resto < 0){
            $scope.resto = 0;
        }
    }

    $scope.cincuenta = function(){
        $scope.ingreso = 50000;
        $scope.credito += $scope.ingreso;
        $scope.resto = $scope.credito - $scope.total;
        if($scope.resto < 0){
            $scope.resto = 0;
        }
    }

    $scope.borrar = function(){
        $scope.credito = 0;
        $scope.resto = 0;
    }

    $scope.porciento = function(valor){
        var porcentaje = ($scope.total * valor);
        $scope.total = $scope.total - porcentaje;
        
    }

    $scope.produ = [];

    $scope.pagar = function(){
        //alert(JSON.stringify($scope.arrayVentas));
        for(var i=0;i<$scope.arrayVentas.length;i++){
            var object = {
                id:  $scope.arrayVentas[i].idproducto,
                cantidad: $scope.arrayVentas[i].cantidad,
                productos: $scope.arrayVentas[i].producto,
                valor: $scope.arrayVentas[i].subtotal,
                cantidad: $scope.arrayVentas[i].cantidad
            }
            $scope.produ.push(object);
        }
        //alert(JSON.stringify($scope.produ));
        var object = {
            total:              $scope.total,
            ingreso:            $scope.credito,
            cambio:             $scope.resto,
            formapago:          "CONTADO",
            idusuario:          $scope.Idusuario,
            producto:           $scope.produ
        };
        
        if($scope.credito == 0){
            Materialize.toast("El ingreso es igual a cero",2000,'rounded');
        }else if($scope.credito < $scope.total){
            Materialize.toast("El ingreso es menor que el total",2000,'rounded');
        }else{
            var promisePost = ventasService.postcredito(object);
            
            promisePost.then(function (d) {

                //////// Restar cantidad
                
                ////////// Fim
                setTimeout( function  () {
                    imprimir();
                    $('#modalcambio').closeModal();
                },500);
                
            }, function (err) {
                
                if(err.status == 401){
                    alert(err.data.message);
                    console.log(err.data.exception);
                    
                }else{
                    
                    alert("Error Al procesar Solicitud");
                    
                }

                console.log(err);
            });
        }

        
    }

    $scope.pagartarjeta = function(){

        for(var i=0;i<$scope.arrayVentas.length;i++){
            var object = {
                id:  $scope.arrayVentas[i].idproducto,
                cantidad: $scope.arrayVentas[i].cantidad,
                productos: $scope.arrayVentas[i].producto,
                valor: $scope.arrayVentas[i].subtotal,
                cantidad: $scope.arrayVentas[i].cantidad
            }
            $scope.produ.push(object);
        }

        var object = {
            total:              $scope.total,
            ingreso:            0,
            cambio:             0,
            formapago:          "CREDITO",
            idusuario:          $scope.Idusuario,
            producto:           $scope.produ
        };
        
            var promisePost = ventasService.postcredito(object);
            
            promisePost.then(function (d) {
                setTimeout( function  () {
                    imprimir();
                    $('#modalcambio').closeModal();
                },500);
                
            }, function (err) {
                
                if(err.status == 401){
                    alert(err.data.message);
                    console.log(err.data.exception);
                    
                }else{
                    
                    alert("Error Al procesar Solicitud");
                    
                }

                console.log(err);
            });
        
    }

    function imprimir () {
        
        var data = jQuery('#impresion').html();
        var data = jQuery('#impresion').html();
        var mywindow = window.open('', 'Ticket', 'height=600,width=600');
        mywindow.document.write('<html><head><title>Ticket</title>');
        //mywindow.document.write("<link href='https://fonts.googleapis.com/css?family=Inconsolata' rel='stylesheet' type='text/css'>");
        //mywindow.document.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>');
        
        mywindow.document.write('<style type="text/css">');
        mywindow.document.write('@media print {  @page { margin-top: 0mm;margin-left: 1mm;margin-right: 5mm;margin-bottom: 7mm; padding-bottom: 5px;page-break-after: always;}}');
        mywindow.document.write("body{font-family: 'Arial'};");
        mywindow.document.write('</style></head><body onfocus="javascript:gio();">');
        mywindow.document.write(data);
        //mywindow.document.write('<script type="text/javascript">var ban = true; function gio(){ if(ban){window.print(); ban = false;}}  </script>');
        mywindow.document.write('</body></html>');
        setTimeout(function(){
            mywindow.print();
            mywindow.print();
            mywindow.close();
                        
                        
            location.reload();
        }, 250);
                
    } 

}); 
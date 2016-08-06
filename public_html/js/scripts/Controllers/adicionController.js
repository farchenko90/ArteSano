app.controller('adicionController', function ($scope,ngTableParams,$filter,inicioService) {

	inicialproducto();
    inicialadicional();
    loadProducto();
    loadAdicionales();
    loadMateria();

	function inicialproducto(){
        $scope.producto = {
            id: "",
            nombre: "",
            valor: "",
            imagen: "",
            materia: ""
        }
    }

    function inicialadicional(){
        $scope.adicion = {
            id: "",
            nombre: "",
            valor: "",
            idmateria: ""
        }
    }

    function loadMateria(){
        
        var promiseGet = inicioService.getMateria(); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.arrayMateria = pl.data;
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
    }

    function loadAdicionales(){
        
        var promiseGet = inicioService.getAdicionales(); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.arrayAdicional = pl.data;
            $scope.totalItems = $scope.arrayAdicional;
            crearNgTablaadicion();
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
    }

    function crearNgTablaadicion(){
        self = this;
        data = $scope.arrayAdicional;
        $scope.tableParams1 = new ngTableParams({
            page: 1,
            count: 10,
            sorting: undefined
        }, { 
            total: $scope.arrayAdicional,
            getData: function (a, b) {
                var c = b.sorting ?
                        $filter('orderBy')($scope.arrayAdicional, b.orderBy()) :
                        $scope.arrayAdicional;
                c = b.filter() ?
                        $filter('filter')(c, b.filter()) :
                        c;
                $scope.usuario = c.slice((b.page() - 1) * b.count(), b.page() * b.count());
                b.total(c.length);
                a.resolve($scope.usuario);
            }
        });
    }

    function loadProducto(){
        
        var promiseGet = inicioService.getProductorestaurante(); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.arrayProducto = pl.data;
            $scope.totalItems = $scope.arrayProducto.length;
            crearNgTabla();
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
    }

    function crearNgTabla(){
        self = this;
        data = $scope.arrayProducto;
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: undefined
        }, { 
            total: $scope.arrayProducto,
            getData: function (a, b) {
                var c = b.sorting ?
                        $filter('orderBy')($scope.arrayProducto, b.orderBy()) :
                        $scope.arrayProducto;
                c = b.filter() ?
                        $filter('filter')(c, b.filter()) :
                        c;
                $scope.usuario = c.slice((b.page() - 1) * b.count(), b.page() * b.count());
                b.total(c.length);
                a.resolve($scope.usuario);
            }
        });
    }

    $scope.get = function (producto){
        document.getElementsByName('marca')[0].value = JSON.stringify(parseInt(producto.idmateria));
        $scope.editMode = true;
        $scope.title = "Editar Producto";
        $scope.active = "active";
        document.getElementById("image").innerHTML = ['<img class="circle thumb" style="height:60px;" src="'+ producto.imagen+ '" title="'+producto.nombre+'"/>'].join('');
        $scope.producto = producto;
        document.getElementById('cambiar').style.display = 'none';
        $('#modal1').openModal();
        
    };

    $scope.getadicion = function (adicion){
        document.getElementsByName('marcaadicion')[0].value = JSON.stringify(parseInt(adicion.idmateria));
        $scope.editMode = true;
        $scope.title = "Editar Adicion";
        $scope.active = "active";
        $scope.adicion = adicion;
        $('#modaladicional').openModal();
        
    };

    $scope.nuevo = function(){
        inicialproducto();
        $scope.editMode = false;
        $scope.active = "";
        $scope.title = "Guardar Producto";
        document.getElementsByName('marca')[0].value = "";
        document.getElementById("image").innerHTML = "";
        //$("#cambiar").hidde();
        $('#modal1').openModal();
    }

    $scope.nuevoadicional = function(){
        inicialadicional();
        $scope.editMode = false;
        $scope.active = "";
        $scope.title = "Guardar Adicion";
        $('#modaladicional').openModal();
    }

    $scope.guardarproducto = function(){
        var formData = new FormData();
        formData.append('imagen',$scope.producto.imagen);
        formData.append('nombre',$scope.producto.nombre.toUpperCase());
        formData.append('valor',$scope.producto.valor);
        formData.append('tipo','RESTAURANTE');
        formData.append('idmateria',document.getElementsByName('marca')[0].value);

        
        var promisePost = inicioService.postproducto(formData);

            promisePost.then(function (d) {

                Materialize.toast(JSON.stringify(d.data.message),2000,'rounded');
                loadProducto();
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

    }

    $scope.modificar = function(){

        var object = {
            nombre:             $scope.producto.nombre.toUpperCase(),
            valor:             $scope.producto.valor,
            idmateria:       document.getElementsByName('marca')[0].value
        }; 
        
        
        var promisePut  = inicioService.putProducto($scope.producto.id, object);
        
        promisePut.then(function (d) {

            Materialize.toast(JSON.stringify(d.data.message),2000,'rounded');
            loadProducto();
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

    $scope.modificarImagen = function(){
        
        if($scope.producto.imagen == null){
            alert("No se seleccionado una imagen");
        }else{
            var formData = new FormData();
            formData.append('imagen',$scope.producto.imagen);
            formData.append('id', $scope.producto.id);
            
            var promisePost = inicioService.postImagen(formData);
            
            promisePost.then(function (d) {
                Materialize.toast(JSON.stringify(d.data.message),2000,'rounded');
                loadProducto();
                $('#modal1').closeModal();
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
    };

    $scope.guardaradicion = function(){
        var object = {
            adicional:            $scope.adicion.nombre.toUpperCase(),
            idmateria:         document.getElementsByName('marcaadicion')[0].value,
            valor:             $scope.adicion.valor
        }; 

        var promisePost = inicioService.adicionar(object);
            
        promisePost.then(function (d) {
            Materialize.toast(JSON.stringify(d.data.message),2000,'rounded');
            loadAdicionales();
            $('#modaladicional').closeModal();
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

    $scope.modificaradicion = function(){

        var object = {
            adicional:         $scope.adicion.nombre.toUpperCase(),
            idmateria:         document.getElementsByName('marcaadicion')[0].value,
            valor:             $scope.adicion.valor
        }; 
        
        
        var promisePut  = inicioService.putAdicion($scope.adicion.id, object);
        
        promisePut.then(function (d) {

            Materialize.toast(JSON.stringify(d.data.message),2000,'rounded');
            loadAdicionales();
            $('#modaladicional').closeModal();


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

    $scope.cambiarestado = function(producto){
        var estado;
        if(producto.estado == 'ACTIVO'){
            estado = 'INACTIVO';
        }else{
            estado = 'ACTIVO';
        }
        var object = {
            estado: estado
        };
        
        var promisePut = inicioService.putEstado(producto.id,object);
        
        promisePut.then(function (d) {

            loadProducto();

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
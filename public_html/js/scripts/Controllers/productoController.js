app.controller('productoController', function ($scope,ngTableParams,$filter,inicioService) {

    $scope.arrayProducto = [];
    $scope.arrayMateria = [];
    $scope.Id = session.getId();

	inicialproducto();
	loadMateria();
    loadproductos();

	function inicialproducto(){
        $scope.producto = {
            id: "",
            nombre: "",
            valor: "",
            imagen: "",
            materia: ""
        }
    }

    function loadMateria(){
        
        var promiseGet = inicioService.getMateriaPanaderia(); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.arrayMateria = pl.data;
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
    }

    function loadproductos(){
        
        var promiseGet = inicioService.getProductopanaderia(); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.arrayProducto = pl.data;
            //alert(JSON.stringify($scope.arrayProducto))
            $scope.totalItems = $scope.arrayProducto;
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

	$scope.nuevo = function(){
        inicialproducto();
        $scope.editMode = false;
        $scope.active = "";
        document.getElementsByName('marca')[0].value = "";
        document.getElementById("image").innerHTML = "";
        $scope.title = "Guardar Producto";
        $('#modal1').openModal();
    }

    $scope.get = function (producto){
        document.getElementsByName('marca')[0].value = JSON.stringify(parseInt(producto.idmateria));
        $scope.editMode = true;
        $scope.title = "Editar Producto";
        $scope.active = "active";
        document.getElementById("image").innerHTML = ['<img class="circle thumb" style="height:60px;" src="'+ producto.imagen+ '" title="'+producto.nombre+'"/>'].join('');
        $scope.producto = producto;
        $('#modal1').openModal();
        
    };

    $scope.guardarproducto = function(){
        var formData = new FormData();
        formData.append('imagen',$scope.producto.imagen);
        formData.append('nombre',$scope.producto.nombre.toUpperCase());
        formData.append('valor',$scope.producto.valor);
        formData.append('tipo','PANADERIA');
        formData.append('idusuario',$scope.Id);
        formData.append('idmateria',document.getElementsByName('marca')[0].value);

        
        var promisePost = inicioService.postproducto(formData);

            promisePost.then(function (d) {

                Materialize.toast(JSON.stringify(d.data.message),2000,'rounded');
                loadproductos();
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
        //alert($scope.producto.imagen);
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

            loadproductos();

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
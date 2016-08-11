app.controller('inicioController', function ($scope,ngTableParams,$filter,inicioService) {

	$scope.active = "";
	$scope.arrayTipo = [];
	$scope.arrayUser = [];
    $scope.arrayPerfil = [];
    $scope.arrayMateria = [];
    $scope.arrayProducto = [];
    $scope.arrayAdicional = [];
    $scope.cambio = false;
    $scope.editMode = false;
    $scope.active = "";
    $scope.title;
    $scope.cambiar = false;

	initialize();
    
	loadTipo();
	loadUsuario();
    loadPerfil();
    
	
	function initialize(){
        $scope.user = {
            id:"",
			nombre_apellido: "",
			celular: "",
			correo: "",
			usuario: "",
			contrasena: "",
			contrasena1: "",
			estado: "",
			tipo: "",
            perfil: ""
		}
	}

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

	function loadTipo(){
        
        var promiseGet = inicioService.get(); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.arrayTipo = pl.data;
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
    }

    function loadPerfil(){
        
        var promiseGet = inicioService.getPerfil(); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.arrayPerfil = pl.data;
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
    }

    function loadUsuario(){
        
        var promiseGet = inicioService.getUser(); //The Method Call from service
    
        promiseGet.then(function (pl) {
            $scope.arrayUser = pl.data;
            $scope.totalItems = $scope.arrayUser;
            crearNgTabla();
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });
        
    }

    function crearNgTabla(){
        self = this;
        data = $scope.arrayUser;
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: undefined
        }, { 
            total: $scope.arrayUser,
            getData: function (a, b) {
                var c = b.sorting ?
                        $filter('orderBy')($scope.arrayUser, b.orderBy()) :
                        $scope.arrayUser;
                c = b.filter() ?
                        $filter('filter')(c, b.filter()) :
                        c;
                $scope.usuario = c.slice((b.page() - 1) * b.count(), b.page() * b.count());
                b.total(c.length);
                a.resolve($scope.usuario);
            }
        });
    }

    $scope.guardar = function(){
    	if($scope.user.tipo == 1){
    		var object = {
    			nombre_apellido: $scope.user.nombre_apellido,
    			celular: $scope.user.celular,
    			correo: $scope.user.correo,
    			usuario: $scope.user.usuario,
    			contrasena: $scope.user.contrasena,
    			modulo: "1111",
    			idtipo: $scope.user.tipo,
                idperfil: $scope.user.perfil
    		}
            //alert(JSON.stringify(object));
    		var promisePost = inicioService.post(object);

    		promisePost.then(function (d) {

    			Materialize.toast(JSON.stringify(d.data.message),2000,'rounded');
                loadUsuario();

            }, function (err) {

                if(err.status == 401){
                    alert(err.data.message);
                    console.log(err.data.exception);

                }else{

                    alert("Error Al procesar Solicitud");

                }

                console.log("Some Error Occured "+ JSON.stringify(err));
            });

    	}else if($scope.user.tipo == 2){
			var object = {
                nombre_apellido: $scope.user.nombre_apellido,
                celular: $scope.user.celular,
                correo: $scope.user.correo,
                usuario: $scope.user.usuario,
                contrasena: $scope.user.contrasena,
                modulo: "1111",
                idtipo: $scope.user.tipo,
                idperfil: $scope.user.perfil
            }
            //alert(JSON.stringify(object));
            var promisePost = inicioService.post(object);

            promisePost.then(function (d) {

                Materialize.toast(JSON.stringify(d.data.message),2000,'rounded');
                loadUsuario();

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
    }

    $scope.updateuser = function(){
        var perfil;
        if(document.getElementsByName('userperfil')[0].value == 1){
            perfil = 1
        }else{
            perfil = document.getElementsByName('perfiluser')[0].value;
        }

        var object = {
            nombre_apellido: $scope.user.nombre_apellido,
            celular: $scope.user.celular,
            correo: $scope.user.correo,
            usuario: $scope.user.usuario,
            idtipo: document.getElementsByName('userperfil')[0].value,
            idperfil: perfil
        }

        var promisePost = inicioService.putuser($scope.user.id,object);

        promisePost.then(function (d) {

            Materialize.toast(JSON.stringify(d.data.message),2000,'rounded');
            loadUsuario();

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

    $scope.selecionar = function(tipo){
        //alert($scope.user.tipo);
        if($scope.user.tipo == 2){
            $scope.cambio = true;
        }else{
            $scope.cambio = false;
        }
    }

    $scope.getuser = function(usuario){
        document.getElementsByName('userperfil')[0].value = JSON.stringify(parseInt(usuario.idtipo));
        $scope.cambiar = true;
        if(usuario.idtipo == 2){
            $scope.cambio = true;
            document.getElementsByName('perfiluser')[0].value = JSON.stringify(parseInt(usuario.idperfil));
        }else{
            $scope.cambio = false;
        }
        $scope.user = usuario;
        $scope.active = "active";
        $('ul.tabs').tabs('select_tab', 'test1');
        $scope.editMode = true;

    }

    
    $scope.nuevouser = function(){
        initialize();
        $scope.editMode = false;
        $scope.cambiar = false;
        $scope.active = "";
    }

    

});
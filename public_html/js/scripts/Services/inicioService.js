app.service("inicioService", function ($http) {

	this.get = function () {        
        var req = $http.get(uri+'/api/tipo');       
        return req;        
    };

    this.post = function (usuario) {        
        var req = $http.post(uri+'/api/usuario',usuario);       
        return req;        
    };

    this.postImagen = function (formData) {
        
        var req = $http.post(uri+'/api/producto/imagen'/*+id*/, formData,{transformRequest: angular.identity, 
            headers: {'Content-Type': undefined}});
        return req;
        
    };

    this.putuser = function (id,usuario) {        
        var req = $http.put(uri+'/api/usuario/'+id,usuario);       
        return req;        
    };

    this.getUser = function () {        
        var req = $http.get(uri+'/api/usuario');       
        return req;        
    };

    this.getPerfil = function () {        
        var req = $http.get(uri+'/api/tipoperfil');       
        return req;        
    };

    this.getMateria = function () {        
        var req = $http.get(uri+'/api/restaurante/materia');       
        return req;        
    };    

    this.getMateriaPanaderia = function () {        
        var req = $http.get(uri+'/api/restaurante/panaderia');       
        return req;        
    }; 

    this.getMateriaheladeria = function () {        
        var req = $http.get(uri+'/api/restaurante/heladeria');       
        return req;        
    }; 

    this.postproducto = function (formData) {        
        var req = $http.post(uri+'/api/producto', formData,{transformRequest: angular.identity, 
        headers: {'Content-Type': undefined}});
        console.log(req);
        return req;       
    };

    this.getProductorestaurante = function (id) {        
        var req = $http.get(uri+'/api/producto/materia/'+id);       
        return req;        
    }; 

    this.getProductopanaderia = function () {        
        var req = $http.get(uri+'/api/producto/panaderia');       
        return req;        
    }; 

    this.getProductoheladeria = function () {        
        var req = $http.get(uri+'/api/producto/heladeria');       
        return req;        
    }; 

    this.putProducto = function (id,producto) {        
        var req = $http.put(uri+'/api/producto/'+id,producto);       
        return req;        
    }; 

    this.getAdicionales = function () {        
        var req = $http.get(uri+'/api/restaurante/adicion');       
        return req;        
    };

    this.getAdicionalesheladeria = function () {        
        var req = $http.get(uri+'/api/heladeria/adicion');       
        return req;        
    };

    this.adicionar = function (adicion) {        
        var req = $http.post(uri+'/api/adicional',adicion);       
        return req;        
    }; 

    this.putAdicion = function (id,adicion) {        
        var req = $http.put(uri+'/api/adicional/'+id,adicion);       
        return req;        
    };

    this.putEstado = function (id,object) {        
        var req = $http.put(uri+'/api/cambiar/estado/'+id,object);       
        return req;        
    };

    this.getAllRestaurante = function () {        
        var req = $http.get(uri+'/api/allrestaurante');       
        return req;        
    };

})
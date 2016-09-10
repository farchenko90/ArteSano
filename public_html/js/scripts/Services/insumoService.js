app.service("insumoService", function ($http) {

	this.getinsumoproducto = function (idproducto) {        
        var req = $http.get(uri+'/api/producto/'+idproducto+'/insumos');       
        return req;        
    };

	this.getpanaderia = function () {        
        var req = $http.get(uri+'/api/producto/panaderia');       
        return req;        
    };    

    this.getproductoById = function (id) {        
        var req = $http.get(uri+'/api/producto/'+id);       
        return req;        
    }; 

    this.getsumpeso = function (id) {        
        var req = $http.get(uri+'/api/producto/'+id+'/peso');       
        return req;        
    }; 

    this.getsumprecio = function (id) {        
        var req = $http.get(uri+'/api/producto/'+id+'/precio');       
        return req;        
    }; 

    this.postinsumo = function (object) {        
        var req = $http.post(uri+'/api/insumos',object);       
        return req;        
    };

    this.putinsumo = function (id,object) {        
        var req = $http.put(uri+'/api/insumos/'+id,object);       
        return req;        
    };

    this.putprecioproducto = function (id,object) {        
        var req = $http.put(uri+'/api/precioproducto/'+id,object);       
        return req;        
    };

    this.getprecioproducto = function (id) {        
        var req = $http.get(uri+'/api/producto/'+id+'/precioproducto');       
        return req;        
    }; 

    this.getbolsa = function () {        
        var req = $http.get(uri+'/api/bolsa');       
        return req;        
    };

    this.postbolsa = function (object) {        
        var req = $http.post(uri+'/api/bolsa',object);       
        return req;        
    }; 

    this.putbolsa = function (id,object) {        
        var req = $http.put(uri+'/api/bolsa/'+id,object);       
        return req;        
    }; 

});
app.service("cajaService", function ($http) {

	this.cajamenor = function (id) {        
        var req = $http.get(uri+'/api/cajamenor/'+id);       
        return req;        
    };

    this.putcaja = function (id,object) {        
        var req = $http.put(uri+'/api/caja/'+id,object);       
        return req;        
    };

    this.postcaja = function (object) {        
        var req = $http.post(uri+'/api/caja',object);       
        return req;        
    };

    this.efectivo = function (id) {        
        var req = $http.get(uri+'/api/ver_descuento/'+id);       
        return req;        
    };

    this.putefectivo = function (id,object) {        
        var req = $http.put(uri+'/api/descontar/'+id,object);       
        return req;        
    };

    this.postefectivo = function (object) {        
        var req = $http.post(uri+'/api/descontar',object);       
        return req;        
    };

});
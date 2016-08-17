app.service("consultaService", function ($http) {

	this.getdiario = function () {        
        var req = $http.get(uri+'/api/credito/diario');       
        return req;        
    };

    this.getcreditofecha = function (finicial,ffinal) {        
        var req = $http.get(uri+'/api/credito/fecha/'+finicial+"/"+ffinal);       
        return req;        
    };

    this.getdiariotarjeta = function () {        
        var req = $http.get(uri+'/api/tarjeta/diario');       
        return req;        
    };

    this.gettarjetafecha = function (finicial,ffinal) {        
        var req = $http.get(uri+'/api/tarjeta/fecha/'+finicial+"/"+ffinal);       
        return req;        
    };

    this.getdiariopanaderia = function (id) {        
        var req = $http.get(uri+'/api/contado/panaderia/diario/'+id);       
        return req;        
    };

    this.gettarjetapanaderia = function (id) {        
        var req = $http.get(uri+'/api/credito/panaderia/diario/'+id);       
        return req;        
    };

    this.getfechaparcialcontado = function (id,finicial,ffinal) {        
        var req = $http.get(uri+'/api/fecha/contado/'+id+"/"+finicial+"/"+ffinal);       
        return req;        
    };

    this.getfechaparcialcredito = function (id,finicial,ffinal) {        
        var req = $http.get(uri+'/api/fecha/credito/'+id+"/"+finicial+"/"+ffinal);       
        return req;        
    };

    this.postCierrecaja = function (object) {        
        var req = $http.post(uri+'/api/cierrecaja',object);       
        return req;        
    };

    this.getdescuento = function (id) {        
        var req = $http.get(uri+'/api/descuento/'+id);       
        return req;        
    };

    this.getcaja = function (id) {        
        var req = $http.get(uri+'/api/totalcaja/'+id);       
        return req;        
    };

    this.getDetallado = function (finicial,idusuario) {        
        var req = $http.get(uri+'/api/detallado/'+finicial+'/'+idusuario);       
        return req;        
    };

    this.getMateriaDetallado = function (finicial,idusuario) {        
        var req = $http.get(uri+'/api/detalle/materia/'+finicial+'/'+idusuario);       
        return req;        
    };

    this.getAlluser = function () {        
        var req = $http.get(uri+'/api/usuario');       
        return req;        
    };

    this.getAllCierrecaja = function (idusuario) {        
        var req = $http.get(uri+'/api/cierre_caja/'+idusuario);       
        return req;        
    };    

});
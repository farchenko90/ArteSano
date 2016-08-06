app.service("configuracionService", function ($http) {

	this.getRestaurante = function () {        
        var req = $http.get(uri+'/api/producto/materia');       
        return req;        
    };

    this.getPanaderia = function () {        
        var req = $http.get(uri+'/api/producto/panaderia');       
        return req;        
    };

    this.getHeladeria = function () {        
        var req = $http.get(uri+'/api/producto/heladeria');       
        return req;        
    };

    this.putRestaurante = function (id,object) {        
        var req = $http.put(uri+'/api/estado/galeria/'+id,object);       
        return req;        
    };

});
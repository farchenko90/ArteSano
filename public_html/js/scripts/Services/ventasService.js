app.service("ventasService", function ($http) {

	this.getId = function (id) {        
        var req = $http.get(uri+'/api/imagen/materia/'+id);       
        return req;        
    };

    this.getIdRestaurante = function (iduser,id) {        
        var req = $http.get(uri+'/api/usuario/'+iduser+'/producto/'+id);       
        return req;        
    };

    this.adicionales = function () {        
        var req = $http.get(uri+'/api/adicional');       
        return req;        
    }; 

    this.adicionalrestaurante= function (id) {        
        var req = $http.get(uri+'/api/adicion/'+id);       
        return req;        
    }; 

    this.adicionalheladeria = function () {        
        var req = $http.get(uri+'/api/heladeria/adicion');       
        return req;        
    }; 

    this.postcredito = function (credito) {        
        var req = $http.post(uri+'/api/credito',credito);       
        return req;        
    };

    this.getMateria = function () {        
        var req = $http.get(uri+'/api/restaurante/materia');       
        return req;        
    }; 

    this.getMateriapanaderia = function () {        
        var req = $http.get(uri+'/api/restaurante/panaderia');       
        return req;        
    };  

    this.putRestarCantidad = function (idpro,iduser,can) {        
        var req = $http.put(uri+'/api/restarcantidad/'+idpro+'/'+iduser+'/'+can);       
        return req;        
    }; 

    this.getUsarioInventario = function (idpro,iduser) {        
        var req = $http.get(uri+'/api/producto/'+idpro+'/usuario/'+iduser);       
        return req;        
    };

});
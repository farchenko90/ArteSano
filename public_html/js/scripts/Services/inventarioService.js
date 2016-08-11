app.service("inventarioService", function ($http) {

	this.putInventario = function (id,object) {        
        var req = $http.put(uri+'/api/inventario/'+id,object);       
        return req;        
    };

    this.postInventario = function (object) {        
        var req = $http.post(uri+'/api/inventario',object);       
        return req;        
    };

    this.getinventariouser = function (id) {        
        var req = $http.get(uri+'/api/usuario/'+id+'/inventario');       
        return req;        
    };

    this.deleteinventario = function (idproducto,idusuario) {        
        var req = $http.delete(uri+'/api/eliminar/inventario/'+idproducto+'/'+idusuario);       
        return req;        
    };

});
app.service("perfilService", function ($http) {

	this.getUsuario = function (id) {        
        var req = $http.get(uri+'/api/usuario/'+id);       
        return req;        
    };

    this.putUsuario = function (id,object) {        
        var req = $http.put(uri+'/api/usuario/'+id,object);       
        return req;        
    };

    this.postperfil = function (formData) {
        
        var req = $http.post(uri+'/api/perfil/imagen'/*+id*/, formData,{transformRequest: angular.identity, 
            headers: {'Content-Type': undefined}});
        console.log(req);
        return req;
        
    };

})
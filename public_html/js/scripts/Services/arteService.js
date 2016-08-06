app.service("arteService", function ($http) {

	this.post = function (login) {        
        var req = $http.post(uri+'/api/login', login);       
        return req;        
    };

    this.galeria = function (id) {        
        var req = $http.get(uri+'/api/galeria/'+id);       
        return req;        
    };

})
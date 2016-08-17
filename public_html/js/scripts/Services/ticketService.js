app.service("ticketService", function ($http) {

	this.getTickets = function (idusuario) {        
        var req = $http.get(uri+'/api/tickets/usuario/'+idusuario);       
        return req;        
    };

});
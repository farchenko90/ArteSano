app.service("ticketService", function ($http) {

	this.getTickets = function (idusuario) {        
        var req = $http.get(uri+'/api/tickets/usuario/'+idusuario);       
        return req;        
    };

    this.deleteTickets = function (idticket) {        
        var req = $http.delete(uri+'/api/credito/'+idticket);       
        return req;        
    };

});
app.controller('ticketController', function ($scope,ticketService) {

	$scope.usuario = session.getNomape();
	$scope.IdUsuario = session.getId();
	$scope.arrayTickets = [];
	$scope.Ticket = [];
	$scope.Ticket2 = {};
	$scope.CurrentDate = new Date();
	$scope.nit = "77.092.443-3";

	loadTickets();	

	function loadTickets(){
        var promiseGet = ticketService.getTickets($scope.IdUsuario); //The Method Call from service

        promiseGet.then(function (pl) {
            $scope.arrayTickets = pl.data;
            //alert(JSON.stringify($scope.arrayTickets))
        },
        
        function (errorPl) {
            console.log('failure loading Tipo', errorPl);
        });   
    }

    $scope.imprimir = function(ticket){
    	$scope.Ticket = ticket.venta;
    	$scope.Ticket2 = ticket;
    	$scope.title = "Impresión del tickets";
        $('#modalticket').openModal();
    }

    $scope.guardar = function(){
    	imprimir();
    }

    function imprimir () {
        
        var data = jQuery('#impresion').html();
            var data = jQuery('#impresion').html();
            var mywindow = window.open('', 'Ticket', 'height=600,width=600');
            mywindow.document.write('<html><head><title>Ticket</title>');
            mywindow.document.write("<link href='https://fonts.googleapis.com/css?family=Inconsolata' rel='stylesheet' type='text/css'>");
            //mywindow.document.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>');
            
            mywindow.document.write('<style type="text/css">');
            mywindow.document.write('@media print {  @page { margin-top: 0mm;margin-left: 1mm;margin-right: 5mm;margin-bottom: 7mm; padding-bottom: 5px;}}');
            mywindow.document.write("body{font-family: 'Arial'};");
            mywindow.document.write('</style></head><body onfocus="javascript:gio();">');
            mywindow.document.write(data);
            //mywindow.document.write('<script type="text/javascript">var ban = true; function gio(){ if(ban){window.print(); ban = false;}}  </script>');
            mywindow.document.write('</body></html>');
            setTimeout(function(){
                mywindow.print();
                
                mywindow.close();
                            
                            
                //location.reload();
            }, 250);
                
    }

});
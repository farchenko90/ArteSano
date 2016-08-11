var uri = "../public";
var gl_resultado = {};
var app;
(function(){
    app = angular.module("inicio", ['ngRoute','ng-currency','ui.keypress','ngTable']);
    
    app.config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider){
            
            $routeProvider
                .when('/inicio', {
                    templateUrl: 'pages/inicio.html'
                })
                .when('/producto', {
                    templateUrl: 'pages/producto.html'
                })
                .when('/ventas', {
                    templateUrl: 'pages/ventas.html'
                })
                .when('/bienvenida', {
                    templateUrl: 'pages/bienvenida.html'
                })
                .when('/productospanaderia', {
                    templateUrl: 'pages/productopanaderia.html'
                })
                .when('/productosheladeria', {
                    templateUrl: 'pages/productoheladeria.html'
                })
                .when('/perfil', {
                    templateUrl: 'pages/perfil.html'
                })
                .when('/consultasdiaria', {
                    templateUrl: 'consultas/consultadiaria.html'
                })
                .when('/consultasdefechas', {
                    templateUrl: 'consultas/consultafecha.html'
                })
                .when('/consulta/parcialdiaria', {
                    templateUrl: 'consultas/consultaparcialdiaria.html'
                })
                .when('/consulta/parcialfecha', {
                    templateUrl: 'consultas/consultaparcialfecha.html'
                })
                .when('/configuracion', {
                    templateUrl: 'pages/configuracion.html'
                })
                .when('/caja', {
                    templateUrl: 'pages/caja.html'
                })
                .when('/inventario', {
                    templateUrl: 'pages/inventario.html'
                })
                .otherwise({
                    redirectTo:"bienvenida"
                }); 
            
    }]);

    app.directive('uploaderModel',['$parse',function($parse){
        return{
            restrict: 'A',
            link: function(scope,iElement,iAttrs){
                iElement.on('change',function(e)
                {
                    $parse(iAttrs.uploaderModel).assign(scope,iElement[0].files[0]);
                });
            }
        };

    }]);

})();
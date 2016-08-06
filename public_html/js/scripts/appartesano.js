var uri = "../public";
var rutasesion = "../public_html";
var gl_resultado = {};
var app;
(function(){
    app = angular.module("artesano", ['ngRoute','ng-currency','ui.keypress']);
    
    app.config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider){
            
            $routeProvider
                .when('/inicio', {
                    templateUrl: 'pages/inicio.html'
                })
                .otherwise({
                    redirectTo:"inicio"
                });
                    
            
    }]);

})();
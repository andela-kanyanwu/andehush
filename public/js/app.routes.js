var app = angular.module('AppRoutes', []);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider

    //home page
    .when('/', {
      templateUrl: '../index.html',
      controller: 'UserController'
    });

    $locationProvider.html5Mode(true);

}])
var app = angular.module('AppRoutes', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider

    //index
    .when('/', {
      templateUrl: '../views/home.html',
      controller: 'UserController'
    })

    //listener registeration page
    .when('/becomeListener', {
      templateUrl: '../views/register.listener.html',
      controller: 'UserController'
    })

    $locationProvider.html5Mode(true);

}])
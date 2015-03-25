var app = angular.module('AppRoutes', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
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

  .when('/chat/:roomName', {
    templateUrl: '../views/chat.html',
    controller: 'ChatController'
  })

  .when('/login', {
    templateUrl: '../views/login.html',
    controller: 'UserController'
  })

  .when('/profile', {
    templateUrl: '../views/profile.html',
    controller: 'UserController'
  })

  .when('/listeners', {
    templateUrl: '../views/listeners.html',
    controller: 'UserController'
  })
  .otherwise ({ 
    redirectTo: '../views/home.html' 
  });

  $locationProvider.html5Mode(true);

}]);

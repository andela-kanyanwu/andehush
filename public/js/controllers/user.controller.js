var app = angular.module('UserCtrl', ['UserService']);

app.controller('UserController',['$scope', 'UserFactory', function($scope, UserFactory){

  $scope.registerListener = function(){
    var listenerInfo = {
      username: $scope.listenerUsername,
      password: $scope.listenerPassword,
      secret: $scope.listenerSecret
    }

    UserFactory.create(listenerInfo).success(function(data){
      console.log(data);
    }).
    error(function(data, status){
      console.log("Error: ", data, status);
    });
  }
}]);
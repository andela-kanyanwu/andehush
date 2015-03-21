var app = angular.module('UserCtrl', ['UserService']);

app.controller('UserController', ['$scope', 'UserFactory', function($scope, UserFactory) {

  $scope.registerListener = function() {

    var listenerInfo = {
      username: $scope.listenerUsername,
      password: $scope.listenerPassword,
      secret: $scope.listenerSecret
    }

    if (($scope.listenerUsername !== undefined) && ($scope.listenerPassword !== undefined) && ($scope.listenerSecret !== undefined)) {

      UserFactory.create(listenerInfo).success(function(data) {
        $scope.message = "Account successfully created";
        console.log(data);
        $scope.nameErr = data.code;

      }).error(function(data, status) {
        console.log("Error: ", data, status);
      });
    }   
  }
}]);

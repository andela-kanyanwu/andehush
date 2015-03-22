var app = angular.module('UserCtrl', ['UserService']);

app.controller('UserController', ['$scope', 'UserFactory', '$location', function($scope, UserFactory, $location) {

  $scope.registerListener = function() {

    var listenerInfo = {
      username: $scope.listenerUsername,
      password: $scope.listenerPassword,
      secret: $scope.listenerSecret
    }

    //check if any text field is left blank
    $scope.textBoxUndefined = ($scope.listenerUsername === undefined) || ($scope.listenerPassword === undefined) || ($scope.listenerSecret === undefined);

    //Continue if no text field is left blank
    if (!$scope.textBoxUndefined) {

      UserFactory.create(listenerInfo).success(function(data) {
        $scope.message = "Account successfully created";
        console.log(data);
        $scope.nameErr = data.code;

      }).error(function(data, status) {
        console.log("Error: ", data, status);
      });
    }
    $scope.listenerUsername = undefined;
    $scope.listenerPassword = undefined; 
    $scope.listenerSecret = undefined;  
  }

  $scope.redirect = function(){
    window.location = "/#/chat";
  }
}]);

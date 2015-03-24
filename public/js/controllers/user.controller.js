var app = angular.module('UserCtrl', ['UserService']);

app.controller('UserController', ['$scope', 'UserFactory', '$location', function($scope, UserFactory, $location) {

  $scope.registerListener = function() {

    $scope.message = "";

    var listenerInfo = {
        username: $scope.listenerUsername,
        password: $scope.listenerPassword
      }
      //check if any text field is left blank
    $scope.textBoxUndefined = ($scope.listenerUsername === undefined) || ($scope.listenerPassword === undefined);

    //Continue if no text field is left blank
    if (!$scope.textBoxUndefined) {

      UserFactory.create(listenerInfo).success(function(data) {
        if (data.status == 201) {
          window.location = "/#/profile";
        }
        $scope.message = "Account successfully created";
        $scope.nameErr = data.code;

      }).error(function(data, status) {
        console.log("Error: ", data, status);
      });
    }
    $scope.listenerUsername = undefined;
    $scope.listenerPassword = undefined;
  }


  $scope.login = function() {

    var listenerInfo = {
      username: $scope.listenerUsername,
      password: $scope.listenerPassword
    }
    UserFactory.login(listenerInfo).success(function(data) {
      console.log(listenerInfo);
      console.log(data.status);
      window.location = "/#/profile";
    }).error(function(data, status) {
      console.log("Error: ", data, status);
    });
  };

  //redirect to chat window on click of the chat button
  $scope.redirect = function() {
    window.location = "/#/chat";
  }
}]);

var app = angular.module('UserCtrl', ['UserService']);

app.controller('UserController', ['$scope', 'UserFactory', '$location', '$rootScope', function($scope, UserFactory, $location, $rootScope) {

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
          $location.path("/profile");
          $root
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
      console.log("user login :", data);
      console.log("status: ", data.status);
      if (data.status === 200) {
        $location.path("/profile");
        console.log(data.user.username);
        $rootScope.userDetails = data.user.username;
      } else {
        $location.path("/login")
      }
    }).error(function(data, status) {
      console.log("Error: ", data, status);
    });
  };


  //redirect to chat window on click of the chat button
  $scope.redirect = function() {
    $location.path("/chat");
  }

}]);

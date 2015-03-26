var app = angular.module('andehush.controllers');

app.controller('UserController', ['$scope', 'User', '$location', '$window', '$rootScope', '$route', '$templateCache', function($scope, User, $location, $window, $rootScope, $route, $templateCache) {

  if ($window.sessionStorage["userDetails"]) {
    $rootScope.userDetails = JSON.parse($window.sessionStorage["userDetails"]);
  }


  $scope.registerListener = function() {

    var listenerInfo = {
      username: $scope.listenerUsername,
      password: $scope.listenerPassword
    }
    $scope.textBoxUndefined = ($scope.listenerUsername === undefined) || ($scope.listenerPassword === undefined);

    if (!$scope.textBoxUndefined) {

      User.create(listenerInfo).success(function(data) {
        if (data.status == 201) {
          $rootScope.nameErr = data.name;
          $rootScope.userDetails = data.user.username;
          $window.sessionStorage["userDetails"] = JSON.stringify(data.user);
          $location.path("/profile");
        }
        console.log(data.name);

      }).error(function(data, status) {
        console.log("Error: ", data, status);
      });
    }
  }

  $scope.login = function() {

    var listenerInfo = {
      username: $scope.listenerUsername,
      password: $scope.listenerPassword
    }

    User.login(listenerInfo).success(function(data) {
      if (data.status === 200) {
        $location.path("/profile");
        console.log(data.user.username);
        $rootScope.userDetails = data.user.username;
        $window.sessionStorage["userDetails"] = JSON.stringify(data.user);
      } else {
        $location.path("/login")
      }
    }).error(function(data, status) {
      console.log("Error: ", data, status);
      $scope.error = status;
    });
  };

  $scope.logout = function() {
    $window.sessionStorage.clear();
    $location.path("/");
    $window.location.reload();
  }

  $scope.getListeners = function() {
    User.get().success(function(data) {
      $scope.listeners = data;
    }).error(function(data, status) {
      console.log("Error: ", data, status);
    })
  }

}]);

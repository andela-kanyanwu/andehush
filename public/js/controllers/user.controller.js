var app = angular.module('UserCtrl', ['UserService']);

app.controller('UserController', ['$scope', 'UserFactory', '$location','$window','$rootScope', '$route', '$templateCache', function($scope, UserFactory, $location, $window, $rootScope, $route, $templateCache) {

  if($window.sessionStorage["userDetails"]){
    $rootScope.userDetails = JSON.parse(  $window.sessionStorage["userDetails"] );
  }
  

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
          $rootScope.userDetails = data.user.username;
          $window.sessionStorage["userDetails"] = JSON.stringify( data.user );
          $location.path("/profile");
        }

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

    UserFactory.login(listenerInfo).success(function(data) {
      console.log("user login :", data);
      console.log("status: ", data.status);
      if (data.status === 200) {
        $location.path("/profile");
        console.log(data.user.username);
        $rootScope.userDetails = data.user.username;
        $window.sessionStorage["userDetails"] = JSON.stringify( data.user );
      } else {
        $location.path("/login")
      }
    }).error(function(data, status) {
      console.log("Error: ", data, status);
    });
  };

  $scope.logout = function() {
    $window.sessionStorage.clear();
    $location.path("/");
    $window.location.reload();
  }

  $scope.redirect = function() {
    $location.path("/listeners");
  }

  $scope.getListeners = function() {
    UserFactory.get().success(function(data){
      $scope.listeners = data;
    }).error(function(data, status){
      console.log("Error: ", data, status);
    })
  }

  // $scope.changeLink = function() {
  //   $location.path("/chat");
  //   console.log($scope.listeners);
  // }

}]);

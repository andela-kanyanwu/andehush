var app = angular.module('UserCtrl', ['UserService']);

app.controller('UserController',['$scope', 'UserFactory', function($scope, UserFactory){

  $scope.users = function(){
    UserFactory.get().success(function(reply){
      console.log(reply)
      }).error(function(err){
      console.log(err);
    })
    console.log("clicked");
  } 
}]);
var app = angular.module('UserService', []);

app.factory('UserFactory', ['$http', function($http){
  return {
    //gets all the users
    get: function() {
      return $http.get('/api/users');
    },

    //creates a new user
    create: function(listenerInfo){
      return $http.post('/api/users/new', listenerInfo);
    },

    //get a single user
    getSingleUser: function(){
      return $http.get('/api/users/:user_id');
    },

    //update a user's info
    editUserInfo: function(){
      return $http.update('/api/users/:user_id');
    },

    //deletes a user info
    deleteUser: function(){
      return $http.delete('/api/users/:user_id');
    }
  }
}]);
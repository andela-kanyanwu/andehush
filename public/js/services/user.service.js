var app = angular.module('UserService', []);

app.factory('UserFactory', ['$http', function($http) {
  return {
    //gets all the users
    get: function() {
      return $http.get('/users');
    },

    //creates a new user
    create: function(listenerInfo) {
      return $http.post('/users/new', listenerInfo);
    },

    login: function(listenerInfo) {
      return $http.post('/users/login', listenerInfo);
    },

    //get a single user
    getSingleUser: function(user_id) {
      return $http.get('/users/' + user_id);
    },

    //update a user's info
    editUserInfo: function() {
      return $http.update('/users/:user_id');
    },

    //deletes a user info
    deleteUser: function() {
      return $http.delete('/users/:user_id');
    }
  }
}]);

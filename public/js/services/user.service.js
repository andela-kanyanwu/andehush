var app = angular.module('andehush.services', []);

app.factory('User', ['$http', '$window', function($http, $window) {

  return {
    get: function() {
      return $http.get('/users');
    },

    create: function(listenerInfo) {
      return $http.post('/users/new', listenerInfo);
    },

    login: function(listenerInfo) {
      return $http.post('/users/login', listenerInfo);
    },

    getSingleUser: function(user_id) {
      return $http.get('/users/' + user_id);
    },

    editUserInfo: function() {
      return $http.update('/users/:user_id');
    },

    isLoggedIn: function () {
      return $window.sessionStorage.userDetails;
    },

    deleteUser: function() {
      return $http.delete('/users/:user_id');
    }
  }
}]);

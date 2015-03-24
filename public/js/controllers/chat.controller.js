var app = angular.module('ChatCtrl', []);

app.controller('ChatController', ['$scope', function($scope) {
  var socket = io();

  $scope.msgs = [];

  $scope.chat = function() {
    socket.emit('chat message', $scope.chatInput);
    $scope.chatInput = "";
  }

  console.log(socket);
  socket.on('get msg', function(data) {
    $scope.msgs.push(data);
    $scope.$digest();
  });
}]);

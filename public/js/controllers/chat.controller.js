var app = angular.module('ChatCtrl', []);

app.controller('ChatController', ['$scope', function($scope) {
  //redirect to chat window on click of the chat button

  var socket = io();

  $scope.msgs = [];

  $scope.chat = function() {
    socket.emit('chat message', $scope.chatInput);
    $scope.chatInput = "";
    event.preventDefault();
  }

  console.log(socket);
  socket.on('get msg', function(data) {
    $scope.msgs.push(data);
    $scope.$digest();
  });
}]);

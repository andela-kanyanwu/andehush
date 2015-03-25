var app = angular.module('ChatCtrl', []);

app.controller('ChatController', ['$scope', '$routeParams', '$timeout', function($scope, $routeParams, $timeout) {
  //redirect to chat window on click of the chat button

  var socket = io();
  var name = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  $scope.chatInput = '';
  $scope.msgs = [];
  $scope.room_name = $routeParams.roomName;
  $scope.chat_content = {
    username: name
  };
  $scope.chat = function() {
    event.preventDefault();
    $scope.chat_content.msg = $scope.chatInput;
    $scope.chat_content.room = $scope.room_name;
    socket.emit('chat message', $scope.chat_content);
    $scope.chatInput = "";

  }

  console.log(socket);
  socket.on('get msg', function(data) {
    console.log(data);
    $timeout(function() {
      $scope.msgs.push(data);
    });
  });
}]);

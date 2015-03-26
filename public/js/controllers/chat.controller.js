var app = angular.module('andehush.controllers');

app.controller('ChatController', ['$scope', '$routeParams', '$timeout', '$window', 'Chat', 'User', function($scope, $routeParams, $timeout, $window, Chat, User) {

  $scope.msgs = [];

  var socket;
  var name;

  var roomKey;
  var chatRequest = {};

  $scope.chats = {};

  $scope.isLoggedIn = User.isLoggedIn();
  $scope.init = function() {
    $scope.chatInput = "";
    $scope.roomName = $routeParams.roomName;

    name = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    socket = window.io();

    $scope.chatContent = {
      username: name,
      room: $scope.roomName,
    };

    if ($scope.isLoggedIn) {
      socket.on('chat-request', function(data) {
        var req = data[$scope.roomName];
        roomKey = req.roomKey
        $timeout(function() {
          console.log($scope.chats);
          $scope.chats[roomKey] = {
            chats: [],
            from: req.username,
            roomKey: roomKey
          };
        });
      });

    } else {
      roomKey = Chat.getRoomKey($scope.roomName);
      $scope.chatContent.roomKey = roomKey;
      chatRequest[$scope.roomName] = angular.copy($scope.chatContent);
      console.log(chatRequest);
      socket.emit('chat-request', chatRequest);
    }

    socket.on('get msg', function(data) {
      $timeout(function() {
        $scope.msgs.push(data);
        console.log(data);
      });
    });

  };

  $scope.chat = function() {

    $scope.chatContent.msg = $scope.chatInput;
    socket.emit('chat message', $scope.chatContent);
    $scope.chatInput = "";
  };

  $scope.init();

}]);

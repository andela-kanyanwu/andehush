var express = require('express'),
  app = express(),
  http = require('http').Server(app),
  io = require('socket.io')(http),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Chat = require('./app/models/chat.model');

module.exports = function(io) {

  //var clients = {};
  // io.sockets.on('connection', function (socket) {
  //   clients[socket.id] = socket;
  //   socket.on('chat message', function(data) {
  //     var newChat = new Chat({"chatMsg": data.msg, "room": data.room, "username":data.name});
  //     newChat.save(function() {
  //       var socket = clients[sId];
  //       socket.emit('get msg', data);
  //     });
  //   });
  // });

  io.on('connection', function(socket) {
    socket.on('chat message', function(data) {

      var newChat = new Chat({
        "message": data.msg,
        "room": data.room,
        "username": data.name
      });
      newChat.save(function(err) {
        if (err) {
          console.log("chat error at server: ", err);
        } else {
          io.sockets.emit('get msg', data);
        }
      });
    });
   
    socket.on('chat-request', function(data) {
      io.sockets.emit('chat-request', data);
    });
  });
};




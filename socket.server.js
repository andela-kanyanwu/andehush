var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Chat = require('./app/models/chat.model');

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
      console.log("socket at socket server.js: ", data);

      var newChat = new Chat({
        "message": data.msg,
        "room": data.room,
        "username": data.name
      });
      newChat.save(function(err) {
        if (err) {
          console.log("chat error at server: ", err);
        } else {
          console.log("data, ", data);
          io.sockets.emit('get msg', data);
        }
      });
    });

   
    socket.on('chat-request', function(data) {
      console.log('chat-request sender');
      io.sockets.emit('chat-request', data);
    });
  });
};




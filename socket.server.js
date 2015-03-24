var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Chat = require('./app/models/chat.model');

// //for the chat app ================================
// // var nsp = io.of('/private-chat');
// // nsp.on('connection', function(socket){
// //   console.log(socket.nsp.server.engine.clientsCount);
// //   console.log('someone connected'); 
// //   socket.on('chat message', function(data){
// //     console.log(data);
// //     nsp.emit('get msg', data);
// //   });
// // });

module.exports = function( io ) {
  io.on('connection', function(socket) {
    console.log(socket.nsp.server.engine.clientsCount);
    socket.on('chat message', function(data) {
      console.log("socket at socket server.js: ", data);

      var newChat = new Chat({"chatMsg": data});
      newChat.save(function(err){
        if (err) {
          console.log("chat error at server: ", err);
        }
        else {
          io.sockets.emit('get msg', data);
        }
      });
    });
  });
}



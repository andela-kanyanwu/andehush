var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

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
      console.log(data);
      io.sockets.emit('get msg', data);
    });
  });
}

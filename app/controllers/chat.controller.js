var Chat = require('../models/chat.model');

var newChat = {

  createChat: function(req, res, next) {
    var chatObj = {
      username: req.body.username,
      chatMsg: req.body.chatMsg
    };

    Chat.create(chatObj, function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
      next();
    });
  },

  getChat: function(req, res) {
    Chat.find(function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
     
    });
  }

}
module.exports = newChat;

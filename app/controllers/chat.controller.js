var Chat = require('../models/chat.model');

var newChat = {
  getChat: function(req, res, next) {
    Chat.find(function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
      next();
    });
  }

}
module.exports = newChat;
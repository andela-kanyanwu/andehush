var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatSchema = new Schema({
  room: String,
  roomId: String,
  username: String,
  message: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Chat', chatSchema);

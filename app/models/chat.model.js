var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatSchema = new Schema({
  room: String,
  username: String,
  chatMsg: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Chat', chatSchema);
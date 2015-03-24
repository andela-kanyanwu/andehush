var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatSchema = new Schema({
  username: { 
    type: String, 
    unique: true
  },
  chatMsg: Object,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', chatSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var onlineSchema = new Schema({
  user: {ref: 'User',
  unique: true},
  socketId: String
});

module.exports = mongoose.model('OnlineUser', onlineSchema);
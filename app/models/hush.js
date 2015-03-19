var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String,
  createdDate: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('User', userSchema);

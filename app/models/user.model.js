var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { 
    type: String, 
    unique: true
  },
  password: String,
  secret: String,
  //status: String,
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);


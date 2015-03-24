var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

var userSchema = new Schema({
  username: { 
    type: String, 
    unique: true
  },
  password: String,
  // secret: String,
  //status: String,
  createdDate: {
    type: Date,
    default: Date.now
  }
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);


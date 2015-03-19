var User = require('../models/user.model');

 var newUser = {

  addUser: function(req, res, next) {

    var userObj = {
      username: req.body.username,
      password: req.body.password,
      secret: req.body.secret
    };

    User.create(userObj, function(err, data) {
      if (err) {
        res.send(err);
      }
      res.json(data);

      next();
    });
  },

  listUsers: function(req, res) {
    User.find(function(err, Users){
      if (err) {
        res.send(err);
      }
      res.json(Users);
    })   
  }
}

module.exports = newUser;

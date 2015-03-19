var User = require('../models/user.model');

module.exports = {

  addUser: function(req, res ) {

    var newUser = {
      username: req.body.username,
      password: req.body.password,
      secret: req.body.secret
    };



    User.create( newUser, function(err, data) {
      if (err) {
        res.send(err);
      }

      res.json(data);
    });
  }
}

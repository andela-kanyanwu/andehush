var User = require('../models/user.model');

var newUser = {
  
  listUsers: function(req, res) {

    User.find(function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
    });
  },

  getUserInfo: function(req, res, next) {

    User.findById(req.params.user_id, function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
      next();
    });
  },

  editUserInfo: function(req, res, next) {

    User.findById(req.params.user_id, function(err, user) {
      if (err) {
        res.send(err);
      }

      else if (user === null) {
        res.json({
          message: 'User does not exist'
        })
      }

      else {
        user.username = req.body.username;
        user.password = req.body.password;
        user.secret = req.body.secret;

        user.save(function(err) {
          if (err) {
            res.send(err);
          } else {
            res.json(user);
          }
          next();
        });
      }
    });
  },

  deleteUser: function(req, res, next) {

    User.findById(req.params.user_id, function(err, user) {
      if (err) {
        res.send(err);
      }

      else if (user === null) {
        res.json({
          message: 'User does not exist'
        })
      }

      else {
        user.remove(function(err) {
          if (err) {
            res.send(err);
          }

          res.json({
            message: 'Successfully deleted'
          });
          next();
        });
      }
    });
  }
}

module.exports = newUser;

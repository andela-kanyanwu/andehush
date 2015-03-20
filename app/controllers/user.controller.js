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

      else{
        res.json(data);
      } 
      next();
    });
  },

  listUsers: function(req, res, next) {

    User.find(function(err, data) {
      if (err) {
        res.send(err);
      }

      else{
        res.json(data);
      }
      next();
    });
  },

  getUserInfo: function(req, res, next) {

    User.findById(req.params.user_id, function(err, data) {
      if (err) {
        res.send(err);
      }

      else{
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

      //check if user does not exist
      else if (user === null) {
        res.json({message: 'User does not exist'})
      }

      //update all user info
      else{
        user.username = req.body.username;
        user.password = req.body.password;
        user.secret = req.body.secret;

        //save the user info
        user.save(function(err) {
          if (err) {
            res.send(err);
          }

          else{
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

      //check if user does not exist
      else if (user === null) {
        res.json({message: 'User does not exist'})
      }

      //else delete the user
      else {
        user.remove(function(err){
          if (err) {
            res.send(err);
          }

          res.json({ message: 'Successfully deleted' });
          next();
        });
      }
    });
  }
}

module.exports = newUser;

var express = require('express');
var User = require('../controllers/user.controller');
var router = express.Router();
var passport = require('passport');
var path = require('path');


//create/register new user
// router.post('/users/new', User.addUser);

// get list of users registered in the database


router.get('/users', User.listUsers);

//login
// router.post('/users/login', User.login);

//get a single user
router.get('/users/:user_id', User.getUserInfo);

//Edits and updates user's info
router.put('/users/:user_id', User.editUserInfo);

//Deletes user's info
router.delete('/users/:user_id', User.deleteUser);

// process the signup form
router.post('/users/new', passport.authenticate('local-signup', {
  failureRedirect: '/users/new',
}), function(req, res) {
  res.status(201).json({
    msg: "created successfully",
    status: 201, 
    user: req.user
  });
});

router.post('/users/login', passport.authenticate('local-login', {
  failureRedirect: '/users/login',
  failureFlash: true
}), function(req, res) {
  res.status(200).json({
    msg: "login successfully",
    status: 200,
    user: req.user
  })
});



module.exports = router;

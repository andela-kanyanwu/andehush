var express = require('express');
var User = require('../controllers/user.controller');
var router = express.Router();
var passport = require('passport');
var path = require('path');


router.get('/users', User.listUsers);

router.get('/users/:user_id', User.getUserInfo);

router.put('/users/:user_id', User.editUserInfo);

router.delete('/users/:user_id', User.deleteUser);

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

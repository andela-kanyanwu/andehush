var express = require('express');

var router = express.Router();

var User = require('../controllers/user.controller');

//create/register new user
router.post('/users/new', User.addUser);

// get list of users registered in the database
router.get('/users', User.listUsers);

//get a single user
router.get('/users/:user_id', User.getUserInfo);

module.exports = router;

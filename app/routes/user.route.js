var express = require('express');

var router = express.Router();

var User = require('../controllers/user.controller');

//create/register new user
router.post('/user/new', User.addUser);

// get list of users registered in the database
router.get('/users', User.listUsers);

module.exports = router;

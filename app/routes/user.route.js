var express = require('express');

var User = require('../controllers/user.controller');

var router = express.Router();

//create/register new user
router.post('/user/new', User.addUser);

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/user', function(req, res) {
  res.json({
    message: 'hooray! welcome to our api!'
  });
});

module.exports = router;

var express = require('express');

var router = express.Router();

var User = require('../models/hush');

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/user', function(req, res) {
  res.json({
    message: 'hooray! welcome to our api!'
  });
});

router.post('/user/new', function(req, res) {

  User.create({
    username: req.body.username,
    password: req.body.password
  }, function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
});

module.exports = router;

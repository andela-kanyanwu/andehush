var express = require('express');

var router = express.Router();

var User = require('../controllers/user.controller');

//create/register new user
router.post('/users/new', User.addUser);

// get list of users registered in the database
router.get('/users', User.listUsers);

//get a single user
router.get('/users/:user_id', User.getUserInfo);

//Edits and updates user's info
router.put('/users/:user_id', User.editUserInfo);

//Deletes user's info
router.delete('/users/:user_id', User.deleteUser);

// frontend routes =========================================================
// route to handle all angular requests
router.get('*', function(req, res) {
    res.sendfile('../../public/views/home.html'); // load our public/index.html file
});

module.exports = router;

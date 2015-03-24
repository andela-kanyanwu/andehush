var express = require('express');
var Chat = require('../controllers/chat.controller');
var router = express.Router();
var path = require('path');

router.get('/users', Chat.getChat);
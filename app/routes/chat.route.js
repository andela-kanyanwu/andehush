var express = require('express');
var Chat = require('../controllers/chat.controller');
var router = express.Router();
var path = require('path');

router.post('/chats/new', Chat.createChat);
router.get('/chats', Chat.getChat);

module.exports = router;
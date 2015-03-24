//modules =================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var router = express.Router();
var cookieParser = require('cookie-parser');
var session = require('express-session');

// set our port
var port = process.env.PORT || 8080;

// config files
var db = require('./config/db');

// connect to our database
var testCon = mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

app.use(passport.initialize());


// ROUTES FOR OUR API
// =============================================================================
var userRoute = require('./app/routes/user.route');

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', userRoute);

// frontend routes =========================================================
// route to handle all angular requests
app.get('*', function(req, res) {
  res.sendFile( __dirname + '/public/index.html'); // load our public/index.html file
});


app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

// required for passport
app.use(session({
  secret: 'ilovescotchscotchyscotchscotch'
})); // session secret
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./config/passport')(passport); // pass passport for configuration

//start port================================
http.listen(8080, function() {
  console.log('listening on *:8080');
});

//for the chat app ================================
// var nsp = io.of('/private-chat');
// nsp.on('connection', function(socket){
//   console.log(socket.nsp.server.engine.clientsCount);
//   console.log('someone connected'); 
//   socket.on('chat message', function(data){
//     console.log(data);
//     nsp.emit('get msg', data);
//   });
// });


io.on('connection', function(socket) {
  console.log(socket.nsp.server.engine.clientsCount);
  socket.on('chat message', function(data) {
    console.log(data);
    io.sockets.emit('get msg', data);
  });
});

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;

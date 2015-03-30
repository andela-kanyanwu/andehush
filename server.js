var express = require('express'),
   app = express(),
   bodyParser = require('body-parser'),
   methodOverride = require('method-override'),
   mongoose = require('mongoose'),
   http = require('http').Server(app),
   passport = require('passport'),
   flash = require('connect-flash'),
   morgan = require('morgan'),
   router = express.Router(),
   cookieParser = require('cookie-parser'),
   session = require('express-session'),
   io = require('socket.io')(http),
   db = require('./config/db');

//set default environment to development
// var env = process.env.NODE_ENV || 'development';
// console.log(env);

//var port = process.env.PORT || 8080;
app.set('port', (process.env.PORT || 8080));

// if (env === 'development') {
//   mongoose.connect(db.localUrl);
// }
// else {
  mongoose.connect(db.productionUrl);
// }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());

var userRoute = require('./app/routes/user.route');
var chatRoute = require('./app/routes/chat.route');

app.use('/', userRoute);
app.use('/', chatRoute);

app.get('*', function(req, res) {
  res.sendFile( __dirname + '/public/index.html'); 
});

app.use(morgan('dev')); 
app.use(cookieParser()); 

app.use(session({
  secret: 'ilovescotchscotchyscotchscotch'
})); 
app.use(passport.session()); 
app.use(flash());

require('./config/passport')(passport); 

http.listen(app.get('port'), function() {
  console.log('listening on *:8080');
});

require('./socket.server')(io);
        
exports = module.exports = app;

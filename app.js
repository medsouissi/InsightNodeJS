var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var quotesRouter = require('./routes/quotes');
var homeRouter = require('./routes/home');
var loginRouter = require('./routes/login')
var signupRouter = require('./routes/signup')
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const session = require('express-session')
const markdown = require('marked')
const sanitizeHTML = require('sanitize-html')
var cookieParser = require('cookie-parser');
const mysql = require('mysql2/promise');
var MySQLStore = require('express-mysql-session')(session);

const options = {                 // setting connection options
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'insight',
};



const sessionStore = new MySQLStore(options);

app.use(
  session({
      secret: 'cookie_secret',
      resave: false,
      saveUninitialized: false,
      store: sessionStore,      // assigning sessionStore to the session
      cookie: {
        secure: false,
        maxAge: 36000000,
        httpOnly: false,
      }
  })
);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/quotes', quotesRouter);
app.use('/home', homeRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
module.exports = app;

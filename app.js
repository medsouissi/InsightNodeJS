var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require('connect-flash')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var quotesRouter = require('./routes/quotes');
var homeRouter = require('./routes/home');
var loginRouter = require('./routes/login')
var signupRouter = require('./routes/signup')
var signoutRouter = require('./routes/signout')
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash())

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

app.use(function (req, res, next) {
    //make our makdown available from within ejs templates
    res.locals.filterUserHTML = function (content) {
        return sanitizeHTML(markdown(content), { allowedTags: false, allowedAttributes: false })
    }

    //make all error and success flash messages available from all templates
    res.locals.errors = req.flash("errors")
    res.locals.success = req.flash("success")
    //make current user id available from current request
    if (req.session.user) {
        req.visitorId = req.session.user._id
    } else {
        req.visitorId = 0
    }

    // Making user session data available to view templates
    res.locals.user = req.session.user
    next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/quotes', quotesRouter);
app.use('/home', homeRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/signout', signoutRouter);
module.exports = app;

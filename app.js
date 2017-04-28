var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');
var knex = require('./db/knex');


var index = require('./routes/index');
var users = require('./routes/users');
var suggestions = require('./routes/suggestions');
var dash = require('./routes/dash');
var expressLayouts = require('express-ejs-layouts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser("secret"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(expressLayouts);
app.use('/', index);
app.use('/users', users);
app.use('/suggestions', suggestions);
app.use('/dash', dash);

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    if (req.user[0].role == 2) {
      if (req.cookies.accepted_meal) {
        res.cookie('login', true, {signed: true});
        res.redirect(`/users/${req.user[0].id}/view_dinner`)
      } else {
        res.cookie('login', true, {signed: true});
        res.redirect(`/users/${req.user[0].id}/suggest_dinner`)
      }
    } else if (req.user[0].role == 1) {
      res.cookie('login', true, {signed: true});
      res.redirect(`/suggestions`)
    // res.redirect(`/users/${req.user[0].id}/suggest_dinner`)
    }
  });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


// find the user in the database based on their facebook id

passport.use(new FacebookStrategy({
    clientID: "309208669499789",
    clientSecret: "cae59039922d1f6f197fc53e5c041ec5",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous
    process.nextTick(function() {
      knex('users').select()
        .where('name', profile.displayName)
        .asCallback(function(err, user) {
          if(err) {
            console.log('is error')
            return done(err)
          };
          if(user.length > 0) {
            console.log('found user', user)
            return done(null, user);
          } else {
            console.log('will make user')
            knex('users').insert({
              name: profile.displayName
            }).asCallback(function(err, data) {
              knex('users').select().where('name', profile.displayName).then(function(user) {
                done(null, user);
              })
            });
          }
        });
    });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(id, done) {
    done(null, id);
});

module.exports = app;

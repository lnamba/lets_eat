var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    layout: 'layout.ejs'
  });
});


//Route for setting the cookie upon login
router.post('/', function(req, res, next) {
  knex.raw(`SELECT * FROM users WHERE email = '${req.body.email}'`).then(function(user) {
    console.log(user.rows[0]);
    if (user.rows[0].role === 2) {
      if (req.cookies.accepted_meal) {
        res.cookie('login', true, {signed: true});
        res.redirect(`/users/${user.rows[0].id}/view_dinner`)
      } else {
        res.cookie('login', true, {signed: true});
        res.redirect(`/users/${user.rows[0].id}/suggest_dinner`)
      }
    } else if (user.rows[0].role === 1) {
      res.cookie('login', true, {signed: true});
      res.redirect(`/suggestions/${user.rows[0].id}`)
    } else if (user.rows[0].role === 3) {
      res.cookie('login', true, {signed: true});
      res.cookie('superuser', true, {signed: true})
      res.redirect(`/dash/${user.rows[0].id}`)
    } else {
      res.redirect('/')
    }
  });
});


//Route for logout function
router.get('/logout', function(req, res, next) {
  res.clearCookie("login");
res.render("/", {button_text: "log in", notice: "You must sign in again to view your dinner plans"});
});


//route for the form on the add user page
router.post('/signup', function (req, res, next) {
  knex.raw(`INSERT into users (email, password, name, about, role) values ('${req.body.email}', '${req.body.password}', '${req.body.name}', '${req.body.about}', 2)`)
  .then(function (val) {
    knex.raw(`SELECT * from users WHERE email='${req.body.email}'`)
    .then(function(user) {
    if (req.cookies.accepted_meal) {
      res.cookie('login', true, {signed: true});
      res.redirect(`/users/${user.rows[0].id}/view_dinner`)
    } else {
      res.cookie('login', true, {signed: true});
      res.redirect(`/users/${user.rows[0].id}/suggest_dinner`)
      }
    });
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('auth/index');
});


//Route for setting the cookie upon login
router.post('/', function(req, res, next) {
  res.cookie("login", true, {signed: true});
  res.redirect('/users/');
});


//Route for logout function
router.get('/logout', function(req, res, next) {
  res.clearCookie("login");
res.render("auth/", {button_text: "log in", notice: "You must sign in again to view your dinner plans"});
});


//Route if user tries to get into unauthorized area
// router.get('/unauthorized', function(req, res, next) {
//     res.render("auth/");
// });

module.exports = router;

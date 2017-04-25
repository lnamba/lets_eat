var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('login/index');
});

router.post('/', function(req, res, next) {
  res.redirect('/users')
});

router.get('/logout', function(req, res, next) {
  res.redirect('/login')
})

module.exports = router;

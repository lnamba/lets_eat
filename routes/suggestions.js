var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET users listing. */
// Only admin can see this list of all suggestions
router.get('/', function(req, res, next) {
  knex.raw(`SELECT * FROM suggestions`).then(function(payload) {
    knex.raw(`SELECT users.name FROM users JOIN suggestions ON users.id = suggestions.user_id`)
    .then(function(users_name) {
      res.render('suggestions/index', {
        title: "Suggestions",
        suggestions: payload.rows,
        users_name: users_name.rows
      });
    });
  });
});

// users have ability to suggest meal - their suggestion is entered w/ post request
router.post('/', function(req, res, next) {
  knex.raw(`INSERT INTO suggestions VALUES (DEFAULT, FALSE, '${req.body.meal_name}', DEFAULT)`)
  .then(function() {
    res.render('users/index', {
      message: 'Thank you. Your input has been sent.'
    });
  });
});

// admin can update accept_meal to true - accepted for that day
router.post('/:id', function(req, res, next) {
  knex.raw(`UPDATE suggestions SET accept_meal = TRUE WHERE id = ${req.params.id}`)
  .then(function() {
    res.cookie('accepted_meal', true);
    res.render('users/index')
  });
});

module.exports = router;

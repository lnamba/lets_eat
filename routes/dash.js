var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var superuser = 0;

router.post('/undo', function(req, res, next) {
  console.log(req.body);
  knex.raw(`UPDATE suggestions SET accept_meal = FALSE`)
  .then(function() {
    res.clearCookie('accepted_meal');
    res.redirect(`/dash/${req.body.id}`)
  })
})

/* GET home page. */
router.get('/:id', function(req, res, next) {
  superuser = req.params.id;
  knex.raw(`SELECT * FROM users WHERE id = ${req.params.id}`).then(function(user) {
    knex.raw(`SELECT * FROM suggestions`).then(function(payload) {
      knex.raw(`SELECT users.name FROM users JOIN suggestions ON users.id = suggestions.user_id`)
      .then(function(users_name) {
        knex.raw(`SELECT * FROM users`).then(function(all_users) {
          console.log(user);
          var cookie_accept = false;
          if (req.cookies.accepted_meal) {
            cookie_accept = true;
          }
          res.render('dash/index', {
            user: user.rows[0],
            cookie_accept,
            suggestions: payload.rows,
            users_name: users_name.rows,
            all_users: all_users.rows
          });
        });
      });
    });
  });
});

router.post('/:id/accepted', function(req, res, next) {
  knex.raw(`UPDATE suggestions SET accept_meal = TRUE WHERE id = ${req.params.id}`)
  .then(function() {
    res.cookie('accepted_meal', true);
    res.redirect(`/dash/${req.params.id}`)
  })
})

router.post('/:id/edit', function(req, res, next) {
  knex.raw(`UPDATE users SET
    name = '${req.body.name}',
    email = '${req.body.email}',
    about = '${req.body.about}'
    WHERE id = ${req.params.id}`)
  .then(function() {
    knex.raw(`SELECT * FROM users WHERE id = ${req.params.id}`).then(function(user) {
      res.render('dash/confirmed', {
        message: "Your information has been recorded.",
        user: user.rows[0]
      });
    });
  });
});

router.get('/:id/delete', function(req, res, next) {
  knex.raw(`DELETE FROM users WHERE id = ${req.params.id}`)
  .then(function() {
    res.redirect(`/dash/${superuser}`) //need to get superuser's id
  })
});

module.exports = router;

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET users listing. */
// Only admin can see this list of all suggestions

router.post('/undo', function(req, res, next) {
  console.log(req.body);
  knex.raw(`UPDATE suggestions SET accept_meal = FALSE`)
  .then(function() {
    res.clearCookie('accepted_meal');
    res.redirect(`/suggestions/${req.body.id}`)
  })
})

//need on delete cascade to eliminate food suggestion when user deleted
router.get('/:id', function(req, res, next) {
  knex.raw(`SELECT * FROM suggestions`).then(function(payload) {
    knex.raw(`SELECT users.name FROM users JOIN suggestions ON users.id = suggestions.user_id`)
    .then(function(users_name) {
      knex.raw(`SELECT * FROM users WHERE id = ${req.params.id}`).then(function(user) {
        console.log(user);
        var cookie_accept = false;
        if (req.cookies.accepted_meal) {
          cookie_accept = true;
        }
        res.render('suggestions/index', {
          title: "Suggestions",
          suggestions: payload.rows,
          users_name: users_name.rows,
          user:user.rows[0],
          cookie_accept
        });
      });
    });
  });
});

// admin is able to edit profile
router.post('/:id/edit', function(req, res, next) {
  knex.raw(`UPDATE users SET email = '${req.body.email}',
  name = '${req.body.name}',
  about = '${req.body.about}'
  WHERE id = ${req.params.id}`).then(function() {
    knex.raw(`SELECT * FROM users WHERE id = ${req.params.id}`).then(function(user) {
      res.render('suggestions/confirmed', {
        user:user.rows[0],
        message: "Your information has been recorded."
      })
    })
  })
})

// router.get('/', function(req, res, next) {
//   knex.raw(`SELECT * FROM suggestions`).then(function(payload) {
//     knex.raw(`SELECT users.name FROM users JOIN suggestions ON users.id = suggestions.user_id`)
//     .then(function(users_name) {
//       console.log(users_name.rows);
//       res.render('suggestions/index', {
//         title: "Suggestions",
//         suggestions: payload.rows,
//         users_name: users_name.rows
//       });
//     });
//   });
// });

// users have ability to suggest meal - their suggestion is entered w/ post request
router.post('/:id', function(req, res, next) {
  knex.raw(`INSERT INTO suggestions VALUES (DEFAULT, FALSE, '${req.body.meal_name}', ${req.params.id}, DEFAULT)`)
  .then(function() {
    res.redirect(`/users/${req.params.id}/suggest_dinner`);
  });
});

// admin can update accept_meal to true - accepted for that day
router.post('/:id/accepted', function(req, res, next) {
  knex.raw(`UPDATE suggestions SET accept_meal = TRUE WHERE id = ${req.params.id}`)
  .then(function() {
    res.cookie('accepted_meal', true);
    res.redirect(`/suggestions/${req.params.id}`)
  });
});



module.exports = router;

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// Show userpage if accept_meal = true
router.get('/:id/view_dinner', function(req, res, next) {
  knex.raw(`SELECT * from users WHERE id = ${req.params.id}`)
  .then(function (user) {
    knex.raw(`SELECT * FROM suggestions`).then(function(suggestions) {
      res.render('users/view_dinner', {user: user.rows[0], suggestions:suggestions.rows});
    })
  });
});

// Show userpage if accept_meal = false
router.get('/:id/suggest_dinner', function(req, res, next) {
  knex.raw(`SELECT * from users WHERE id = ${req.params.id}`)
  .then(function (user) {
    console.log(user.rows);
    knex.raw(`SELECT * FROM suggestions`).then(function(suggestions) {
      res.render('users/suggest_dinner', {user: user.rows[0], suggestions:suggestions.rows});
    });
  });
});

// renders a page for user showing that information has been received
router.get('/:id/suggest_dinner/:meal', function(req, res, next) {
  knex.raw(`SELECT * from users WHERE id = ${req.params.id}`)
  .then(function (user) {
    console.log(user.rows);
    knex.raw(`SELECT * FROM suggestions`).then(function(suggestions) {
      res.render('users/suggested', {
        user: user.rows[0],
        suggestions:suggestions.rows,
        message: "Your information has been recorded."
      });
    });
  });
});

//Get single user page
// router.get('/:id/edit', function(req, res, next) {
//   knex.raw(`SELECT * from users WHERE id=${req.params.id}`).then(function (users) {
//       res.render('users/edit', {users: users.rows[0]});
//   });
// });

// Edit user profile on view_dinner
router.post('/:id/view_dinner', function(req, res, next) {
  knex.raw(`SELECT * from users WHERE id = ${req.params.id}`)
  .then(function (user) {
    knex.raw(`UPDATE users SET
              name = '${req.body.name}',
              email = '${req.body.email}',
              about = '${req.body.about}'
              WHERE id=${req.params.id}`).then(function (users) {
      res.render('users/accepted', {
        user: user.rows[0],
        message: "Your information has been recorded."
      });
    });
  });
});

// Edit user profile on suggest_dinner
router.post('/:id/suggest_dinner', function(req, res, next) {
  knex.raw(`SELECT * from users WHERE id = ${req.params.id}`)
  .then(function (user) {
    knex.raw(`UPDATE users SET
              name = '${req.body.name}',
              email = '${req.body.email}',
              about = '${req.body.about}'
              WHERE id = ${req.params.id}`).then(function () {
      res.render('users/suggested', {
        user: user.rows[0],
        message: "Your information has been recorded."
      });
    });
  });
});

//Delete a user
router.post('/:id/delete', function (req, res, next) {
  knex.raw(`DELETE from users WHERE id=${req.params.id}`).then(function(users) {
    res.render('users/delete', {
      message: "Your account has been deleted."
    });
  });
});

module.exports = router;

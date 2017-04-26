var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//Get list of all users
router.get('/:id/view_dinner', function(req, res, next) {
  knex.raw(`SELECT * from users`)
  .then(function (users) {
    knex.raw(`SELECT * FROM suggestions`).then(function(suggestions) {
      res.render('users/view_dinner', {users: users.rows, suggestions:suggestions.rows});
    })
  });
});

//Get single user page
router.get('/:id/edit', function(req, res, next) {
  knex.raw(`SELECT * from users WHERE id=${req.params.id}`).then(function (users) {
      res.render('users/edit', {users: users.rows[0]});
  });
});
//Edit specific user page
router.post('/:id', function(req, res, next) {
  knex.raw(`UPDATE users SET
            name = '${req.body.name}',
            email = '${req.body.email}',
            about = '${req.body.about}',
            WHERE id=${req.params.id}`).then(function (users) {
    res.redirect(`/users/${req.params.id}`);
  });
});

//Delete a user
router.post('/:id/users', function (req, res, next) {
  knex.raw(`DELETE from users WHERE id=${req.params.id}`).then(function(users) {
    res.redirect('/users');
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//Get list of all users
router.get('/', function(req, res, next) {
  knex.raw(`SELECT * from users`)
  .then(function (users) {
    res.render('users/index', {users: users.rows});
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

//route to get add user page
router.get('/add', function (req, res, next) {
  res.render('users/add');
});
//route for the form on the add user page
router.post('/add', function (req, res, next) {
  knex.raw(`INSERT into users (email, password, name, about) values ('${req.body.email}', ${req.body.password}, ${req.body.name}, ${req.body.about})`)
  .then(function (val) {
    res.redirect("/users");
  });
});

//Delete a user
router.post('/:id/users', function (req, res, next) {
  knex.raw(`DELETE from users WHERE id=${req.params.id}`).then(function(users) {
    res.redirect('/users');
  });
});

module.exports = router;

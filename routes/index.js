var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/login')
});

// router.get('/login', function(req, res, next) {
//   res.render('login', { title: 'Express' });
// });
// //DELETE ABOVE BEFORE ADDING TO GITHUB

module.exports = router;

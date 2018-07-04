var express = require('express');
var router = express.Router();
var generateFiles = require('./generate_files');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('server get / requrest now!');
  let data = { title: 'Express' };
  res.render('index.html');
});


router.get('/signup', function(req, res, next) {
  console.log('server get /signup requrest now!');
  let data = { title: 'Express' };
  res.render('signup.html');
});

router.get('/login', function(req, res, next) {
  console.log('server get /login requrest now!');
  let data = { title: 'Express' };
  res.render('login.html');
});

/* GET home page. */
router.post('/createNewNamespace', function(req, res, next) {
  console.log('server get /createNewNamespace requrest now!');
  console.log(req.body);

  generateFiles.createNamespace(req.body.username);
  res.send({result: 'yes succeeded!'});
  // res.render('index', { title: 'About' });
});


module.exports = router;

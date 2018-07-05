var express = require('express');
var router = express.Router();
var generateFiles = require('./generate_files');
var path = require('path');

var store = require('./store.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('server get / requrest now!');
  let data = { title: 'Express' };
  res.render('index.html');
});


router.get('/signup', function(req, res, next) {
  console.log('server get /signup requrest now!');
  
  console.log('******* req.query.username ',req.query.username)
  console.log('******* req.query.email ',req.query.email)
  console.log('******* req.query.pass ',req.query.pass);
  
  let result = store.addUser(req.query.username, req.query.email, req.query.pass);

  if(result){
    // res.render('dashboard.html');
    res.redirect('/dashboard');
  }
  else
    res.render('signup.html');
});



router.get('/login', function(req, res, next) {
  console.log('server get /login requrest now!');
  
  console.log('******* req.query.email ',req.query.email)
  console.log('******* req.query.pass ',req.query.pass);

  let result = store.validateUser(req.query.email, req.query.pass);
  console.log('*********** result ', result);

  if(result){
    res.redirect('/dashboard')
  }
  else
    res.render('login.html');

});

router.get('/dashboard', function(req, res, next) {
  console.log('server get /dashboard requrest now!');
  
  res.render('dashboard.html')

});
////////////////

router.get('/content', function(req, res, next) {
  console.log('server get /content requrest now!');
  
  res.render('content.html')

});


router.get('/flot', function(req, res, next) {
  console.log('server get /flot requrest now!');
  
  res.render('flot.html')

});


router.get('/forms', function(req, res, next) {
  console.log('server get /forms requrest now!');
  
  res.render('forms.html')

});

router.get('/tables', function(req, res, next) {
  console.log('server get /tables requrest now!');
  
  res.render('tables.html')

});


router.get('/panels-wells', function(req, res, next) {
  console.log('server get /panels-wells requrest now!');
  
  res.render('panels-wells.html')

});
////////////////
/* GET home page. */
router.post('/createNewNamespace', function(req, res, next) {
  console.log('server get /createNewNamespace requrest now!');
  console.log(req.body);

  generateFiles.createNamespace(req.body.username);
  res.send({result: 'yes succeeded!'});
  // res.render('index', { title: 'About' });
});


module.exports = router;

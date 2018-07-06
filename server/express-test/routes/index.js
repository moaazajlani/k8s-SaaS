var express = require('express');
var router = express.Router();
var generateFiles = require('./generate_files');
var path = require('path');
var k8s = require('k8s');

var store = require('./store.js');

var kubectl = k8s.kubectl({
    endpoint:  'https://192.168.42.22:8443'
    /*, namespace: 'wordpress'*/
    , binary: '/usr/local/bin/kubectl'
})

/*

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

  generateFiles.createNamespace(req.body.domainName);
  store.addNameSpace(req.body.email, req.body.domainName);

  //connect with the k8s api
  let base="/home/lalosh/Code/k8s-SaaS/server/express-test/namespaces/"+req.body.domainName+"/";

  kubectl.command(`create namespace ${req.body.domainName}`);

  kubectl.command("create -f "+base+"001-local-volumes.yaml");

  kubectl.command("create -f "+base+"002-mysql-credentials.yaml");

  kubectl.command("create -f "+base+"003-mysql/001-mysql-volume.yaml");
  kubectl.command("create -f "+base+"003-mysql/002-mysql-deployment.yaml");
  kubectl.command("create -f "+base+"003-mysql/003-mysql-service.yaml");

  kubectl.command("create -f "+base+"004-wordpress/001-wordpress-volume.yaml");
  kubectl.command("create -f "+base+"004-wordpress/002-wordpress-deployment.yaml");
  kubectl.command("create -f "+base+"004-wordpress/003-wordpress-service.yaml");

  kubectl.service.list(function(err, pods){


      if(err) console.log(err);
      console.log(pods);
      res.send({result: 'yes succeeded!',pods});


  })


  // res.render('index', { title: 'About' });
});


module.exports = router;

var express = require('express');
var router = express.Router();
var generateFiles = require('./generate_files');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('server get / requrest now!');
  res.render('index', { title: 'Express' });
});


/* GET home page. */
router.post('/createNewNamespace', function(req, res, next) {
  console.log('server get /createNewNamespace requrest now!');
  console.log(req.body);

  generateFiles(req.body.username);
  res.send({result: 'yes succeeded!'});
  // res.render('index', { title: 'About' });
});


module.exports = router;

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {	
  res.send('See Readme.md for API details');
});

module.exports = router;

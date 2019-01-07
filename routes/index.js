var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '高大資工系友交流平臺' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: '登入 - 高大資工系友交流平臺' });
});

module.exports = router;

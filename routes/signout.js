var express = require('express');
var router = express.Router();
const { Session } = require('express-session');

/* GET login page. */
router.get('/', function (req, res, next) {
  req.session.destroy(function () {
    res.redirect('/home')
  })
});


module.exports = router;

var express = require('express');
var router = express.Router();
var User = require('../services/user')
var Mail = require('../services/Mail');
const { Session } = require('express-session');

/* GET login page. */
router.get('/', function (req, res, next) {
  let user = new User();
  user.findByEmail(req.session.user.email);
  res.render('profile', { user:user});
});

router.post('/',
 function (req, res, next) {
  let user = new User(req.body)
  user.register().then(() => {
    req.session.user = { email: user.data.email, _id: user.data._id, confirmationRequired: true }
    req.session.save()

    next()
  }).catch((regErrors) => {
    regErrors.forEach(function (error) {
     req.flash("errors", error)
    })
    req.session.save(function () {
      res.redirect('/profile')
    })
    // test/
  })

 });

module.exports = router;

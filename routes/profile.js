var express = require('express');
var router = express.Router();
var User = require('../services/user')
var Mail = require('../services/Mail');
const { Session } = require('express-session');

/* GET login page. */
router.get('/',async function (req, res, next) {
  let user = new User();
  let userByEmail = await user.findByEmail(req.session.user.email);
  res.render('profile', { user:userByEmail});
});

router.post('/',
 function (req, res, next) {
  let user = new User(req.body)
  user.data.id_client = req.session.user.id_client
  try {
  user.save()
    req.session.user = { email: user.data.email, _id: user.data._id }
    req.session.save()
    
    req.flash("success", "Saved Successfully")
    res.redirect('/profile')
  }catch(regErrors) {
    regErrors.forEach(function (error) {
     req.flash("errors", error)
    })
    req.session.save(function () {
      res.redirect('/profile')
    })
    // test/
  }

 });

module.exports = router;

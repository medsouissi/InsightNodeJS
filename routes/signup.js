
var express = require('express');
var router = express.Router();
var User = require('../services/user')
var Mail = require('../services/Mail');
const { Session } = require('express-session');

/* GET login page. */
router.get('/', function (req, res, next) {
var ses = req.session
  res.render('signup', { title: 'Express' });
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
      res.redirect('/signup')
    })
    // test/
  })

},
function (req, res, next) {
  let mail = new Mail(req, res, "confirmation")

    if (req.session.trial) {
        req.session.trial++
    } else {
        req.session.trial = 1
    }
    if (req.session.trial <= 3) {
        mail.sendEmail(mail)
        //req.flash("success", "The confirmation link was sent to your inbox, if you don't seem to find it, please consider checking your spam folder or click RESEND.")
        res.render('confirmation_code.ejs', { email: req.session.user.email })
    } else {
        req.session.user = undefined
        // req.flash("errors", "Too many requests from the same user.")
        res.redirect('/')
    }
}
);

module.exports = router;

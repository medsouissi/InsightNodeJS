
var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  let user = new User(req.body)
  user.login().then(() => {
    req.session.user = { email: user.data.email, _id: user.data._id, confirmationRequired: true }
    req.session.save()

    next()
  }).catch((regErrors) => {
    regErrors.forEach(function (error) {
     // req.flash('regErrors', error)
    })
    //req.session.save(function () {
    //   res.redirect('/login')
    // })
  })
  
});



module.exports = router;
0
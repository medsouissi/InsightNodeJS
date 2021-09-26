
var express = require('express');
var router = express.Router();
var produits = require('../services/produits');

/* GET home page. */
router.get('/',async function (req, res, next) {
  // if (req.session.user) {
    // if (req.session.user.confirmationRequired) {
    //     req.flash("errors", "Please consider confirming your email address.")
    //     req.session.save(function () {
    //         res.render('confirmation_code', { email: req.session.user.email })
    //     })
    // } else {
        // fetch feed of posts for current user
        try {
          let allProduits = await produits.getAllProduits();
          
          res.render('home', { title: 'Express', Produits: allProduits });
        } catch (err) {
          console.error(`Error while getting quotes `, err.message);
          next(err);
        }
    // }
// } else {
//     res.render('home', { regErrors: req.flash('regErrors') })
// }
  
});



module.exports = router;

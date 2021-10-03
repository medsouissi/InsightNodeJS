
var express = require('express');
var router = express.Router();
var produits = require('../services/produits');
var categories = require('../services/categories');

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
          let allCategories = await categories.getAllCategories();
          res.render('home', { title: 'Express', Produits: allProduits, categories:allCategories });
        } catch (err) {
          console.error(`Error while getting quotes `, err.message);
          next(err);
        }
        
    // }
// } else {
//     res.render('home', { regErrors: req.flash('regErrors') })
// }
  
});

router.get('/contact',async function (req, res, next) {
        try {
          res.render('contact');
        } catch (err) {
          console.error(`Error `, err.message);
          next(err);
        }
});

module.exports = router;

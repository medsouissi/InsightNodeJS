
var express = require('express');
var router = express.Router();
var produits = require('../services/produits');
var categories = require('../services/categories');

/* GET home page. */
router.get('/',async function (req, res, next) {
        try {
          let allCategories = await categories.getAllCategories();
          
          res.render('categories', { title: 'Express', Categories: allCategories });
        } catch (err) {
          console.error(`Error while getting Products `, err.message);
          next(err);
        }
   
});
router.get('/:id',async function (req, res, next) {
  try {
    let oProduit = await produits.getProductByCategId();
    
    res.render('products', { title: 'Express', Produit: oProduit });
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }

});

module.exports = router;

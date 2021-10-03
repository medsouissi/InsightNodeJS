
var express = require('express');
var router = express.Router();
var produits = require('../services/produits');

/* GET home page. */
router.get('/',async function (req, res, next) {
        try {
          let allProduits = await produits.getAllProduits();
          
          res.render('products', { title: 'Express', Produits: allProduits });
        } catch (err) {
          console.error(`Error while getting Products `, err.message);
          next(err);
        }
   
});
router.get('/:id',async function (req, res, next) {
  try {
    let oProduit = await produits.getProduitById();
    
    res.render('product_detail', { title: 'Express', Produit: oProduit });
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }

});

module.exports = router;

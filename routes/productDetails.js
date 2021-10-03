
var express = require('express');
var router = express.Router();
var produits = require('../services/produits');
var categories = require('../services/categories');

/* GET home page. */
// router.get('/', async function (req, res, next) {
//   try {
//     let allProduits = await produits.getAllProduits();
//     let allCategories = await categories.getAllCategories();
//     res.render('products', { title: 'Express', Produits: allProduits, Categories: allCategories });
//   } catch (err) {
//     console.error(`Error while getting Products `, err.message);
//     next(err);
//   }

// });
router.get('/', async function (req, res, next) {
  try {
    let oProduit = await produits.getProductById(req.query.id);
    res.render('product_detail');
    // res.redirect('product_detail/1')
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }

});

module.exports = router;

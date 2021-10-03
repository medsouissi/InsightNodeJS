
var express = require('express');
var router = express.Router();
var produits = require('../services/produits');
var categories = require('../services/categories');

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    let allProduits = await produits.getAllProduits();
    var img;
    for(var i=0;i<allProduits.jData.length;i++){
      img = allProduits.jData[i].img_produit;
      var imageURL = 'data:image/png;base64,'+ new Buffer(img, 'binary').toString('base64')
      allProduits.jData[i].img_produit = imageURL
    }
    let allCategories = await categories.getAllCategories();
    res.render('products', { title: 'Express', Produits: allProduits, Categories: allCategories });
  } catch (err) {
    console.error(`Error while getting Products `, err.message);
    next(err);
  }

});
router.get('/:id', async function (req, res, next) {
  try {
    let oProduit = await produits.getProductById(req.params.id);
    
    res.redirect('/productDetails/?id=' + req.params.id)
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    next(err);
  }

});

module.exports = router;

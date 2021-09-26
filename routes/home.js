
var express = require('express');
var router = express.Router();
var produits = require('../services/produits');

/* GET home page. */
router.get('/',async function (req, res, next) {

  try {
    let allProduits = await produits.getAllProduits();
    
    res.render('home', { title: 'Express', Produits: allProduits });
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
});



module.exports = router;

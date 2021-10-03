const db = require('./db');

async function getAllProduits(){
    const data = await db.query('SELECT * FROM produit INNER JOIN categorie ON produit.id_categ=categorie.id_categ');
    let jData = JSON.parse(JSON.stringify(data));
  
    return {
      jData
    }
  }

  async function getProductsByName(){
    const data = await db.query(`SELECT * FROM produit INNER JOIN categorie ON produit.id_categ=categorie.id_categ where nom_produit = '${this.data.nomProduit}`);
    let jData = JSON.parse(JSON.stringify(data));
  
    return {
      jData
    }
  }
  async function getProductById(id){
    const data = await db.query(`SELECT * FROM produit where id_produit = ${id}`);
    let jData = JSON.parse(JSON.stringify(data[0]));
  
    return {
      jData
    }
  }

  async function getProductByCategId(idCateg){
    const data = await db.query(`SELECT * FROM produit where id_categ = ${idCateg}`);
    let jData = JSON.parse(JSON.stringify(data));
  
    return {
      jData
    }
  }
  
  module.exports = {
    getAllProduits,
    getProductsByName,
    getProductById,
   getProductByCategId
    
  }
const db = require('./db');

async function getAllProduits(){
    const data = await db.query('SELECT * FROM produits');
    let jData = JSON.parse(JSON.stringify(data));
  
    return {
      jData
    }
  }
  
  module.exports = {
    getAllProduits
  }
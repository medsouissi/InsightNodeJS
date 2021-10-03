const db = require('./db');

async function getAllCategories(){
    const data = await db.query('SELECT * FROM categorie');
    let jData = JSON.parse(JSON.stringify(data));
  
    return {
      jData
    }
  }


async function getCategoriesByName(){
  const data = await db.query(`SELECT * FROM categoriewhere id = '${this.data.nomCategory}`);
  let jData = JSON.parse(JSON.stringify(data));

  return {
    jData
  }
}
async function getCategoryById(){
  const data = await db.query(`SELECT * FROM categorie where id = '${this.data.idCategory}`);
  let jData = JSON.parse(JSON.stringify(data));

  return {
    jData
  }
}
  
  module.exports = {
    getAllCategories,
    getCategoriesByName,
    getCategoryById
  }
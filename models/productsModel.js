const connection = require('./connection');

const getProducts = async () => {
  const [arrayProducts] = await connection.execute('SELECT * FROM products');
  return arrayProducts;
};
 // funcao para retornar produtos fazendo uma conexao com o banco de dados req 2
const getProductsById = async (id) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product;
};

module.exports = {
getProducts,
getProductsById,
};
const connection = require('./connection');

const getProducts = async () => {
  const [arrayProducts] = await connection.execute('SELECT * FROM products');
  return arrayProducts;
};
const getProductsId = async (id) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product;
};
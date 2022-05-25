const calculadora = require('../calc');
const connection = require('./connection');

const getProducts = async () => { // conectando com o bd para trazer a lista dos produtos req 2
  const [arrayProducts] = await connection.execute('SELECT * FROM products');
  return arrayProducts;
};
 // funcao para retornar produtos fazendo uma conexao com o banco de dados req 2
const getProductsById = async (id) => {
  const [product] = await connection
  .execute('SELECT * FROM products WHERE id = ?', [id]);
  return product;
};

// função que ira criar um novo produto se comunicando com o bd req 4
const createProduct = async (name, quantity) => {
  console.log('cheguei model');
  const [{ insertId }] = await connection
    .execute('INSERT INTO products (name, quantity) VALUES (?, ?)', [name, quantity]);
  const product = {
    id: insertId, // insertId para pegar o id  
    name,
    quantity,
  };
  return product;
};

// funcao para retornar um produto pelo nome 
const getProductsByName = async (name) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE name = ?', [name]);
  console.log(product);
  console.log('----------');
  console.log([product]);
  console.log('----------');
  console.log(product[0]);
  console.log('----------');
  console.log([[product]]);
  return product[0];
};
const updateProducts = async (name, quantity, id) => {
  await connection.execute(`
  UPDATE products
  SET name = ?, quantity = ?
  WHERE id = ?
  `, [name, quantity, id]);

  return { id, name, quantity };
};

const deleteProducts = async (id) => {
  await connection.execute('DELETE products FROM products WHERE id = ?', [id]);
  return {};
};

const updateProductById = async (productId, quantity, operator) => {
  const getQuantity = 'SELECT quantity FROM StoreManager.products WHERE id = ?';
  const query = 'UPDATE StoreManager.products SET quantity = ? WHERE id = ?';
  
  const [[actualQuantity]] = await connection.execute(getQuantity, [productId]);
  const newQuantity = calculadora(actualQuantity.quantity, quantity, operator);
  if (newQuantity <= 0) return 'fail';
  await connection.execute(query, [newQuantity, productId]);
};

module.exports = {
  updateProductById,
  deleteProducts,
  updateProducts,
  getProductsByName,
  createProduct,
  getProducts,
  getProductsById,
};
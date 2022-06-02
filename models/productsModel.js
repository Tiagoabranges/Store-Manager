const calculadora = require('../calc');
const connection = require('./connection');

// req 2conectando com o bd para trazer a lista dos produtos
const getProducts = async () => {  
  const [arrayProducts] = await connection.execute('SELECT * FROM products');
  return arrayProducts;
};

 // req 2 funcao para retornar produtos fazendo uma conexao com o banco de dados 
const getProductsById = async (id) => {
  console.log('model');
  const [product] = await connection
  .execute('SELECT * FROM products WHERE id = ?', [id]);
  return product;
};

// 4 - Crie um endpoint para o cadastro de produtos
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

// 5 - Crie um endpoint para atualizar um produto
const updateProducts = async (name, quantity, id) => {
  await connection.execute(`
  UPDATE products
  SET name = ?, quantity = ?
  WHERE id = ?
  `, [name, quantity, id]);

  return { id, name, quantity };
};

// req 6 funcao que conectara com o banco de dados para deletar um produto pelo id
const deleteProducts = async (id) => {
  await connection.execute('DELETE products FROM products WHERE id = ?', [id]);
  return {};
};

// funcao para req 11, sera usada no controler
const updateProductById = async (productId, quantity, operator) => {
  const [[currentQuantity]] = await connection
  .execute('SELECT quantity FROM StoreManager.products WHERE id = ?', [productId]);
  const quantityNew = calculadora(currentQuantity.quantity, quantity, operator);
  if (quantityNew <= 0) return 'fail';
  await connection
  .execute('UPDATE StoreManager.products SET quantity = ? WHERE id = ?', [quantityNew, productId]);
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
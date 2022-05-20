 const connection = require('./connection');

const getProducts = async () => { // conectando com o bd para trazer a lista dos produtos req 2
  const [arrayProducts] = await connection.execute('SELECT * FROM products ORDER BY id');
  if (!arrayProducts || arrayProducts.length === 0) return null;
  return arrayProducts;
};
 // funcao para retornar produtos fazendo uma conexao com o banco de dados req 2
const getProductsById = async (id) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  if (product.length === 0) return null;

  return product[0];
};

// funcao para retornar um produto pelo nome 
const getProductsByName = async (name) => {
  const [product] = await connection
  .execute('SELECT id, name, quantity FROM StoreManager.products WHERE name = ?', [name]);
  console.log(product);
  console.log('----------');
  console.log([product]);
  console.log('----------');
  console.log(product[0]);
  console.log('----------');
  console.log([[product]]);
  if (product.length === 0) return null;

  return product[0];
};
// função que ira criar um novo produto se comunicando com o bd req 4
const createProduct = async ({ name, quantity }) => {
  console.log('cheguei model');
   await connection
    .execute('INSERT INTO products (name, quantity) VALUES (?, ?)', [name, quantity]);
    return getProductsByName(name);
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
  console.log('oi delete3');
  await connection.execute('DELETE products FROM products WHERE id = ?', [id]);
  return {};
};

module.exports = {
  deleteProducts,
  updateProducts,
  getProductsByName,
  createProduct,
  getProducts,
  getProductsById,
};
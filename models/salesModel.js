const getCurrentDate = require('../data');
const connection = require('./connection');
const productModel = require('./productsModel');
 
// 2 - Crie endpoints para listar os produtos e as vendas
const getSales = async () => {
    const [sales] = await connection.execute(`
      SELECT
        sp.sale_id AS saleId,
        s.date,
        sp.product_id AS productId,
        sp.quantity 
      FROM
        sales_products AS sp
      JOIN
        sales AS s
      ON
        sp.sale_id = s.id
      ORDER BY
        saleId,
        productId;
    `);
    return sales;
};
 // funcao para retornar vendas pelo id fazendo uma conexao com o banco de dados req 2
const getSalesById = async (id) => {
  const [salesId] = await connection.execute(
    `
    SELECT s.date, sp.product_id AS productId, sp.quantity
    FROM sales_products AS sp
    JOIN sales AS s
    ON sp.sale_id = s.id
    WHERE sp.sale_id = ?
    ORDER BY sp.sale_id, productId;
  `, [id],
  );
  return salesId;
};

// Crie um endpoint para cadastrar vendas req 7
const createSale = async (arrayOfParams) => {
  const date = getCurrentDate();
  const [response] = await connection
  .execute('INSERT INTO StoreManager.sales (date) VALUES (?)', [date]);

  arrayOfParams.forEach(async (element) => {
    await connection.execute(`INSERT INTO StoreManager.sales_products 
    (sale_id, product_id, quantity) VALUES (?, ?, ?)`,
     [response.insertId, element.productId, element.quantity]);
  });
  return response.insertId;
};

// req 7 nao vou usa essa mais
 const createSaleProduct = async (id, productId, quantity) => {
  const query = `
  INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (?,?,?)`;
  await connection.execute(query, [id, productId, quantity]);
}; 

// 8 - Crie um endpoint para atualizar uma venda
const updateSale = async (productId, quantity, id) => {
  await connection.execute(`UPDATE StoreManager.sales_products 
  SET product_id = ?,quantity = ? 
  WHERE sale_id = ? 
  AND product_id = ?`, [productId, quantity, id, productId]);

  return id;
};

// 10 - Crie um endpoint para deletar uma venda
const deleteSales = async (id) => {
  const test = await getSalesById(id);
  test.forEach(async (element) => {
    await productModel.updateProductById(element.productId, element.quantity, '+');
  });
  console.log('cheguei model delete');
  const [result] = await connection.execute('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
  await connection.execute('DELETE FROM StoreManager.sales_products WHERE sale_id = ?', [id]);
  console.log(` resultado model ${result.affectedRows}`);
  return result.affectedRows;
};

module.exports = {
  updateSale,
  deleteSales,
  createSaleProduct,
  createSale,
    getSales,
    getSalesById,
};

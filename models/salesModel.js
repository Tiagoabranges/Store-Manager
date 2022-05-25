const getCurrentDate = require('../data');
const connection = require('./connection');
// const productModel = require('./productsModel');
 // funcao para retornar vendas fazendo uma conexao com o banco de dados req 2
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
    SELECT
      s.date, sp.product_id AS productId, sp.quantity
    FROM 
      sales_products AS sp
    JOIN 
      sales AS s
    ON 
      sp.sale_id = s.id
    WHERE 
      sp.sale_id = ?
    ORDER BY
      sp.sale_id, productId;
  `, [id],
  );
  return salesId;
};

// Crie um endpoint para cadastrar vendas req 7
const createSale = async (arrayOfParams) => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (?)';
  const query2 = `INSERT INTO StoreManager.sales_products 
    (sale_id, product_id, quantity) VALUES (?, ?, ?)`;
  const date = getCurrentDate();
  const [response] = await connection.execute(query, [date]);
  
  arrayOfParams.forEach(async (element) => {
    await connection.execute(query2, [response.insertId, element.productId, element.quantity]);
  });
  return response.insertId;
};
// req 7
 const createSaleProduct = async (id, productId, quantity) => {
  const query = `
  INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (?,?,?)`;
  await connection.execute(query, [id, productId, quantity]);
}; 

const updateSale = async (productId, quantity, id) => {
  const query = `UPDATE StoreManager.sales_products 
  SET product_id = ?, quantity = ? WHERE sale_id = ? AND product_id = ?`;

  await connection.execute(query, [productId, quantity, id, productId]);

  return id;
};

const deleteSales = async (id) => {
  const query = 'DELETE FROM StoreManager.sales WHERE id = ?';
  const query2 = 'DELETE FROM StoreManager.sales_products WHERE sale_id = ?';

  const [result] = await connection.execute(query, [id]);
  await connection.execute(query2, [id]);

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

const connection = require('./connection');
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
const createSale = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
  const [newSale] = await connection.execute(query);
  return newSale;
};

/* const createSaleProduct = async (id, productId, quantity) => {
  const query = `
  INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (?,?,?)`;
  await connection.execute(query, [id, productId, quantity]);
}; */

const updateSale = async (saleId, quantity, productId) => {
  console.log('cheguei model');
  const [update] = await connection.execute(
      `
      UPDATE StoreManager.sales_products
      SET quantity = ?, product_id = ?
      WHERE sale_id = ?`,
      [quantity, productId, saleId],
    );
  return update;
};

const deleteSales = async (id) => {
  await connection.execute('DELETE FROM StoreManager.sales_products WHERE sale_id = ?', [id]);
};

module.exports = {
  updateSale,
  deleteSales,
 // createSaleProduct,
  createSale,
    getSales,
    getSalesById,
};
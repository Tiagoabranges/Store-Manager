const connection = require('./connection');

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

module.exports = {
    getSales,
    getSalesById,
};
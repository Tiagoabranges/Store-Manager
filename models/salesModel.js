const connection = require('./connection');

const getSales = async () => {
  const [sales] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products;',
);
if (!sales || sales.length === 0) return null;
return sales;
};

const getSalesById = async (id) => {
  const query = 'SELECT product_id, quantity FROM StoreManager.sales_products WHERE sale_id = ?';
  const [saleData] = await connection.execute(query, [id]);

  if (saleData.length === 0) return null;

  return saleData;
};

const createSale = async (productId, quantity) => {
  const vendaQuery = 'INSERT INTO StoreManager.sales (date) VALUES(NOW());';
  const [venda] = await connection.execute(vendaQuery);
  const saleId = venda.insertId;

  const query = 'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)';
  const query2 = 'VALUES (?,?,?)';
  await connection.execute(query + query2, [saleId, productId, quantity]); 
  const [res] = await getSalesById(saleId);
  return {
      id: saleId,
      itemsSold: [
          {
        productId: res.productId,
        quantity: res.quantity,
      },
  ],
  };
};

const createSaleProduct = async (id, productId, quantity) => {
  const query = `
  INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (?,?,?)`;
  await connection.execute(query, [id, productId, quantity]);
};

const deleteSales = async (id) => {
  await connection.execute('DELETE FROM StoreManager.sales_products WHERE sale_id = ?', [id]);
};

const updateSale = async (id, itemsSold) => {
  const query = `UPDATE sales_products
    SET product_id = (?), quantity = (?)
    WHERE sale_id = (?)
    AND product_id = (?)`;

  itemsSold.forEach(async ({ productId, quantity }) => {
    await connection
      .execute(query, [productId, quantity, id, productId]);
  });
};
module.exports = {
  updateSale,
  deleteSales,
  createSaleProduct,
  createSale,
    getSales,
    getSalesById,
};
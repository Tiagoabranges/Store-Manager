const sales = require('../models/salesModel');

const getSales = async () => {
    const salesList = await sales.getSales();
    return salesList;
};

const getSalesById = async (id) => {
    const sale = await sales.getSalesById(id);
    if (!sale.length) return { code: 404, message: 'Sale not found' };
    return { code: 200, sale };
};

const createSale = async (data) => {
    const newSale = await sales.createSale();
  
    // para cada elemento do array data(que são as informações passadas no body), chamamos a função createSaleProduct que insere os dados na tabela e retorna o novo id(insertId) e o objeto itemsSold com as novas informações 
    await data.forEach(
      ({ productId, quantity }) => (
        sales.createSaleProduct(newSale.insertId, productId, quantity)
      ),
    );
    return ({ id: newSale.insertId, itemsSold: data });
  };

  const deleteSale = async (id) => {
    const foundById = await sales.findOneById(id);
    if (!foundById) {
      return { status: 404, body: { message: 'Sale not found' } };
    }
    return { status: 204, body: await sales.removeSale(id) };
   };

  const updateSale = async (id, item) => {
    const { productId, quantity } = item[0];
    await sales.updateSales(id, productId, quantity);
      return { saleId: id, itemUpdated: item };
  };
module.exports = {
    updateSale,
    deleteSale,
    createSale,
    getSales,
    getSalesById,
};
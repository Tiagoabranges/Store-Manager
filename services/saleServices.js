const sales = require('../models/salesModel');

const getSales = async () => {
    const salesList = await sales.getSales();
    return salesList;
};

const getSalesById = async (id) => {
    const sale = await sales.getSalesById(id);
    if (!sale) return false;

    return sale;
};

const createSale = async (productId, quantity) => {
    const sale = await sales.createSale(productId, quantity);
    if (!sale) return false;
    return sale;
  };

  const deleteSales = async (id) => {
    await getSalesById(id);
  
    await sales.deleteSales(id);
  };

  const updateSale = async (id, itemsSold) => {
    const [saleExists] = await sales.getSalesById(id);
  
    if (!saleExists) {
      const error = {
        status: 404,
        message: 'Sale not found',
      };
  
      throw error;
    }
  
    await sales.updateSale(id, itemsSold);
  };
module.exports = {
    updateSale,
    deleteSales,
    createSale,
    getSales,
    getSalesById,
};
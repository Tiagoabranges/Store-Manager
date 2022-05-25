const productModel = require('../models/productsModel');
const sales = require('../models/salesModel');

const errorHandles = (status, message) => ({ status, message });
// req 2 função vindo do models enviando ao controller para retornar vendas
const getSales = async () => {
    const salesList = await sales.getSales();
    return salesList;
};

// req 2 função vindo do models e enviando ao controller para retornar vendas pelo id
const getSalesById = async (id) => {
    const sale = await sales.getSalesById(id);
    if (!sale.length) return { code: 404, message: 'Sale not found' };
    return { code: 200, sale };
};

// req 7
const createSale = async (arrayOfParams) => {
  const saleId = await sales.createSale(arrayOfParams);
  const result = await 
    productModel.updateProductById(arrayOfParams[0].productId, arrayOfParams[0].quantity, '-');
  if (result === 'fail') throw errorHandles(422, 'Such amount is not permitted to sell'); 
  return saleId;
};

  const deleteSales = async (id) => {
    console.log('cheguei service delete');
    const affectedRow = await sales.deleteSales(id);
    console.log(affectedRow);
    if (!affectedRow) throw errorHandles(404, 'Sale not found');
  };

  const updateSale = async (productId, quantity, id) => {
    const result = await sales.updateSale(productId, quantity, id);
  
    return result;
  };
  
module.exports = {
    updateSale,
    deleteSales,
    createSale,
    getSales,
    getSalesById,
};
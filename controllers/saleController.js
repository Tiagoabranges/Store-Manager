// Renomeie esse arquivo

const sales = require('../services/saleServices');

// req 2 função vindo do services e enviando ao app.js para retornar vendas
const getSales = async (_req, res) => {
  try {
      const salesList = await sales.getSales();
      return res.status(200).json(salesList);
  } catch (error) {
      console.log(error);
      return res.status(500).end();
  }
};

// req 2 função vindo do services e enviando ao app.js para retornar vendas pelo id
const getSalesById = async (req, res) => {
  try {
      const { id } = req.params;
      // console.log(req);
      const { code, sale, message } = await sales.getSalesById(id);

      if (!sale) return res.status(code).json({ message });
      return res.status(code).json(sale);
  } catch (error) {
      console.log(error);
      return res.status(500).end();
  }
};

// req 7
const createSale = async (req, res, next) => {
  try {
    const arrayOfParams = req.body;

    const saleId = await sales.createSale(arrayOfParams);

    const responseFormat = {
      id: saleId,
      itemsSold: req.body,
    };

    res.status(201).json(responseFormat);
  } catch (error) {
    console.log('Add new sale:', error.message);
    next(error);
  }
};

// req 8
const updateSale = async (req, res, next) => {
  console.log('cheguei controller');
  try {
    const { id } = req.params;
    const { productId, quantity } = req.body[0];

    const saleId = await sales.updateSale(productId, quantity, id);

    const responseFormat = {
      saleId,
      itemUpdated: req.body,
    };

    res.status(200).json(responseFormat);
  } catch (error) {
    console.log('Update saleById:', error.message);
    next(error);
  }
};

// 10 - Crie um endpoint para deletar uma venda
const deleteSales = async (req, res, next) => {
  try {
    const { id } = req.params;
    await sales.deleteSales(id);

    res.status(204).json();
  } catch (error) {
    console.log('Delete sale by id:', error.message);
    next(error);
  }
};

module.exports = {
  updateSale,
  deleteSales,
  createSale,
  getSales,
  getSalesById,
};
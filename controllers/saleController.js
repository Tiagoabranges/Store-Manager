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

const createSale = async (req, res, _next) => {
  try {
    const data = req.body;
     // console.log(data)

    const newSale = await sales.createSale(data);

    return res.status(201).json(newSale);
  } catch (error) {
    // console.log(error)
    return res.status(404).json({ message: error.message });
  }
};

const updateSale = async (req, res, next) => {
  console.log('cheguei controller');
  try {
      const { quantity, productId } = req.body[0];
      const saleId = req.params.id;

      const update = await sales.updateSale(saleId, quantity, productId);
      res.status(200).json(update); 
  } catch (err) {
      next(err);
  }
};

module.exports = {
  updateSale,
  createSale,
  getSales,
  getSalesById,
};
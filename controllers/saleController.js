// Renomeie esse arquivo
const sales = require('../services/saleServices');

const getSales = async (_req, res) => {
  try {
      const salesList = await sales.getSales();
      return res.status(200).json(salesList);
  } catch (error) {
      console.log(error);
      return res.status(500).end();
  }
};

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

module.exports = {
  getSales,
  getSalesById,
};
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

const deleteSales = async (req, res, _next) => {
  try {
    const { id } = req.params;

    await sales.deleteSales(id);
    return res.status(204).end();
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const item = req.body;
  const updatedProduct = await sales.update(id, item);
  return res.status(201).json(updatedProduct);
};
module.exports = {
  updateSale,
  deleteSales,
  createSale,
  getSales,
  getSalesById,
};
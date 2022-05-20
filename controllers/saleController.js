const sales = require('../services/saleServices');

const getSales = async (_req, res) => {
  const saless = await sales.getSales();
  return res.status(200).json(saless);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const saless = await sales.getSalesById(id);
  if (!saless) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(saless);
};

const createSale = async (req, res, _next) => {
  const [{ productId, quantity }] = req.body;
  if (!productId) return res.status(400).json({ message: '"productId" is required' });
  if (!quantity) return res.status(400).json({ message: '"quantity" is required' });
  if (quantity <= 0) {
  return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  const vendaCadastrada = await sales.createSale(productId, quantity);
  res.status(201).json(vendaCadastrada);
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
  try {
    const itemsSold = req.body;
    const { id } = req.params;

    await sales.updateSale(id, itemsSold);

    res.status(200).json({
      saleId: id,
      itemUpdated: itemsSold,
    });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }
    console.log(error.message);

    return res.status(500).json({ message: 'Internal server error on our side' });
  }
};
module.exports = {
  updateSale,
  deleteSales,
  createSale,
  getSales,
  getSalesById,
};
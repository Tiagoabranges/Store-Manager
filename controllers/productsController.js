const products = require('../services/productsServices');
const productsModel = require('../models/productsModel');

const getProducts = async (_req, res) => {
  const arrayProducts = await products.getProducts();
  return res.status(200).json(arrayProducts);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const product = await products.getProductsById(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(product);
};

const verifyProduct = async (name, res, quantity) => {
  const n = await productsModel.getProductsByName(name);
  if (n) {
      return res.status(409).json({ message: 'Product already exists' });
  }
  const registeredProduct = await products.createProduct({ name, quantity });
  res.status(201).json(registeredProduct);
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
   return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  if (!quantity) return res.status(400).json({ message: '"quantity" is required' });
  if (quantity <= 0) {
  return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  await verifyProduct(name, res, quantity);
};

const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const { code, message, updatedProducts } = await products.updateProducts(name, quantity, id);
    if (!updatedProducts) return res.status(code).json({ message });
    return res.status(code).json(updatedProducts);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
};

const deleteProducts = async (req, res) => {
  console.log('oi delete');
  try {
    const { id } = req.params;

    const { code, message } = await products.deleteProducts(id);
    if (message) return res.status(code).json({ message });
    return res.status(code).end();
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
};

module.exports = {
  deleteProducts,
  updateProducts,
  createProduct,
  getProducts,
  getProductsById,
};
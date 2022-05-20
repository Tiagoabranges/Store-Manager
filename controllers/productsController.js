const products = require('../services/productsServices');

const getProducts = async (_req, res) => {
  try {
    const productsList = await products.getProducts();
    return res.status(200).json(productsList);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
};

const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;

    const { code, message, product } = await products.getProductsById(id);
    if (!product) return res.status(code).json({ message });
    console.log(product);
    console.log('ola estou aqui');
    return res.status(code).json(product[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
};

const createProduct = async (req, res) => {
  console.log('cheguei controler');
  try {
    const { name, quantity } = req.body;

    const { code, message, product } = await products.createProduct(name, quantity);
    if (!product) return res.status(code).json({ message });
    return res.status(code).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductsById,
};
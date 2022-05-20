const products = require('../models/productsModel');

const getProducts = async () => {
    const arrayProducts = await products.getProducts();
    return arrayProducts;
};

const getProductsById = async (id) => {
  const product = await products.getProductsById(id);
  if (!product) return null;
  return product;
};

const createProduct = async (name, quantity) => {
    console.log('cheguei service');
    const product = await products.createProduct(name, quantity);
  return product;
  };

  const updateProducts = async (name, quantity, id) => {
    const product = await products.getProductsById(id);
     if (!product.length) return { code: 404, message: 'Product not found' };
    const updatedProducts = await products.updateProducts(name, quantity, id);
    return { code: 200, updatedProducts };
  };

  const deleteProducts = async (id) => {
    console.log('oi delete2');
    const product = await products.getProductsById(id);
     if (!product) return { code: 404, message: 'Product not found' };
    await products.deleteProducts(id);
    return { code: 204 };
  };
module.exports = {
    deleteProducts,
    updateProducts,
    createProduct,
    getProducts,
    getProductsById,
};
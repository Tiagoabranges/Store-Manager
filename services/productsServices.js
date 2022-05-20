const products = require('../models/productsModel');

const getProducts = async () => {
    const arrayProducts = await products.getProducts();
    return arrayProducts;
};

const getProductsById = async (id) => {
    const product = await products.getProductsById(id);
    if (!product.length) return { code: 404, message: 'Product not found' };
    return { code: 200, product };
};

module.exports = {
    getProducts,
    getProductsById,
};
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

const createProduct = async (name, quantity) => {
    console.log('cheguei service');
    const productByName = await products.getProductsByName(name); // se retornar um produto significa que ele existe 
    if (productByName) return { code: 409, message: 'Product already exists' }; // produto existente
    const product = await products.createProduct(name, quantity); // se não existir vamos criar o produto com a função create
    return { code: 201, product };
  };
module.exports = {
    createProduct,
    getProducts,
    getProductsById,
};
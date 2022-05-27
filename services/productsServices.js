const products = require('../models/productsModel');

// req 2
const getProducts = async () => {
    const arrayProducts = await products.getProducts();
    return arrayProducts;
};

// req 2
const getProductsById = async (id) => {
    const product = await products.getProductsById(id);
    if (!product.length) return { code: 404, message: 'Product not found' };
    return { code: 200, product };
};

// 4 - Crie um endpoint para o cadastro de produtos
const createProduct = async (name, quantity) => {
    console.log('cheguei service');
    const productByName = await products.getProductsByName(name); // se retornar um produto significa que ele existe 
    if (productByName) return { code: 409, message: 'Product already exists' }; // produto existente
    const product = await products.createProduct(name, quantity); // se não existir vamos criar o produto com a função create
    return { code: 201, product };
  };

  // req 5
  const updateProducts = async (name, quantity, id) => {
    const product = await products.getProductsById(id);
     if (!product.length) return { code: 404, message: 'Product not found' };
    const updatedProducts = await products.updateProducts(name, quantity, id);
    return { code: 200, updatedProducts };
  };

// req 6
  const deleteProducts = async (id) => {
    const product = await products.getProductsById(id);
     if (!product.length) return { code: 404, message: 'Product not found' };
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
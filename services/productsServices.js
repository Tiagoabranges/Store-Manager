const products = require('../models/productsModel');

// req 2 apenas passando adiante
const getProducts = async () => {
    const arrayProducts = await products.getProducts();
    return arrayProducts;
};

// req 2
const getProductsById = async (id) => {
  console.log('service');
    const product = await products.getProductsById(id);
    if (!product.length) return { code: 404, message: 'Product not found' }; // verifica se existe
    return { code: 200, product };
};

// 4 - Crie um endpoint para o cadastro de produtos
const createProduct = async (name, quantity) => {
    console.log('cheguei service');
    const productByName = await products.getProductsByName(name); // se retornar um produto significa que ele existe 
    if (productByName) return { code: 409, message: 'Product already exists' }; // produto existente
    const product = await products.createProduct(name, quantity); // se não existir vamos criar o produto com a função create
    return { code: 201, product }; // retorna um codigo de criação 201 e o produto criado
  };

  // req 5
  const updateProducts = async (name, quantity, id) => {
    const product = await products.getProductsById(id);
     if (!product.length) return { code: 404, message: 'Product not found' }; // verifica se existe e envia o erro se nao existir
    const updatedProducts = await products.updateProducts(name, quantity, id);
    return { code: 200, updatedProducts }; // se existir ir
  };

// req 6
  const deleteProducts = async (id) => {
    const product = await products.getProductsById(id);
     if (!product.length) return { code: 404, message: 'Product not found' }; // verifica se existe pelo tamanho
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
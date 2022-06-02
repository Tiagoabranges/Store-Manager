const products = require('../services/productsServices');

// 2 - Crie endpoints para listar os produtos e as vendas
const getProducts = async (_req, res) => {
  try {
    const productsList = await products.getProducts();
    return res.status(200).json(productsList);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

// req 2 cria endpoint para retornar produto pelo id
const getProductsById = async (req, res) => {
  try {
    console.log('controler');
    const { id } = req.params;

    const { code, message, product } = await products.getProductsById(id);
    if (!product) return res.status(code).json({ message });
    console.log(product);
    console.log('ola estou aqui');
    return res.status(code).json(product[0]);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

// 4 - Crie um endpoint para o cadastro de produtos
const createProduct = async (req, res) => {
  console.log('cheguei controler');
  try {
    const { name, quantity } = req.body;

    const { code, message, product } = await products.createProduct(name, quantity);
    if (!product) return res.status(code).json({ message });
    return res.status(code).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

// 5 - Crie um endpoint para atualizar um produto
const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const { code, message, updatedProducts } = await products.updateProducts(name, quantity, id);
    if (!updatedProducts) return res.status(code).json({ message });
    return res.status(code).json(updatedProducts);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

// 6 - Crie um endpoint para deletar um produto
async function deleteProducts(req, res) {
  console.log('controler delete');
  try {
    const { id } = req.params;
    const { code, message } = await products.deleteProducts(id);
    if (message) return res.status(code).json({ message });
    return res.status(code).end();
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}
module.exports = {
  deleteProducts,
  updateProducts,
  createProduct,
  getProducts,
  getProductsById,
};
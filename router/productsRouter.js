const express = require('express');
const products = require('../controllers/productsController');
const productsValidation = require('../middlewares/productsValidation');

const router = express.Router();

router.get('/', products.getProducts);
router.get('/:id', products.getProductsById);
router.post('/', productsValidation, products.createProduct);
router.put('/:id', productsValidation, products.updateProducts);
router.delete('/:id', products.deleteProducts);

module.exports = router;
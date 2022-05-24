const express = require('express');
const products = require('../controllers/productsController');
const productsValidation = require('../middlewares/productsValidation');// req 3

const router = express.Router();

router.get('/', products.getProducts); // req 2
router.get('/:id', products.getProductsById); // req 2
router.post('/', productsValidation, products.createProduct); // req 4
router.put('/:id', productsValidation, products.updateProducts); // req 5
router.delete('/:id', products.deleteProducts); // req 6

module.exports = router;
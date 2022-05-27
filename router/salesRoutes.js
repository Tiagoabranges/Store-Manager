const express = require('express');
const sales = require('../controllers/saleController');
const errorMiddleware = require('../middlewares/errorModdle');
const { IdValidation, amountSoldValidation } = require('../middlewares/salesvalid'); // req3
const { isValidProductId, isValidQuantity } = require('../middlewares/saleValidation'); // req 3

const router = express.Router();

router.get('/', sales.getSales); // req 2

router.get('/:id', sales.getSalesById); // req 2

router.post('/', isValidProductId, isValidQuantity, sales.createSale); // req 7

router.put('/:id', IdValidation, amountSoldValidation, sales.updateSale); // req 8

router.delete('/:id', errorMiddleware, sales.deleteSales); // req 10

router.use(errorMiddleware);

module.exports = router;
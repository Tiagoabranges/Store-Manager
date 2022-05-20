const express = require('express');
const sales = require('../controllers/saleController');
const { IdValidation, amountSoldValidation } = require('../middlewares/salesvalid');
const { isValidProductId, isValidQuantity } = require('../middlewares/saleValidation');

const router = express.Router();

router.get('/', sales.getSales);

router.get('/:id', sales.getSalesById);

router.post('/', isValidProductId, isValidQuantity, sales.createSale);
router.delete('/:id', isValidProductId, isValidQuantity, sales.deleteSales);

 router.put('/:id', IdValidation, amountSoldValidation, sales.updateSale);

module.exports = router;
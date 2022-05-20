const express = require('express');
const sales = require('../controllers/saleController');

const router = express.Router();

router.get('/', sales.getSales);

router.get('/:id', sales.getSalesById);

router.post('/', sales.createSale);
router.delete('/:id', sales.deleteSales);

 router.put('/:id', sales.updateSale);

module.exports = router;
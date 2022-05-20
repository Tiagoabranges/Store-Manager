const sales = require('../models/salesModel');

const getSales = async () => {
    const salesList = await sales.getSales();
    return salesList;
};

const getSalesById = async (id) => {
    const sale = await sales.getSalesById(id);
    if (!sale.length) return { code: 404, message: 'Sale not found' };
    return { code: 200, sale };
};

module.exports = {
    getSales,
    getSalesById,
};
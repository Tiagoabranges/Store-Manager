const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;
  const MIN_QUANTITY = 1;

  if (quantity < MIN_QUANTITY) {
    return res.status(422)
    .json({ message: '"quantity" must be greater than or equal to 1' }); 
  }
  if (quantity === undefined) return res.status(400).json({ message: '"quantity" is required' });
  return next();
};

module.exports = { 
  validateQuantity, 
};
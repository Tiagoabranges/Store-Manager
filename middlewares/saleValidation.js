const saleValidation = (req, res, next) => {
  if (!req.body.productId) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  if (!req.body.quantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (req.body.quantity <= 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = saleValidation;
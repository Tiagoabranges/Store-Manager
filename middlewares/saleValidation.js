// 3 - Crie middlewares de validação para as rotas /products e /sales
const isValidProductId = (req, res, next) => {
  const sales = req.body;
  const isValid = sales.every(({ productId }) => productId !== undefined);
  if (!isValid) {
      return res.status(400).json({ message: '"productId" is required' });
  }
  next();
};

const isValidQuantity = (req, res, next) => {
  const sales = req.body;

  const isQuantityPresent = sales.every(({ quantity }) => quantity !== undefined);
  if (!isQuantityPresent) {
      return res.status(400).json({ message: '"quantity" is required' });
  }
  const isQuantityGreaterThanOne = sales.every(({ quantity }) => quantity >= 1);
  if (!isQuantityGreaterThanOne) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = {
  isValidProductId,
  isValidQuantity,
};
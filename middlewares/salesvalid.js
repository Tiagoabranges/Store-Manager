// middlewares de validacao REQ3 para sales
const IdValidation = (req, res, next) => {
  const id = req.body;
  if (id.find(({ productId }) => !productId)) {
    return res.status(400).json({ message: '"productId" is required' });
  } 

  next();
};

const amountSoldValidation = (req, res, next) => {
  const quant = req.body;
  if (quant.find(({ quantity }) => quantity <= 0)) {
    return res.status(422).json({
      message: '"quantity" must be greater than or equal to 1',
    });
  } 
  if (quant.find(({ quantity }) => !quantity)) {
    return res.status(400).json({ message: '"quantity" is required' });
  } 
  next();
};
module.exports = {
  IdValidation,
  amountSoldValidation,
};
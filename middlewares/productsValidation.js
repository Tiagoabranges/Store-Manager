const productsValidation = (req, res, next) => {
  // console.log(req.body);
  if (!req.body.name) {
    console.log('name entrou');
    return res.status(400).json({ message: '"name" is required' });
  }
  if (req.body.name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  // console.log('n entrou no if');

    if (req.body.quantity === undefined) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
  // console.log('quantity from body at product validatio', req.body.quantity);
  if (req.body.quantity <= 0) {
    console.log('entrou no quantity');
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = productsValidation;
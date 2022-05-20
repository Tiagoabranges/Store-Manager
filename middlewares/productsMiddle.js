const validProduct = (req, res, next) => { // ainda nao terminei o middle
const { name } = req.body;
if (!name) {
  return res.send();
}
next();
};

module.exports = validProduct;
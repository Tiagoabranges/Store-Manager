const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const products = require('./controllers/productsController');
const sales = require('./controllers/saleController');

app.get('/products', products.getProducts);
app.get('/products/:id', products.getProductsById);
app.get('/sales', sales.getSales);
app.get('/sales/:id', sales.getSalesById);
app.post('/products', products.createProduct);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;

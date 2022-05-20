const express = require('express');

const app = express();

const bodyParser = require('body-parser');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
const productsRouter = require('./router/productsRouter');
const salesRouter = require('./router/salesRoutes');

app.use(bodyParser.json());
app.use('/products', productsRouter);
app.use('/sales', salesRouter);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;

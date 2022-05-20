const sinon = require('sinon');
const productService =  require('../../../services/productsServices');
const productModel = require('../../../models/productsModel');
const { expect } = require('chai');

describe('Testa o método getAll, do service', () => {
  describe('Quando tem produtos cadastrados', () => {
    const esperado = [[
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
        "quantity": 20
      },
    ]]

    beforeEach(() => {
      sinon.stub(productModel, 'getProducts')
        .resolves(esperado)
    });

    afterEach(() => {
      productModel.getProducts.restore();
    })

    it('retorna um array com 2 hashes', async () => {
      const [result] = await productService.getProducts();
      expect(result.length).to.be.equal(2)
    })

    it('retorna um array', async () => {
      const result = await productService.getProducts();
      expect(result).to.be.an('array')
    })

    it('retorna as chaves hashes id, name, quantity', async () => {
      const [result] = await productService.getProducts();
      expect(result[0]).to.be.all.keys('id', 'name', 'quantity');
    })
  })
});

describe('Testa o método getById, do service', () => {
  describe('Quando encontra o produto', () => {
    const esperado = [[
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      },
    ]]

    beforeEach(() => {
      sinon.stub(productModel, 'getProductsById')
        .resolves(esperado)
    });

    afterEach(() => {
      productModel.getProductsById.restore();
    })

    it('retorna um array com 1 hash', async () => {
      const result = await productService.getProductsById(1);
      expect(result.length).to.be.equal(1)
    })

    it('retorna um array', async () => {
      const result = await productService.getProductsById(1);
      expect(result).to.be.an('array')
    })

    it('retorna as chaves hashes id, name, quantity', async () => {
      const [result] = await productService.getProductsById(1);
      expect(result).to.be.all.keys('id', 'name', 'quantity');
    })

    it('retorna o produto', async () => {
      const [result] = await productService.getProductsById(1);
      expect(result.name).to.be.equal('Martelo de Thor');
    })
  })
});

describe('Testa o método duplicate do service', () => {
  describe('Quando encontra o produto', () => {
    const execute = [{
      id: 1,
      name: 'Martelo',
      quantity: 10,
    }]

    it('retorna um objeto', async () => {
      const result = await productService.duplicate('Martelo');
      console.log("testando retorno", result)
      // expect(result).to.be.an('object')
    })
  })
});
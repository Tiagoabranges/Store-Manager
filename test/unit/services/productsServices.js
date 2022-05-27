const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const productsService = require('../../../services/productsServices');
const productsModel = require('../../../models/productsModel');

const product = {
  id: 01,
  name: 'produto',
  quantity: 50,
}

describe('Test Product Service', () => {
  describe('GET', () => {
    before(() => {
      sinon.stub(productsModel, 'getProducts').resolves([product]);
    });
    after(() => productsModel.getProducts.restore());
    it('verifica o retorno', async () => {
      const obj = await productsService.getProducts();
      expect(obj).to.be.a("array");
    })
  })

  describe(' GET BY ID', () => {
    before(() => {
      sinon.stub(productsModel, 'getProductsById').resolves(product);
    });
    after(() => productsModel.getProductsById.restore());
    it('verifica o retorno', async () => {
      const obj = await productsService.getProductsById(01);
      expect(obj).to.be.a("object");
    })
  })

  describe('CREATE', () => {
    before(() => {
      sinon.stub(productsModel, 'createProduct').resolves(product);
    });
    after(() => productsModel.createProduct.restore());
    it('verifica o retorno', async () => {
     
    })
  })
});

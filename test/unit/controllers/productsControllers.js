const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const productsService = require('../../../services/productsServices');
const productsController = require('../../../controllers/productsController');
const response = {};
const request = {}

const payload = {
  id: 01,
  name: 'produto',
  quantity: 50,
}

describe(' TEST 1- Test Product Controller', () => {
  describe('a função getProducts retorna', () => {
    before(() => {
      sinon.stub(productsService, 'getProducts').resolves([payload]);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns()
    });
    after(() => productsService.getProducts.restore());
    it('verifica o retorno', async () => {
      await productsController.getProducts(request, response);
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith([payload])).to.be.true;
    })
  })

  describe('TEST 2- test getProductsById', () => {
    before(() => {
      sinon.stub(productsService, 'getProductsById').resolves(payload);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns()
    });
    after(() => productsService.getProductsById.restore());
    it('verifica o retorno', async () => {
      request.params = {id: 01};
      await productsController.getProductsById(request, response);
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(payload)).to.be.true;
    })
  })

  describe('Test 3- createProduct', () => {
    before(() => {
      sinon.stub(productsService, 'createProduct').resolves(payload);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns()
    });
    after(() => productsService.createProduct.restore());
    it('verifica o retorno', async () => {
      request.body = payload;
      await productsController.createProduct(request, response);
      expect(response.status.calledWith(201)).to.be.true;
    })
  })
});
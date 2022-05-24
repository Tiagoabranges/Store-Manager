const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const productsService = require('../../../services/productsServices');


const payload = {
  id: 01,
  name: 'produto',
  quantity: 50,
}

describe(' TEST 1- Test Product Controller', () => {
  describe('a função getProducts retorna', () => {
    before(() => {
      sinon.stub(productsService, 'getProducts').resolves([payload]);
   
    });
    after(() => productsService.getProducts.restore());
    it('verifica o retorno', async () => {
      const obj = await productsService.getProducts();
      expect(obj).to.be.a("array");
    })
  })

  describe('TEST 2- test getProductsById', () => {
    before(() => {
      sinon.stub(productsService, 'getProductsById').resolves([payload]);
    });
    after(() => productsService.getProductsById.restore());
    it('verifica o retorno', async () => {
      const obj = await productsService.getProductsById(01);
      expect(obj).to.be.a("array");
    })
  })

  describe('Test 3- createProduct', () => {
    before(() => {
      sinon.stub(productsService, 'createProduct').resolves(payload);
  
    });
    after(() => productsService.createProduct.restore());
    it('verifica o retorno', async () => {
      const obj = await productsService.createProduct(payload);
      expect(obj).to.be.a("object");
    })
  })
});
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const productService = require('../../../services/productsServices');
const productModel = require('../../../models/productsModel');

describe("testes para a funcao getProducts productService", () => {
  const payloadProduct = [{
    id: 1,
    name: "prego",
    quantity: 2,
  }];
  const resolve = [{ id: 1, name: 'prego', quantity: 2 }];

  beforeEach(() => {
    sinon.stub(productModel, "getProducts").resolves(resolve);
  });

  afterEach(() => {
    productModel.getProducts.restore();
  });

  it("retorna um objeto com id, name, quantity", async () => {
    const response = await productService.getProducts();
    expect(response).to.deep.equal(payloadProduct);
  });
});

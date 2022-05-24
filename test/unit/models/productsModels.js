const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

const product = {
  id: 01,
  name: 'produto',
  quantity: 50,
}

const getProdById = {
  id: 01,
  name: 'Martelo do Thor',
  quantity: 10,
}
describe('Test Product Model', () => {
  describe('GET', () => {
    before(() => {
      sinon.stub(connection, 'query').resolves([[product]]);
    });
    after(() => connection.query.restore());
    it('verifica se retorna um array', async () => {
      const obj = await productsModel.getProducts();
      expect(obj).to.be.a("array");
    })
  })

  describe('CREATE', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 01 }]);
    });
    after(() => connection.execute.restore());
    it('Verifica se retorna um objeto', async () => {
      const obj = await productsModel.createProduct(product);
      expect(obj).to.be.a("object");
    })
  });

  describe('verifica se ao buscar pelo id', () => {
    before(() => {
      sinon.stub(connection, 'query').resolves([getProdById]);
    });
    after(() => connection.query.restore());
    it('retorna um array', async () => {
      const obj = await productsModel.getProductsById(01);
      expect(obj).to.be.a("array");
    })
  })
});
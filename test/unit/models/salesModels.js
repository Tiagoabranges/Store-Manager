const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const salesModel = require('../../../models/salesModel');
const connection = require('../../../models/connection');

const salesGetAll = {
  salesId: 01,
  data: '2019-01-01',
  productId: 03,
  quantity: 50,
}

const salesGetById = {
  salesId: 01,
  productId: 03,
  quantity: 50,
}

describe('Test Sale Model', () => {
  describe('GET', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[salesGetAll]]);
    });
    after(() => connection.execute.restore());

    it('verifica o retorno', async () => {
      const obj = await salesModel.getSales();
      expect(obj).to.be.a("array");
    })
  })

  describe('Get By Id', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([salesGetById]);
    });
    after(() => connection.execute.restore());
    it('verifica o retorno', async () => {
      const obj = await salesModel.getSalesById(01);
      expect(obj).to.be.a("object");
    })
  })
});

describe('Funcao createPorducts', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 01 }]);
  });
  after(() => connection.execute.restore());
 
});
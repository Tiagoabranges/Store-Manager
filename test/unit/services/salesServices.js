const chai = require('chai');
const expect = chai.expect
const sinon = require('sinon');
const salesService = require('../../../services/saleServices');
const salesModel = require('../../../models/salesModel');

const sales = {
  salesId: 01,
  productId: 03,
  quantity: 50,
}

describe('Test Sale Service', () => {
  describe('funcao getSales', () => {
    before(() => {
      sinon.stub(salesModel, 'getSales').resolves([sales]);
    });
    after(() => salesModel.getSales.restore());
    it('verifica o retorno', async () => {
      const obj = await salesService.getSales();
      expect(obj).to.be.a("array");
    })
  })

  describe('funcao getSalesId', () => {
    before(() => {
      sinon.stub(salesModel, 'getSalesById').resolves([sales]);
    });
    after(() => salesModel.getSalesById.restore());
    it('verifica o retorno da funçaõ', async () => {
   
    })
  })
});
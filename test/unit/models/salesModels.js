const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const salesModel = require('../../../models/salesModel');
const connection = require('../../../models/connection');

const sales = {
  salesId: 01,
  data: '2019-01-01',
  productId: 03,
  quantity: 50,
}

const salesId = {
  salesId: 01,
  productId: 03,
  quantity: 50,
}

describe('Test Sale Model', () => {
  describe('Rota GET', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[sales]]);
    });
    after(() => connection.execute.restore());

    it('verifica o retorno', async () => {
      const obj = await salesModel.getSales();
      expect(obj).to.be.a("array");
    })
  })

  describe('Rota GetById', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([salesId]);
    });
    after(() => connection.execute.restore());
    it('verifica o retorno', async () => {
      const obj = await salesModel.getSalesById(01);
      expect(obj).to.be.a("object");
    })
  })
});

describe('Testa a função createSale ', () => {
  describe('no sucesso', () => {
    const result = [{
    }]

    const sales = [
      {
        "productId": 1,
        "quantity": 2
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ]

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(result)
    })

    afterEach(() =>  connection.execute.restore())

    it('deve retornar um objeto', async () => {
      const response = await salesModel.createSale(sales)
      expect({response}).to.be.a('object')
    })

  })
})

describe('Testa a função updateSale ', () => {
  describe('na falha', () => {
    const id = 1

    const sales = [{
        "productId": 1,
        "quantity": 6
      }]
    
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves()
    })

    afterEach(() => {
      connection.execute.restore()
    })

    it('deve retornar undefined', async () => {
      const response = await salesModel.updateSale(id, sales)
      expect(response).to.be.a('undefined')
    })
  })
})
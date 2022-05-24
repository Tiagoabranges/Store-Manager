const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const salesService = require('../../../services/saleServices');
const salesController = require('../../../controllers/saleController');


const payloadGetAll = [
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    }
]

const payload = {
  "saleId": 1,
  "date": "2021-09-09T04:54:29.000Z",
  "productId": 1,
  "quantity": 2
}

const payloadGetById =   [
  {
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
]

describe('Test Sales Controller', () => {
  describe('GET', () => {
    before(() => {
      sinon.stub(salesService, 'getSales').resolves(payloadGetAll);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns()
    });
    after(() => salesService.getSales.restore());
    it('verifica o retorno', async () => {
      await salesController.getSales(request, response);
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(payloadGetAll)).to.be.true;
    })
  })

  describe(' GET BY ID', () => {
    before(() => {
      sinon.stub(salesService, 'getSalesById').resolves(payloadGetById);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns()
    });
    after(() => salesService.getSalesById.restore());
    it('verifica o retorno', async () => {
      request.params = {id: 01};
      await salesController.getSalesById(request, response);
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(payloadGetById)).to.be.true;
    })
  })

  describe('CREATE', () => {
    before(() => {
      sinon.stub(salesService, 'createSale').resolves(payload);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns()
    });
    after(() => salesService.createSale.restore());
    it('verifica o retorno [CONTROLLER]', async () => {
      request.body = payload;
      await salesController.createSale(request, response);
      expect(response.status.calledWith(201)).to.be.true;
    })
  })

  describe('UPDATE', () => {
    before(() => {
      sinon.stub(salesService, 'updateSale').resolves(payload);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns()
    });
    after(() => salesService.updateSale.restore());
    it('verifica o retorno [CONTROLLER]', async () => {
      request.body = payload;
      await salesController.update(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    })
  })
});
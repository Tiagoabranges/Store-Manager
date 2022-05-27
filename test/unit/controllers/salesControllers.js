const sinon = require("sinon");
const { expect } = require("chai");
const saleService = require("../../../services/saleServices");
const saleController = require("../../../controllers/saleController");

describe(' funcao getSales saleController', () => {
  describe('quando existem produtos no banco de dados', async () => {
    const response = {};
    const request = {};

    const saleMock = [{
      saleId: 1,
      date: "2022-05-17T20:46:58.000Z",
      productId: 2,
      quantity: 10,
    }]

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleService, 'getSales').resolves(saleMock);
    })

    afterEach(() => {
      saleService.getSales.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await saleController.getSales(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um array', async () => {
      await saleController.getSales(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
})


describe(' funcao getSalesById saleController', () => {
  describe('quando existem produtos no banco de dados', async () => {
    const response = {};
    const request = {};

    const saleMock = [{
      saleId: 1,
      date: "2022-05-17T20:46:58.000Z",
      productId: 2,
      quantity: 10,
    }]

    beforeEach(() => {
      request.params = {id: 1}
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleService, 'getSalesById').resolves(saleMock);
    })

    afterEach(() => {
      saleService.getSalesById.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await saleController.getSalesById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(false);
    });

    it('é chamado o método "json" passando um array', async () => {
      await saleController.getSalesById(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(false);
    });
  });
})

describe(' funcao createSale saleController', () => {
  describe('quando existem produtos no banco de dados', async () => {
    const response = {};
    const request = {};

    const saleMock = [{affectedRows: 1}]

    beforeEach(() => {
      request.params = {id: 1}
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleService, 'createSale').resolves(saleMock);
    })

    afterEach(() => {
      saleService.createSale.restore();
    });

    it('é chamado o método "status" passando o código 201', async () => {
      await saleController.createSale(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o método "json"', async () => {
      await saleController.createSale(request, response);
      expect(response.json.calledWith()).to.be.equal(true);
    });
  });
})



describe('funcao deleteSales saleController', () => {
  describe('quando existem produtos no banco de dados', async () => {
    const response = {};
    const request = {};

    const saleMock = [{affectedRows: 1}]

    beforeEach(() => {
      request.params = {id: 1}
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleService, 'deleteSales').resolves(saleMock);
    })

    afterEach(() => {
      saleService.deleteSales.restore();
    });

    it('é chamado o método "status" passando o código 204', async () => {
      await saleController.deleteSales(request, response);

      expect(response.status.calledWith(204)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um array', async () => {
      await saleController.deleteSales(request, response);
      expect(response.json.calledWith()).to.be.equal(true);
    });
  });
})
const chai = require('chai');
const expect = chai.expect
const sinon = require('sinon');
const saleService = require('../../../services/saleServices');
const saleModel = require('../../../models/salesModel');

const sales = {
  salesId: 01,
  productId: 03,
  quantity: 50,
}

describe('Test Sale Service', () => {
  describe('funcao getSales', () => {
    before(() => {
      sinon.stub(saleModel, 'getSales').resolves([sales]);
    });
    after(() => saleModel.getSales.restore());
    it('verifica o retorno', async () => {
      const obj = await saleService.getSales();
      expect(obj).to.be.a("array");
    })
  })


  describe("testes para a funcao getSalesById saleService", () => {
    const payloadProduct = [{
      saleId: 1,
      date: "2022-05-17T20:46:58.000Z",
      productId: 1,
      quantity: 5
    },];
    const resolve = [{saleId: 1, date: "2022-05-17T20:46:58.000Z", productId: 1, quantity: 5}];
  
    beforeEach(() => {
      sinon.stub(saleModel, "getSalesById").resolves(resolve);
    });
  
    afterEach(() => {
      saleModel.getSalesById.restore();
    });
  
    it("retorna um objeto com id, name, quantity", async () => {
      const response = await saleService.getSalesById(1);
      expect(response).to.be.a('object');
    }); 
  });
  


describe("A função updateSale funciona corretamente", () => {
  describe("Quando não existe venda com o id informado", () => {
    const resultUpdate = null;
    const resultById = null;
    const saleId = 20;
    const productId = 1;
    const quantity = 10;

    before(() => {
      sinon.stub(saleModel, "updateSale").resolves(resultUpdate);
      sinon.stub(saleModel, "getSalesById").resolves(resultById);
    });

    after(() => {
      saleModel.updateSale.restore();
      saleModel.getSalesById.restore();
    });

    it("retornar null", async () => {
      const result = await saleService.updateSale(
        saleId,
        productId,
        quantity
      );

      expect(result).to.be.a("null");
    });
  });

  describe("Retorna '1' ao atualizar um produto", () => {
    const resultUpdate = {
      saleId: 1,
      itemUpdated: [
        {
          productId: 1,
          quantity: 10,
        },
      ],
    };
    const resultById = [
      {
        date: "2022-05-25T22:59:18.000Z",
        productId: 1,
        quantity: 5,
      },
      {
        date: "2022-05-25T22:59:18.000Z",
        productId: 2,
        quantity: 10,
      },
    ];
    const saleId = 1;
    const productId = 1;
    const quantity = 10;

    before(() => {
      sinon.stub(saleModel, "updateSale").resolves(resultUpdate);
      sinon.stub(saleModel, "getSalesById").resolves(resultById);
    });

    after(() => {
      saleModel.updateSale.restore();
      saleModel.getSalesById.restore();
    });

    it("retorna um objeto", async () => {
      const result = await saleService.updateSale(
        saleId,
        productId,
        quantity
      );

      expect(result).to.be.an("object");
    });

    it("o objeto contem os atributos saleId, itemUpdated", async () => {
      const result = await saleService.updateSale(
        saleId,
        productId,
        quantity
      );

      expect(result).to.be.includes.all.keys("saleId", "itemUpdated");
    });
  });
})
});
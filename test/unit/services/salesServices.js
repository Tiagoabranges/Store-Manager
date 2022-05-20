const sinon = require('sinon');
const { expect } = require('chai');
const salesModel = require('../../../models/salesModels');
const salesService = require('../../../services/salesServices');
describe('Verifica se busca todos as vendas no banco de dados', () => {
    describe('Verifica quando não há nada cadastrado' , () => {
      const resultExecute = []
      beforeEach(() => {
        sinon.stub(salesModel, 'getSales').resolves(resultExecute)
      })
      afterEach(() => {
        salesModel.getSales.restore();
      })
     it('Verifica se retorna um array', async () => {
      const result = await salesService.getSales();
      expect(result).to.be.a('array');
     })
     it('Verifica se o array está vazio', async () => {
      const result = await salesService.getSales();
      expect(result).to.be.empty;
    })
    });
    describe('Verifica quando existem vendas cadastradas', () => {
      const resultExecute = [
        { id: 1,  date: '2022-05-18 20:24:50'},
        { id: 2,  date: '2022-05-18 20:24:50'},
      ]
      beforeEach(() => {
        sinon.stub(salesModel, 'getSales').resolves([resultExecute])
      })
      afterEach(() => {
        salesModel.getSales.restore();
      })
      it('Verifica se retorna um array', async () => {
        const result = await salesService.getSales();
      expect(result).to.be.a('array');
      })
      it('Verifica se o array não está vazio', async () => {
        const result = await salesService.getSales();
        expect(result).to.be.not.empty;
      })
      it('Verifica se o array possui objetos', async () => {
        const [result] = await salesService.getSales();
        expect(result[0]).to.be.a('object')
      })
      it('Verifica se contém a chave date', async () => {
        const [result] = await salesService.getSales();
        expect(result[0]).to.includes.all.keys('date');
      })
    })
});

describe('Verifica se é inserido um novo produto no banco de dados', () => {
    const payloadProduct =  { "name": "produto", "quantity": 10 }
    beforeEach(async () => {
        const execute = [ { "id": 1, "name": "produto", "quantity": 10 }]; // retorno esperado nesse teste
        sinon.stub(salesModel, 'createSale').resolves(execute);
      });
    afterEach(async () => {
        salesModel.sa.restore();
      });
    describe('Verifica se é inserido com sucesso', () => {
      it('Verifica se retorna um objeto', async () => {
        const response = await salesModel.createSale(payloadProduct);
        expect(response[0]).to.be.a('object')
      });
      it('Verifica se o objeto possui o "id" do novo produto inserido', async () => {
        const response = await salesModel.createSale(payloadProduct);
        expect(response[0]).to.have.a.property('id')
      });
    })})
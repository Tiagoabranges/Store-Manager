const sinon = require('sinon');
const { expect } = require('chai');
const productsService = require('../../../services/productsServices');
const productsController = require('../../../controllers/productsController');
describe('Verifica getProducts', () => { 
    describe('quando já existem produtos no bd', () => { 
         const resultExecute = [
            { id: 1, name: 'Martelo de Thor', quantity: 10 },
            { id: 2, name: 'Traje de encolhimento', quantity: 20 },
            { id: 3, name: 'Escudo do Capitão América', quantity: 30 },
          ]
        const response = {};
        const request = {};
        beforeEach(() => {
            response.status = sinon.stub()
              .returns(response);
            response.json = sinon.stub()
              .returns();
            sinon.stub(productsService, 'getProducts')
              .resolves([resultExecute]);
          })
          afterEach(() => {
            productsService.getProducts.restore();
          });
        it('Verifica se quando a requisição é feita corretamente é retornado status http 201', async () => { 
         await  productsController.getProducts(request,response)
         expect(response.status.calledWith(200)).to.be.equal(true);
         })
         it('Verifica se é retornado o metodo JSON contendo um objeto', async () => { 
         await  productsController.getProducts(request,response)
         expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
        })
     })
});

describe('Verifica se é inserido um novo produto no BD', () => {
    const response = {};
    const request = {};
    beforeEach(() => {
        request.body = {
            "id": 1, "name": "produto", "quantity": 10
        };
        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
        sinon.stub(productsService, 'createProduct')
          .resolves(true);
      })
      afterEach(() => {
        productsService.createProduct.restore();
      });
    describe('Verifica se quando a requisição é feita corretamente é retornado status http 201', () => {
      it('Verifica se retorna um objeto', async () => {
        await  productsController.createProduct(request,response)
        expect(response.status.calledWith(201)).to.be.equal(true);
      });
      it('Verifica se é retornado o metodo JSON contendo um objeto', async () => {
        await  productsController.createProduct(request,response)
        expect(response).to.be.a('object')
      });
    });
});
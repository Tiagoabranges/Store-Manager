
const { expect } = require('chai');
const sinon = require('sinon');

const productsController = require('../../../controllers/ProductsController');
const productsService = require('../../../services/ProductsServices');
describe('Chamando a função getAllProducts no controller ', () => {
  describe('Ao inserir corretamente a função getAllProducts()', () => {
    const response = {};
    const request = {};

   
    beforeEach(() => {
      const execute = [{
        id: 1,
        name: "Martelo de Thor",
        quantity: 10
      },
      {
        id: 2,
        name: "Traje de encolhimento",
        quantity: 20
      }];

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(productsService, 'getProducts').resolves(execute);
    })


    afterEach(() => {
      productsService.getProducts.restore()
    })

    it('Se retorna o status 200', async () => {
      await productsController.getProducts(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('Se o json retorna um array dos produtos', async () => {
      await productsController.getProducts(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  })

  describe('Chamando a função getProductById() no controller', () => {
    const response = {};
    const request = {};
    request.params = { id: '4' };

    
    beforeEach(() => {
      const execute = false;

      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(productsService, 'getProductById').resolves(execute);
    });


    afterEach(() => {
      productsService.getProductById.restore()
    });

    it('Se retorna o status 404', async () => {
      await productsController.getProductById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
    it('Se o json retorna um objeto', async () => {
      await productsController.getProductById(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  })  
})

// falta testar createProduct
describe('Testando a função createProduct da camada controller', () => {
  describe('quando existe o produto',() => {
    const response = {};
    const request = {};
    request.body =  { name: "produto", quantity: 100 };

    
    beforeEach(() => {
      const execute = false;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'createProduct').resolves(execute);
    });


    afterEach(() => {
      productsService.createProduct.restore();
    });

    it('Se retorna o status 409', async () => {
      await productsController.createProduct(request, response);
      expect(response.status.calledWith(409)).to.be.equal(true);
    });
    it('Se retorna o objeto erro', async () => {
      await productsController.createProduct(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });  
  });
});

// falta testar updateProduct
describe('Testando a função updateProduct na camada controller', () => {
  describe('quando não existir o produto',() => {
    const response = {};
    const request = {};
    request.body =  { name: "produto", quantity: 100 };
    request.params = { id: 1 };


    beforeEach(() => {
      const execute = false;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'updateProduct').resolves(execute);
    });

    
    afterEach(() => {
      productsService.updateProduct.restore();
    });

    it('Se retonar o status 404', async () => {
      await productsController.updateProduct(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
    it('Se o retorno é o objeto de erro', async () => {
      await productsController.updateProduct(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});

// falta testar deleteProduct
describe('Testando a função deleteProduct na camada controller', () => {
  describe('quando não existe o produto',() => {
    const response = {};
    const request = {};
    request.params = { id: 1 };

    
    beforeEach(() => {
      const execute = false;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'deleteProduct').resolves(execute);
    });


    afterEach(() => {
      productsService.deleteProduct.restore();
    });

    it('Se retorna o status 404', async () => {
      await productsController.deleteProduct(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
    it('Se o retorno é o objeto de erro', async () => {
      await productsController.deleteProduct(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});
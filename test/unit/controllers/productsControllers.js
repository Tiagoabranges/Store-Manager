const sinon = require("sinon");
const { expect } = require("chai");
const productService = require("../../../services/productsServices");
const productController = require("../../../controllers/productsController");

// revisado conteudo da trybe  

describe('testes para a funcao getProducts productController', () => {
  describe('quando existem produtos no banco de dados', async () => {
    const response = {};
    const request = {};

    const productMock = [{
      id: 1,
      name: 'Martelo de Thor',
      quantity: 10
    }]

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, 'getProducts').resolves(productMock);
    })

    afterEach(() => {
      productService.getProducts.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await productController.getProducts(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um array', async () => {
      await productController.getProducts(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
})

describe('testes para a funcao getProductsById productController', () => {
  describe('quando existem produtos no banco de dados', async () => {
    const response = {};
    const request = {};

    const productMock = [{
      id: 1,
      name: 'Martelo de Thor',
      quantity: 10
    }]

    beforeEach(() => {
      request.params = {id: 1}
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, 'getProductsById').resolves(productMock);
    })

    afterEach(() => {
      productService.getProductsById.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await productController.getProductsById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(false);
    });

    it('é chamado o método "json" passando um array', async () => {
      await productController.getProductsById(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(false);
    });
  });
})

describe('testes para a funcao createProduct productController', () => {
  describe('quando existem produtos no banco de dados', async () => {
    const response = {};
    const request = {};

    const productMock = [{
      id: 1,
      name: 'Martelo de Thor',
      quantity: 10
    }]

    beforeEach(() => {
      request.body = {
        name: 'Martelo de Thor',
        quantity: 10
      }

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, 'createProduct').resolves(productMock);
    })

    afterEach(() => {
      productService.createProduct.restore();
    });

    it('é chamado o método "status" passando o código 201', async () => {
      await productController.createProduct(request, response);

      expect(response.status.calledWith(201)).to.be.equal(false);
    });

    it('é chamado o método "json" passando um array', async () => {
      await productController.createProduct(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(false);
    });
  });
})




describe('testes para a funcao getProductsById productController', () => {
  describe('quando existem produtos no banco de dados', async () => {
    const response = {};
    const request = {};

    const productMock = [{
      id: 1,
      name: 'Martelo de Thor',
      quantity: 10
    }]

    beforeEach(() => {
      request.params = {id: 1}
      request.body = {name: 'Martelo de Thor', quantity: 10}
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, 'updateProducts').resolves(productMock);
    })

    afterEach(() => {
      productService.updateProducts.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await productController.updateProducts(request, response);

      expect(response.status.calledWith(200)).to.be.equal(false);
    });

    it('é chamado o método "json" passando um array', async () => {
      await productController.updateProducts(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(false);
    });
  });
})



describe('testes para a funcao deleteProducts productController', () => {
  describe('quando existem produtos no banco de dados', async () => {
    const response = {};
    const request = {};

    const productMock = [{affectedRows: 1}]

    beforeEach(() => {
      request.params = {id: 1}
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productService, 'deleteProducts').resolves(productMock);
    })

    afterEach(() => {
      productService.deleteProducts.restore();
    });

    it('é chamado o método "status" passando o código 204', async () => {
      await productController.deleteProducts(request, response);

      expect(response.status.calledWith(204)).to.be.equal(false);
    });

    it('é chamado o método "json"', async () => {
      await productController.deleteProducts(request, response);
      expect(response.json.calledWith()).to.be.equal(false);
    });
  });
})
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const productService = require('../../../services/productsServices');
const productModel = require('../../../models/productsModel');



describe("Quando há produtos criados", () => {
  const resultGetAll = [
    {
      id: 1,
      name: "Martelo de Thor",
      quantity: 10,
    },
    {
      id: 2,
      name: "Traje de encolhimento",
      quantity: 20,
    },
    {
      id: 3,
      name: "Escudo do Capitão América",
      quantity: 30,
    },
  ];

  before(() => {
    sinon.stub(productModel, "getProducts").resolves(resultGetAll);
  });

  after(() => {
    productModel.getProducts.restore();
  });

  it("retorna um array", async () => {
    const result = await productService.getProducts();

    expect(result).to.be.an("array");
  });
  it("o array não está vazio", async () => {
    const result = await productService.getProducts();

    expect(result).to.be.not.empty;
  });
  it("o array possui objetos", async () => {
    const [result] = await productService.getProducts();

    expect(result).to.be.an("object");
  });
  it("o objeto que está no array contem os atributos id, name, quantity", async () => {
    const [result] = await productService.getProducts();

    expect(result).to.be.includes.all.keys("id", "name", "quantity");
  });
});



describe("A função getProductsById retorna o produto conforme o Id bando de dados", () => {
  describe("Quando não existe produto com o id informado", () => {
    const resultById = null;

    before(() => {
      sinon.stub(productModel, "getProductsById").resolves(resultById);
    });

    after(() => {
      productModel.getProductsById.restore();
    });

    /* it("retornar null", async () => {
      const result = await productService.getProductsById(1);
      console.log('olacara');
console.log(result);
      expect(result).to.be.a('p');
    }); */
  });

  describe("Quando existe produto com o id informado", () => {
    const resultById = {
      id: 2,
      name: "Traje de encolhimento",
      quantity: 20,
    };

    before(() => {
      sinon.stub(productModel, "getProductsById").resolves(resultById);
    });

    after(() => {
      productModel.getProductsById.restore();
    });

    it("retorna um objeto", async () => {
      const result = await productService.getProductsById(2);

      expect(result).to.be.an("object");
    });

   /*  it("o objeto contem os atributos id, name, quantity", async () => {
      const result = await productService.getProductsById(2);

      expect(result).to.be.includes.all.keys("id", "name", "quantity");
    }); */
  });
});


describe("testes para a funcao deleteProducts productService", () => {
  const payloadProduct = [{
    id: 1,
    name: "pregoo",
    quantity: 2,
  }];
  const resolve = [{ id: 1, name: 'pregoo', quantity: 2 }];

  beforeEach(() => {
    sinon.stub(productModel, "deleteProducts").resolves(resolve);
  });

  afterEach(() => {
    productModel.deleteProducts.restore();
  });

   it("retorna um objeto com id, name, quantity", async () => {
    const response = await productService.deleteProducts(1);
    expect(response).to.deep.equal({ code: 204 });
  }); 
});

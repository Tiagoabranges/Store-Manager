const sinon = require("sinon");
const { expect } = require("chai");
const productService = require("../../../services/productsServices");
const productController = require("../../../controllers/productsController");

describe("Testar as funções do service Product", () => {
  describe("Chamado do controller getProducts", () => {
    describe("Quando não existe produtos no DB", () => {
      const res = {};
      const req = {};
      const resultgetProducts = [];

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productService, "getProducts").resolves(resultgetProducts);
      });

      after(() => {
        productService.getProducts.restore();
      });

      it("é retornado o metodo 'status' passando o codigo 200", async () => {
        await productController.getProducts(req, res);

        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it("é retornado o metodo json contendo um array", async () => {
        await productController.getProducts(req, res);

        expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
      });
    });

    describe("Quando existe produtos no DB", () => {
      const res = {};
      const req = {};
      const resultgetProducts = [
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
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productService, "getProducts").resolves(resultgetProducts);
      });

      after(() => {
        productService.getProducts.restore();
      });

      it("é retornado o metodo 'status' passando o codigo 200", async () => {
        await productController.getProducts(req, res);

        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it("é retornado o metodo json contendo um array", async () => {
        await productController.getProducts(req, res);

        expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
      });

      it("é retornado o metodo json contendo um array", async () => {
        await productController.getProducts(req, res);

        expect(res.json.calledWith(resultgetProducts)).to.be.equal(true);
      });
    });
  });

  describe("Chamado do controller getProductsById", () => {
    describe("Quando não existe produto no DB com o id informado", () => {
      const res = {};
      const req = {};
      const resultById = null;

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        req.params = sinon.stub().returns(req);

        sinon.stub(productService, "getProductsById").resolves(resultById);
      });

      after(() => {
        productService.getProductsById.restore();
      });

      it("é retornado o metodo 'status' passando o codigo 404", async () => {
        await productController.getProductsById(req, res);

        expect(res.status.calledWith(404)).to.be.equal(true);
      });

      it("é retornado o metodo json contendo { message: 'Product not found' }", async () => {
        await productController.getProductsById(req, res);

        expect(
          res.json.calledWith({ message: "Product not found" })
        ).to.be.equal(true);
      });
    });

    describe("Quando existe produto no DB com o id informado", () => {
      const res = {};
      const req = {};
      const resultById = { id: 1, name: "Martelo de Thor", quantity: 10 };

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        req.params = sinon.stub().returns({ id: 1 });

        sinon.stub(productService, "getProductsById").resolves(resultById);
      });

      after(() => {
        productService.getProductsById.restore();
      });

      it("é retornado o metodo 'status' passando o codigo 200", async () => {
        await productController.getProductsById(req, res);

        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it("é retornado o metodo json contendo um objeto", async () => {
        await productController.getProductsById(req, res);

        expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
      });

      it("é objeto deve conter { id: 1, name: 'Martelo de Thor', quantity: 10 }", async () => {
        await productController.getProductsById(req, res);

        expect(res.json.calledWith(resultById)).to.be.equal(true);
      });
    });
  });

  describe("Chamado do controller createProduct", () => {
    describe("Quando o produto já existe no DB", () => {
      const res = {};
      const req = {
        body: { name: "Martelo de Thor", quantity: 10 },
      };
      const resultCreate = null;

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productService, "createProduct").resolves(resultCreate);
      });

      after(() => {
        productService.createProduct.restore();
      });

      it("é retornado o metodo 'status' passando o codigo 409", async () => {
        await productController.createProduct(req, res);

        expect(res.status.calledWith(409)).to.be.equal(true);
      });

      it("é retornado o metodo json contendo { message: 'Product already exists' }", async () => {
        await productController.createProduct(req, res);

        expect(
          res.json.calledWith({ message: "Product already exists" })
        ).to.be.equal(true);
      });
    });

    describe("Quando não existe o produto no DB e um novo é criado", () => {
      const res = {};
      const req = {
        body: { name: "Martelo de Thor", quantity: 10 },
      };
      const resultCreate = { id: 1, name: "Martelo de Thor", quantity: 10 };

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productService, "createProduct").resolves(resultCreate);
      });

      after(() => {
        productService.createProduct.restore();
      });

      it("é retornado o metodo 'status' passando o codigo 201", async () => {
        await productController.createProduct(req, res);

        expect(res.status.calledWith(201)).to.be.equal(true);
      });

      it("é retornado o metodo json contendo um objeto", async () => {
        await productController.createProduct(req, res);

        expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
      });

      it("é objeto deve conter { id: 1, name: 'Martelo de Thor', quantity: 10 }", async () => {
        await productController.createProduct(req, res);

        expect(res.json.calledWith(resultCreate)).to.be.equal(true);
      });
    });
  });

  describe("Chamado do controller updateProducts", () => {
    describe("Quando não existe produto já existe no DB", () => {
      const res = {};
      const req = {
        params: { id: 1 },
        body: { name: "Martelo de Thor", quantity: 10 },
      };
      const resultUpdate = null;

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productService, "updateProducts").resolves(resultUpdate);
      });

      after(() => {
        productService.updateProducts.restore();
      });

      it("é retornado o metodo 'status' passando o codigo 404", async () => {
        await productController.updateProducts(req, res);

        expect(res.status.calledWith(404)).to.be.equal(true);
      });

      it("é retornado o metodo json contendo { message: 'Product not found' }", async () => {
        await productController.updateProducts(req, res);

        expect(
          res.json.calledWith({ message: "Product not found" })
        ).to.be.equal(true);
      });
    });

    describe("Quando existe produto já existe no DB e é feito a atualização", () => {
      const res = {};
      const req = {
        params: { id: 1 },
        body: { name: "Martelo de Thor", quantity: 10 },
      };
      const resultUpdate = { id: 1, name: "Martelo de Thor", quantity: 10 };

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productService, "updateProducts").resolves(resultUpdate);
      });

      after(() => {
        productService.updateProducts.restore();
      });

      it("é retornado o metodo 'status' passando o codigo 200", async () => {
        await productController.updateProducts(req, res);

        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it("é retornado o metodo json contendo o objeto do produto atualizado", async () => {
        await productController.updateProducts(req, res);

        expect(
          res.json.calledWith({
            id: 1,
            name: "Martelo de Thor",
            quantity: 10,
          })
        ).to.be.equal(true);
      });
    });
  });

  describe("Chamado do controller deleteProducts", () => {
    describe("Quando não existe produto no DB", () => {
      const res = {};
      const req = {
        params: { id: 1 },
        body: { name: "Martelo de Thor", quantity: 10 },
      };
      const resultDelete = null;

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productService, "deleteProducts").resolves(resultDelete);
      });

      after(() => {
        productService.deleteProducts.restore();
      });

      it("é retornado o metodo 'status' passando o codigo 404", async () => {
        await productController.deleteProducts(req, res);

        expect(res.status.calledWith(404)).to.be.equal(true);
      });

      it("é retornado o metodo json contendo { message: 'Product not found' }", async () => {
        await productController.deleteProducts(req, res);

        expect(
          res.json.calledWith({ message: "Product not found" })
        ).to.be.equal(true);
      });
    });

    describe("Quando existe produto já existe no DB e é feito a atualização", () => {
      const res = {};
      const req = {
        params: { id: 1 },
        body: { name: "Martelo de Thor", quantity: 10 },
      };
      const resultDelete = {};

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productService, "deleteProducts").resolves(resultDelete);
      });

      after(() => {
        productService.deleteProducts.restore();
      });

      it("é retornado o metodo 'status' passando o codigo 200", async () => {
        await productController.deleteProducts(req, res);

        expect(res.status.calledWith(204)).to.be.equal(true);
      });

      it("é retornado o metodo json contendo o objeto do produto atualizado", async () => {
        await productController.deleteProducts(req, res);

        expect(res.json.calledWith({})).to.be.equal(true);
      });
    });
  });
});

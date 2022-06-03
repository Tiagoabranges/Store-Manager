const chai = require('chai');
const { it } = require('mocha');
const expect = chai.expect;
const sinon = require('sinon');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe((' função getProducts do models f'), () => {
  describe('e não tiverem produtos a serem listados', () => {
    before(async () => {
      const result = [[]];

      sinon.stub(connection, 'execute').resolves(result);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const response = await productsModel.getProducts();

      expect(response).to.be.a('array');
    });

    it('retorna um array vazio', async () => {
      const response = await productsModel.getProducts();

      expect(response).to.have.length(0);
    });
  });

  describe('e tiverem produtos a serem listados', () => {
    before(async () => {
      const result = [
        [
          {
            id: 1,
            name: 'Martelo de Thor',
            quantity: '10',
          },
          {
            id: 2,
            name: 'Traje de encolhimento',
            quantity: '20',
          },
          {
            id: 3,
            name: 'Escudo do Capitão América',
            quantity: '30',
          }
        ]
      ];

      sinon.stub(connection, 'execute').resolves(result);
    });

    after(async () => {
      connection.execute.restore();
    });
    it('retorna um array', async () => {
      const response = await productsModel.getProducts();

      expect(response).to.be.a('array');
    });
    it('retorna um array com 3 itens', async () => {
      const response = await productsModel.getProducts();

      expect(response).to.have.length(3);
    });

    it('o primeiro item deve ser um objeto', async () => {
      const response = await productsModel.getProducts();

      expect(response[0]).to.be.a('object');
    });

    it('o primeiro item deve ser um objeto com as chaves "id", "name" e "quantity"', async () => {
      const response = await productsModel.getProducts();

      expect(response[0]).to.have.keys('id', 'name', 'quantity');
    });
  });
});

describe('Quando a funcao getProductsById é chamada e nao existe id', () => {
  describe('verifica', () => {
    before(() => {
      const response = 'product not found' 
      sinon.stub(connection, 'execute').resolves(response);
    });
    after(() => connection.execute.restore());

    it('se retorna uma string', async  () => {
      const result = await productsModel.getProductsById(2);
      console.log(result);
      expect(result).to.be.a('string');
      
      });

      it('se o conteudo da string é igual a Product not found', async  () => {
        const result = await productsModel.getProductsById();
        console.log(result);
        expect(result).to.be.equal('p');
        
        });
  })
})

describe('Quando a funcao getProductsById é chamada e o id existe', () => {
describe('verifica' , () => {
  
  before(() => {
    const response = [{
      id: 1,
      name: 'Martelo de Thor',
      quantity: '10',}];
    sinon.stub(connection, 'execute').resolves(response);
  });
  after(() => connection.execute.restore());

it('se retorna um objeto',async  () => {
const result = await productsModel.getProductsById(1);

expect(result).to.be.a('object');

});
it('o objeto deve conter as chaves id, bame, quantity',async  () => {
  const result = await productsModel.getProductsById(1);
  
  expect(result).to.have.keys('id', 'name', 'quantity');
     });
   });
});

describe('testes para a funcao deleteProduct productModel', () => {
  describe('Quando não encontra nenhum produto', () => {
    const resolve = [[]]
    const payloadProduct = {};
    
    beforeEach(() => {
      sinon.stub(connection, "execute").resolves(resolve);
    });
  
    afterEach(() => {
      connection.execute.restore();
    });
    
    it("retorna um array vazio", async () => {
      const response = await productsModel.deleteProducts(1);
      expect(response).to.deep.equal(payloadProduct);
    });
  })

  describe('Quando encontra o produto', () => {
    const resolve = [{affectedRows: 1}]
    const payloadProduct = {};
    
    beforeEach(() => {
      sinon.stub(connection, "execute").resolves(resolve);
    });
  
    afterEach(() => {
      connection.execute.restore();
    });

    it("retorna um array com valores", async () => {
      const response = await productsModel.deleteProducts(1);
      expect(response).to.deep.equal(payloadProduct);
    });
  })
});

describe("testes para a funcao updateProduct productModel", () => {
  const payloadProduct = {
    id: 1,
    name: "prego",
    quantity: 2,
  };
  const resolve = [];

  beforeEach(() => {
    sinon.stub(connection, "execute").resolves(resolve);
  });

  afterEach(() => {
    connection.execute.restore();
  });

  it("retorna um objeto com id, name, quantity", async () => {
    const response = await productsModel.updateProducts("prego", 2, 1);
    expect(response).to.deep.equal(payloadProduct);
  });
});

describe("testes para a funcao createProduct productsModel", () => {
  const payloadProduct = {
    id: 1,
    name: "prego",
    quantity: 2,
  };
  const resolve = [{insertId: 1}];

  beforeEach(() => {
    sinon.stub(connection, "execute").resolves(resolve);
  });

  afterEach(() => {
    connection.execute.restore();
  });

  it("retorna um objeto com id, name, quantity", async () => {
    const response = await productsModel.createProduct("prego", 2);
    expect(response).to.deep.equal(payloadProduct);
  });
});



const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const saleService = require('../../../services/saleServices');
const saleController = require('../../../controllers/saleController');



describe('getAll sales at Controller', () => {
  const req = {};
  const res = {};
  const payload = [
    {
      saleId: 1,
      date: '2022-05-20T05:01:48.000Z',
      productId: 1,
      quantity: 5
    }
];

before(() => {
  sinon.stub(saleService, 'getSales').resolves(payload);
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(payload);
});

after(() => {
saleService.getSales.restore();
});

it('array of object with sales is Returned', async () => {
await saleController.getSales(req, res);
expect(res.json.calledWith(payload)).to.be.equal(true);
});

it('Status 200 is returned?', async () => {
await saleController.getSales(req, res);
expect(res.status.calledWith(200)).to.be.equal(true);
});
});

describe('getSalesById at Controller', () => {
const req = {};
const res = {};
const payload = [
  {
    saleId: 1,
    date: '2022-05-20T05:01:48.000Z',
    productId: 1,
    quantity: 5
  }
];

before(() => {
sinon.stub(saleService, 'getSalesById').resolves(payload);
res.status = sinon.stub().returns(res);
res.json = sinon.stub().returns(payload);
req.params = sinon.stub().returns(1);
});

after(() => {
saleService.getSalesById.restore();
});

it('sale is Returned', async () => {
await saleController.getSalesById(req, res);
expect(res.json.calledWith(payload)).to.be.equal(true);
});

it('Status 200 is returned?', async () => {
await saleController.getSalesById(req, res);
expect(res.status.calledWith(200)).to.be.equal(true);
});
});
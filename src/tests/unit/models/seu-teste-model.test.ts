import * as sinon from 'sinon';
import { expect } from 'chai';
import CarModel from '../../../models/Car';
import mongoose from 'mongoose'
import { carMock, carMockId, carMockUpdatePartial, carMockDelete } from '../../mocks/carMock';

describe('Car Model testing', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(mongoose.Model, 'create').resolves(carMockId);
    sinon.stub(mongoose.Model, 'find').resolves([carMockId]);
    sinon.stub(mongoose.Model, 'findOne').resolves(carMockId);
    sinon.stub(mongoose.Model, 'findByIdAndUpdate').resolves(carMockId);
    sinon.stub(mongoose.Model, 'findOneAndDelete').resolves(carMockDelete);
  });

  after(()=>{
    sinon.restore();
  })

  it('sucessfully created', async () => {
    const newCar = await carModel.create(carMock);
    expect(newCar).to.be.deep.equal(carMockId);
  });

  describe('Searching all cars', () => {
    it('successfully found', async () => {
        const allCarsFound = await carModel.read();
        expect(allCarsFound).to.be.deep.equal([carMockId]);
    });

    it('_id not found', async () => {
      try {
          await carModel.read();
      } catch (error: any) {
          expect(error.message).to.be.eq('InvalidMongoId');
      }
  });
});

  describe('Searching a car', () => {
    it('successfully found', async () => {
        const carFound = await carModel.readOne('4edd40c86762e0fb12000003');
        expect(carFound).to.be.deep.equal(carMockId);
    });

    it('_id not found', async () => {
      try {
          await carModel.readOne('123ERRADO');
      } catch (error: any) {
          expect(error.message).to.be.eq('InvalidMongoId');
      }
  });
});

describe('Update a car', () => {
  it('successfully updated', async () => {
      const carUpdated = await carModel
        .update(carMockId._id, carMockUpdatePartial);
      expect(carUpdated).to.be.deep.equal(carMockId);
  });
});

describe('Deleting a car', () => {
  it('successfully deleted', async () => {
    const carDeleted = await carModel.delete('4edd40c86762e0fb12000003');
    expect(carDeleted).to.be.deep.equal(carMockDelete);
  });

  it('_id not found', async () => {
    try {
      await carModel.delete('123ERRADO');
    } catch (error: any) {
      expect(error.message).to.be.eq('InvalidMongoId');
    }
  });
})
});
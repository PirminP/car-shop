import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import { carMock, carMockId, carMockUpdatePartial, carMockDelete } from '../../mocks/carMock';
import mongoose from 'mongoose';

describe('Car Service Testing', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);

  before(() => {
		sinon.stub(mongoose.Model, 'create').resolves(carMockId);
		sinon.stub(mongoose.Model, 'findOne')
    // na chamada de index 0 `carModel.readOne` vai responder um fakeCar
			.onCall(0).resolves(carMockId) 
    // já na próxima chamada ele vai mudar seu retorno, isso pode ser feito várias vezes
			.onCall(1).resolves(null); 

    sinon.stub(mongoose.Model, 'find').resolves([carMockId]);
    sinon.stub(mongoose.Model, 'findByIdAndUpdate').resolves(carMockId);
    sinon.stub(mongoose.Model, 'findOneAndDelete').resolves(carMockDelete);
	})

	after(() => {
		sinon.restore()
	})

	describe('Create Car', () => {
		it('Success', async () => {
			const carCreated = await carService.create(carMock);
      expect(carCreated).to.be.deep.equal(carMockId);
		});

    it('Failure', async () => {
			let error;
			try {
				await carService.create({});
			} catch (err) {
				error = err
			}
      expect(error).to.be.instanceOf(ZodError);
		});
	});

  describe('Read all Cars', () => {
		it('Success', async () => {
			const allCarsFound = await carService.read();
      expect(allCarsFound).to.be.deep.equal([carMockId]);
		});

  describe('ReadOne Car', () => {
		it('Success', async () => {
			const carFound = await carService.readOne(carMockId._id);

			expect(carFound).to.be.deep.equal(carMockId);
		});

		it('Failure', async () => {
      let error;
			try {
				await carService.readOne(carMockId._id);
			} catch (err:any) {
				error = err
			}

			expect(error, 'Error should be defined').not.to.be.undefined;
			expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
	});

  describe('Update a Car', () => {
		it('Success', async () => {
			const carUpdated = await carService
        .update(carMockId._id, carMockUpdatePartial);

			expect(carUpdated).to.be.deep.equal(carMockId);
		});
	});

  describe('Delete a Car', () => {
		it('Success', async () => {
			const carDeleted = await carService.delete(carMockId._id);

			expect(carDeleted).to.be.deep.equal(carMockDelete);
		});
  });
});
});
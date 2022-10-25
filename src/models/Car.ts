import { model as mongooseCreateModel, Schema } from 'mongoose';
import { boolean, number, string } from 'joi';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const carMongooseValidation = new Schema<ICar>({
  model: string,
  year: number,
  color: string,
  status: boolean,
  buyValue: number,
  doorsQty: number,
  seatsQty: number,
});
  
class Car extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('Car', carMongooseValidation)) {
    super(model);
  }
}
  
export default Car;
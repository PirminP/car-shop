import { IService } from '../interfaces/IService';
import { ICar, CarZodValidation } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class CarService implements IService<ICar> {
  // quando fazemos IService<ICar> acima 
  // estamos implementando a interface com o tipo ICar com o parâmetro genérico
  private _car:IModel<ICar>;
  // o mesmo fazemos aqui com a interface do Model
  constructor(model:IModel<ICar>) {
    this._car = model;
  }

  public async create(obj:unknown):Promise<ICar> {
    // recebemos uma variável qualquer, e garantimos que ela é um objeto com formato correto utilizando o zod
    const parsed = CarZodValidation.safeParse(obj);
    // agora, caso os tipos estejam errados, nós lançaremos um erro
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._car.create(parsed.data);
  }

  public async read():Promise<ICar[]> {
    const readCar = await this._car.read();
    if (!readCar) {
      throw new Error(ErrorTypes.EntityNotFound);
    }
    return readCar;
  }

  public async readOne(_id:string):Promise<ICar> {
    const readCarId = await this._car.readOne(_id);
    if (!readCarId) {
      throw new Error(ErrorTypes.EntityNotFound);
    }
    return readCarId;
  }

  public async update(_id: string, obj:unknown):Promise<ICar | null> {
    const parsed = CarZodValidation.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    const updateCar = await this._car.update(_id, parsed.data);
    if (!updateCar) {
      throw new Error(ErrorTypes.EntityNotFound);
    }
    return updateCar;
  }

  public async delete(_id:string):Promise<ICar | null> {
    const deleteCar = await this._car.delete(_id);
    if (!deleteCar) {
      throw new Error(ErrorTypes.EntityNotFound);
    }
    return deleteCar;
  }
}

export default CarService;
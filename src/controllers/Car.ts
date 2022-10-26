import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class CarController {
  constructor(private _service: IService<ICar>) { }

  public async create(
    req: Request,
    // Usamos o IFrame como parâmetro genérico do Request
    // para declarar que vamos responder a requisição com um objeto do tipo IFrame
    res: Response<ICar>,
  ) {
    const { model, year, color, buyValue, doorsQty, seatsQty } = req.body;
    const carType = { model, year, color, buyValue, doorsQty, seatsQty };
    const resultCar = await this._service.create(carType);
    return res.status(201).json(resultCar);
  }

  public async read(
    req: Request,
    res: Response<ICar[]>,
  ) {
    const resultReadCar = await this._service.read();
    return res.status(200).json(resultReadCar);
  }

  public async readOne(
    req: Request,
    res: Response<ICar | null>,
  ) {
    const resultReadCarId = await this._service.readOne(req.params.id);
    return res.status(200).json(resultReadCarId);
  }

  public async update(
    req: Request,
    res: Response<ICar | null>,
  ) {
    const resultUpdateCar = await this._service.update(req.params.id, req.body);
    return res.status(200).json(resultUpdateCar);
  }

  public async delete(
    req: Request,
    res: Response<ICar | null>,
  ) {
    const resultDeleteCar = await this._service.delete(req.params.id);
    return res.status(204).json(resultDeleteCar);
  }
}
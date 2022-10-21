import { z } from 'zod';
import { VehicleZodValidation } from './IVehicle';

const CarZodValidation = VehicleZodValidation.extend({
  doorsQty: z.number().int().positive()
    .gte(2)
    .lte(4),
  seatsQty: z.number().int().positive()
    .gte(2)
    .lte(7),
});

type ICar = z.infer<typeof CarZodValidation>;

export { CarZodValidation, ICar };
import { ICar } from "../../interfaces/ICar";

const carMock: ICar = {
    model: 'Fiat Argo',
    year: 2021,
    color: 'black',
    buyValue: 70000,
    doorsQty: 2,
    seatsQty: 2,
}    

const carMockId: ICar & {_id: string } = {
    _id: '4edd40c86762e0fb12000003',
    model: 'Fiat Argo',
    year: 2021,
    color: 'dark',
    buyValue: 70000,
    doorsQty: 2,
    seatsQty: 2,
}
  type carUpdate = Omit<ICar, '_id'>
const carMockUpdatePartial: carUpdate = {
    model: 'Fiat Argo',
    year: 2021,
    color: 'dark',
    buyValue: 60000,
    doorsQty: 2,
    seatsQty: 2,
}

const carMockDelete = {
   ...carMockId,
 }



export { carMock, carMockId, carMockUpdatePartial, carMockDelete };
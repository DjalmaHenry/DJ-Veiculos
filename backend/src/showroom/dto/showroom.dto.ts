/* eslint-disable prettier/prettier */
export class ShowroomDto {
    id?: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    fuel: string;
    engine: string;
    transmission: string;
    drive: string;
    color: string;
    img?: string;
}

export interface IDocument<T> {
    id: string;
    data: T;
}

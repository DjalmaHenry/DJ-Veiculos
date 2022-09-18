import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Car } from "../models/car.model";

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(private http: HttpClient) { }

  // getCars(): Observable<Car[]> {
  //   return this.http.get<Car[]>(`${environment.API}/showroom`);
  // }

  // getCar(id: string): Observable<any> {
  //   return this.http.get<any>(`${environment.API}/showroom/${id}`);
  // }

  // postCar(car: Car): Observable<Car> {
  //   return this.http.post<Car>(`${environment.API}/showroom`, car);
  // }

  // putCar(car: Car): Observable<Car> {
  //   return this.http.put<Car>(`${environment.API}/showroom/${car.id}`, car);
  // }

  // deleteCar(id: any): Observable<Car> {
  //   return this.http.delete<Car>(`${environment.API}/showroom/${id}`);
  // }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${environment.API}/cars`);
  }

  postCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${environment.API}/cars`, car);
  }

  putCar(car: Car): Observable<Car> {
    return this.http.put<Car>(`${environment.API}/cars/${car.id}`, car);
  }

  deleteCar(id: any): Observable<Car> {
    return this.http.delete<Car>(`${environment.API}/cars/${id}`);
  }
}

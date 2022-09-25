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

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${environment.API}/showroom`);
  }

  getCar(id: string): Observable<Car> {
    return this.http.get<Car>(`${environment.API}/showroom/${id}`);
  }

  postCar(car: Car): Observable<string> {
    return this.http.post<string>(`${environment.API}/showroom`, car);
  }

  putCar(car: Car) {
    return this.http.put(`${environment.API}/showroom/${car.id}`, car);
  }

  deleteCar(id: string) {
    return this.http.delete(`${environment.API}/showroom/${id}`);
  }
}

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
        return this.http.get<Car[]>(`${environment.API}/cars`);
    }

    postCar(car: Car): Observable<Car> {
        return this.http.post<Car>(`${environment.API}/cars`, car);
    }

    putCar(car: Car): Observable<Car> {
        return this.http.put<Car>(`${environment.API}/cars/${car.id}`, car);
    }

    deleteCar(id: number): Observable<Car> {
        return this.http.delete<Car>(`${environment.API}/cars/${id}`);
    }

    compress(file: File, MAX_WIDTH: number = 200, MAX_HEIGHT: number = 200): Observable<any> {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      return Observable.create((observer: any) => {
        reader.onload = (ev) => {
          const img = new Image();

          img.src = (ev.target as any).result;

          (img.onload = () => {
            const elem = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;

                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;

                height = MAX_HEIGHT;
              }
            }
            elem.width = width;
            elem.height = height;
            const ctx = elem.getContext('2d') as CanvasRenderingContext2D;
            ctx.drawImage(img, 0, 0, width, height);
            ctx.canvas.toBlob(
              (blob) => {
                observer.next(
                  new File([blob as BlobPart], file.name, {
                    type: file.type,

                    lastModified: Date.now()
                  })
                );
              },
              file.type,
              1
            );
          }),
            (reader.onerror = (error) => observer.error(error));
        };
      });
    }
}

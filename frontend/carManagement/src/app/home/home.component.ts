import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, take, throwError } from 'rxjs';
import { CarService } from '../services/car.service';
import { Car } from './../models/car.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cars: Car[] = [];

  carDetailsActual: Car = {} as Car;

  isEdit: boolean = false;

  formCar: FormGroup | any;

  atualIndex: number = 0;

  constructor(private carService: CarService, private detectorChanges: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.formCar = new FormGroup({
      brand: new FormControl('', [Validators.required]), // Marca
      model: new FormControl('', [Validators.required]), // Modelo
      year: new FormControl('', [Validators.required]), // Ano
      price: new FormControl('', [Validators.required]), // Preço
      mileage: new FormControl('', [Validators.required]), // Quilometragem
      fuel: new FormControl('', [Validators.required]), // Combustível
      engine: new FormControl('', [Validators.required]), // Motor
      trasmission: new FormControl('', [Validators.required]), // Câmbio
      drive: new FormControl('', [Validators.required]), // Tração
      color: new FormControl('', [Validators.required]), // Cor
      img: new FormControl(''), // Imagem
    });
    this.carService.getCars().subscribe((cars: Car[]) => {
      this.cars = cars;
    })
  }

  saveCarForm() {
    const dataCar: Car = this.formCar.value;
    if (!this.isEdit) {
      this.carService.postCar(dataCar).subscribe((car: Car) => {
        this.cars.push(car);
      }
      );
      return
    }
    dataCar.id = this.cars[this.atualIndex].id;
    this.carService.putCar(dataCar).subscribe((car: Car) => {

      const index = this.cars.findIndex((c: Car) => c.id === car.id);
      this.cars[index] = car;
    }
    );
  }

  deleteCar(i: number) {
    this.carService.deleteCar(this.cars[i].id).subscribe((res: Car) => {
      console.log(res);
    })
    this.cars.splice(i, 1);
  }

  editCar(i: number) {
    this.atualIndex = i;
    this.isEdit = true;
    this.fillForm(this.cars[i])
  }

  addCar() {
    this.isEdit = false;
    this.formCar.reset()
  }

  fillForm(data: Car) {
    this.formCar.patchValue({
      brand: data.brand,
      model: data.model,
      year: data.year,
      price: data.price,
      mileage: data.mileage,
      fuel: data.fuel,
      engine: data.engine,
      trasmission: data.trasmission,
      drive: data.drive,
      color: data.color,
      img: data.img,
    })
  }

  onFileSelected(e: any) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    if (!file || !file.type.match(pattern)) return;

    const maxAvatarImage = 2;
    if (Math.round(file.size / 1024) >= maxAvatarImage * 1000) return;

    this.carService
      .compress(file)
      .pipe(
        take(1),
        catchError((event) => {
          return throwError(event);
        })
      )
      .subscribe((response) => {
        const reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onload = () => {
          this.formCar.get('img').setValue(reader.result as string);
          console.log(this.formCar.get('img').value);

        };
      });
  }

  changeAvatar() {
    document.getElementById('uploadImg')?.click();
  }

  fillCarDetails(index: number) {
    this.carDetailsActual = this.cars[index];
  }
}

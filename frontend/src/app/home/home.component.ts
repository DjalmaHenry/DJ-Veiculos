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

  imgCarDefault: string = "../../assets/img/cars/car-default.jpg";

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
      transmission: new FormControl('', [Validators.required]), // Câmbio
      drive: new FormControl('', [Validators.required]), // Tração
      color: new FormControl('', [Validators.required]), // Cor
    });

    this.loadCars();
  }

  loadCars() {
    this.carService.getCars().subscribe((cars: Car[]) => {
      this.cars = cars;
    });
  }

  saveCarForm() {
    const dataCar: Car = this.formCar.value;
    if (!this.isEdit) {
      this.carService.postCar(dataCar).subscribe((id: string) => {
        if (id) {
          this.loadCars();
        } else { }
      }
      );
      return;
    }
    dataCar.id = this.cars[this.atualIndex].id;
    // this.carService.putCar(dataCar).subscribe((car: Car) => {

    //   const index = this.cars.findIndex((c: Car) => c.id === car.id);
    //   this.cars[index] = car;
    // }
    // );
  }

  deleteCar(i: string | undefined) {
    if (i) {
      this.carService.deleteCar(i).subscribe(() => {
        this.loadCars();
      });
    }
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
      transmission: data.transmission,
      drive: data.drive,
      color: data.color,
    })
  }

  onFileSelected(event: any) {
    const reader = new FileReader();
    let imgAux: string = "";

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formCar.patchValue({
          img: reader.result as string
        });
      };
    }

  }

  changeAvatar() {
    document.getElementById('uploadImg')?.click();
  }

  fillCarDetails(index: number) {
    this.carDetailsActual = this.cars[index];
  }
}

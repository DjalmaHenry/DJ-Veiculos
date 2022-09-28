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

  atualIndex: any

  loading: boolean = false;

  imgCarDefault: string = "../../assets/img/cars/car-default.jpg";

  nameCars: string[] = [
    "alfaRomeu",
    "astonMartin",
    "audi",
    "bmw",
    "bugatti",
    "cadillac",
    "chevrolet",
    "caoaChery",
    "citroen",
    "corvette",
    "ferrari",
    "fiat",
    "ford",
    "gmc",
    "jeep",
    "koenigsegg",
    "landRover",
    "maserati",
    "mazda",
    "mclaren",
    "mercedesbenz",
    "mini",
    "mitsubishi",
    "porche",
    "ram",
    "renault",
    "rollsRoyce",
    "subaru",
    "tesla",
    "volkswagen",
    "volvo"
  ];


  constructor(private carService: CarService, private detectorChanges: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.formCar = new FormGroup({
      brand: new FormControl('', [Validators.required]), // Marca
      model: new FormControl('', [Validators.required]), // Modelo
      year: new FormControl(0, [Validators.required]), // Ano
      price: new FormControl(0, [Validators.required]), // Preço
      mileage: new FormControl(0, [Validators.required]), // Quilometragem
      fuel: new FormControl('', [Validators.required]), // Combustível
      engine: new FormControl('', [Validators.required]), // Motor
      transmission: new FormControl('', [Validators.required]), // Câmbio
      drive: new FormControl('', [Validators.required]), // Tração
      color: new FormControl('', [Validators.required]), // Cor
      img: new FormControl('', [Validators.required]), // Imagem
    });

    this.loadCars();
    this.formCar.get('brand')?.valueChanges.subscribe((value: string) => {
      this.formCar.patchValue({
        img: `../../assets/img/cars/${value}.webp`
      });
    });
  }

  loadCars(id?: string) {
    this.loading = true;
    this.carService.getCars().subscribe((cars: Car[]) => {
      this.cars = cars;
      if (!this.isEdit) {
        this.cars.forEach((car: Car) => {
          if (car.id === id) {
            car.img = `../../assets/img/cars/${car.brand}.webp`;
            console.log(car.img);

          }
        });
      }
      this.loading = false;
    });
  }

  saveCarForm() {
    const dataCar: Car = {
      id: this.atualIndex,
      brand: this.formCar.value.brand,
      model: this.formCar.value.model,
      year: this.formCar.value.year,
      price: this.formCar.value.price,
      mileage: this.formCar.value.mileage,
      fuel: this.formCar.value.fuel,
      engine: this.formCar.value.engine,
      transmission: this.formCar.value.transmission,
      drive: this.formCar.value.drive,
      color: this.formCar.value.color,
    }

    if (!this.isEdit) {
      debugger
      this.carService.postCar(dataCar).subscribe((id: string) => {

        this.loadCars(id);

      }
      );
      return;
    }
    this.carService.putCar(dataCar).subscribe(() => {
      this.loadCars();
    }
    );
  }

  deleteCar(i: string | undefined) {
    if (i) {
      this.carService.deleteCar(i).subscribe(() => {
        this.loadCars();
      });
    }
  }

  editCar(i: string | undefined) {
    if (i) {
      this.carService.getCar(i).subscribe((car: Car) => {
        this.isEdit = true;
        this.atualIndex = car.id;
        this.fillForm(car);
      });
    }
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

  setImgCar() {
    // if (this.formCar.get('brand')?.value) {
    //   this.formCar.patchValue({
    //     img: `../../assets/img/cars/${this.formCar.get('brand')?.value}.png`
    //   });
    // }

  }
}

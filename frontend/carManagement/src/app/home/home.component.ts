import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Car } from '../models/car.model';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cars: Car[] = [];

  formCar: FormGroup | any;

  constructor(private carService: CarService) { }

  ngOnInit(): void {

    this.formCar = new FormGroup({
      brand: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      img: new FormControl(''),
      velocity: new FormControl('', [Validators.required]),
    });
    this.carService.getCars().subscribe((cars: Car[]) => {
      this.cars = cars;
    })
  }

  formControl() {
    console.log(this.formCar.value);
    this.cars.push(this.formCar.value);
    this.carService.postCar(this.formCar.value).subscribe((car: Car) => {
      console.log(car);
    }
    );

  }

  deleteCar(i: number) {
    this.cars.splice(i, 1);
  }

  onFileSelected(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        // this.imageSrc = reader.result as string;

        this.formCar.patchValue({
          img: reader.result
        });

      };

    }

  }
}

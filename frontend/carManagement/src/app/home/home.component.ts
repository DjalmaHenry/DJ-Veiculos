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

  formCar: FormGroup | any;

  constructor(private carService: CarService, private detectorChanges: ChangeDetectorRef) { }

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

  editCar(i: number) {
    this.fillForm(this.cars[i])
  }

  addCar(){
    this.formCar.reset()
  }

  fillForm(data: Car){
    this.formCar.patchValue({
      brand: data.brand,
      model: data.model,
      year: data.year ,
      price: data.price,
      color: data.color,
      description: data.description,
      img: data.img,
      velocity: data.velocity
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
          this.detectorChanges.detectChanges();
        };
      });
  }

  changeAvatar(){
    document.getElementById('uploadImg')?.click();
  }
}

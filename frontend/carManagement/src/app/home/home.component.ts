import { Component, OnInit } from '@angular/core';
import { Car } from '../models/car.model';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cars: Car[] = [];

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.carService.getCars().subscribe((cars: Car[]) => {
      this.cars = cars;
    })
  }

}

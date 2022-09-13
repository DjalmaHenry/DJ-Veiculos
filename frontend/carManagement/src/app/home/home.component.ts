import { Component, OnInit } from '@angular/core';
import { Car } from '../models/car.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cars: Car[] = [
    { brand: 'Audi', model: 'A4', year: 2019, color: 'black', price: 10000, velocity: 200, id: 1, img: '../../assets/img/cars/audiA4.png' }, { brand: 'Meclaren', model: 'F1', year: 2019, color: 'black', price: 10000, velocity: 200, id: 2, img: '../../assets/img/cars/McLaren-P1.png' }, { brand: 'BMW', model: 'M5', year: 2019, color: 'black', price: 10000, velocity: 200, id: 3, img: '../../assets/img/cars/BMW-E39-M5.png' }, { brand: 'Mercedes', model: 'AMG', year: 2019, color: 'black', price: 10000, velocity: 200, id: 4, img: '../../assets/img/cars/mercedes-benz-amg.png' }, { brand: 'Lamborghini', model: 'Aventador', year: 2019, color: 'black', price: 10000, velocity: 200, id: 6, img: '../../assets/img/cars/Sports-Lamborghini-Aventado.png' }, { brand: 'Porsche', model: '911', year: 2019, color: 'black', price: 10000, velocity: 200, id: 7, img: '../../assets/img/cars/porshe.png' }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

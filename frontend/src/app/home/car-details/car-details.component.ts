import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {

  @Input() car: any;

  imgCarDefault: string = "../../assets/img/cars/car-default.jpg";

  constructor() { }

  ngOnInit(): void {
  }

}

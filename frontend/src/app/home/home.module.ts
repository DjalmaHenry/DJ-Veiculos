import { CommonModule } from '@angular/common';
import { Injectable, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './home.component';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CarDetailsComponent } from './car-details/car-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const maskConfig: Partial<IConfig> = {
  validation: false,
};
@Injectable({
  providedIn: 'root'
})

@NgModule({
  declarations: [HomeComponent, CarDetailsComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgxMaskModule.forRoot(maskConfig)
  ]
})
export class HomeModule { }

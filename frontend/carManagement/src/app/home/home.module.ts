import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './home.component';


@Injectable({
  providedIn: 'root'
})

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule
  ]
})
export class HomeModule { }

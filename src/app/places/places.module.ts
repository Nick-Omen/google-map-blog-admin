import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PlacesComponent } from './places.component';
import { RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PlacesComponent,
    DetailsComponent,
  ],
  exports: [
    PlacesComponent
  ]
})
export class PlacesModule { }

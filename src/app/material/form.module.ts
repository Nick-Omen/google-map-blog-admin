import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ]
})
export class MaterialFormModule {
}

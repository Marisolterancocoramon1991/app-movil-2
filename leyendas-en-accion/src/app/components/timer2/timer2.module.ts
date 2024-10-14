import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Timer2Component } from './timer.component';



@NgModule({
  declarations: [
    Timer2Component
  ],
  imports: [
    CommonModule
  ],
  exports: [Timer2Component]
})
export class Timer2Module { }
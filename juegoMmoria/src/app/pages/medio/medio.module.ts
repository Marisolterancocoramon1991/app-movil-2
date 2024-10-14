import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedioPageRoutingModule } from './medio-routing.module';

import { MedioPage } from './medio.page';
import { TimerComponent } from 'src/app/components/timer/timer.component';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedioPageRoutingModule,
    TimerModule
  ],
  declarations: [MedioPage]
})
export class MedioPageModule {}

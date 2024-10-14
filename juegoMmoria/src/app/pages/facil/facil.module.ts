import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacilPageRoutingModule } from './facil-routing.module';

import { FacilPage } from './facil.page';
import { TimerComponent } from 'src/app/components/timer/timer.component';
import { TimerModule } from 'src/app/components/timer/timer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacilPageRoutingModule,
    TimerModule
  ],
  declarations: [FacilPage]
})
export class FacilPageModule {}

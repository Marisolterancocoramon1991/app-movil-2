import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuegoPageRoutingModule } from './juego-routing.module';

import { TimerModule } from 'src/app/components/timer/timer.module';
import { Timer2Module } from 'src/app/components/timer2/timer2.module';
import { JuegoPage } from './juego.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegoPageRoutingModule,
    TimerModule,
    Timer2Module
  ],
  declarations: [JuegoPage]
})
export class JuegoPageModule {}

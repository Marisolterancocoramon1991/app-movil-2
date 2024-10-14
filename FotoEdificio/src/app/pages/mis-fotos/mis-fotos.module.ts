import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisFotosPageRoutingModule } from './mis-fotos-routing.module';

import { MisFotosPage } from './mis-fotos.page';
import { CosasFeasPageModule } from '../cosas-feas/cosas-feas.module';
import { CosasLindasPageModule } from '../cosas-lindas/cosas-lindas.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisFotosPageRoutingModule,
    CosasLindasPageModule,
    CosasFeasPageModule
  ],
  declarations: [MisFotosPage]
})
export class MisFotosPageModule {}

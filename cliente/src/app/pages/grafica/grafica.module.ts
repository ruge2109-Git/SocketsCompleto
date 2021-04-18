import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraficaRoutingModule } from './grafica-routing.module';
import { DatosComponent } from './datos/datos.component';
import { PrimeNgLibModule } from 'src/app/librerias/prime-ng-lib.module';
import { ComponentesModule } from 'src/app/librerias/componentes.module';
import { MapasComponent } from './mapas/mapas.component';


@NgModule({
  declarations: [DatosComponent, MapasComponent],
  imports: [
    CommonModule,
    GraficaRoutingModule,
    PrimeNgLibModule,
    ComponentesModule,
  ]
})
export class GraficaModule { }

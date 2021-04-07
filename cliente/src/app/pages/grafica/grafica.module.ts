import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraficaRoutingModule } from './grafica-routing.module';
import { DatosComponent } from './datos/datos.component';
import { PrimeNgLibModule } from 'src/app/librerias/prime-ng-lib.module';
import { ComponentesModule } from 'src/app/librerias/componentes.module';


@NgModule({
  declarations: [DatosComponent],
  imports: [
    CommonModule,
    GraficaRoutingModule,
    PrimeNgLibModule,
    ComponentesModule,
  ]
})
export class GraficaModule { }

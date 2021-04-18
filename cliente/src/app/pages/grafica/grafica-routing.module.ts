import { MapasComponent } from './mapas/mapas.component';
import { UsuarioGuardService } from './../../guards/UsuarioGuard';
import { DatosComponent } from './datos/datos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component:  DatosComponent,canActivate:[UsuarioGuardService]},
  { path: 'mapas', component:  MapasComponent,canActivate:[UsuarioGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraficaRoutingModule { }

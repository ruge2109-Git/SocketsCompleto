import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
  { path: 'usuarios', loadChildren: () => import('./pages/usuario/usuario.module').then(m => m.UsuarioModule) },
  { path: 'graficas', loadChildren: () => import('./pages/grafica/grafica.module').then(m => m.GraficaModule) },
  { path: '**', redirectTo: 'usuarios', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { UsuarioGuardService } from './../../guards/UsuarioGuard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatUsuariosComponent } from './chat-usuarios/chat-usuarios.component';
import { FormUsuarioComponent } from './form-usuario/form-usuario.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'chat', component: ChatUsuariosComponent , canActivate:[UsuarioGuardService]},
  { path: 'formulario/:id', component: FormUsuarioComponent,canActivate:[UsuarioGuardService] },
  { path: 'lista-usuarios', component: ListaUsuariosComponent,canActivate:[UsuarioGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }

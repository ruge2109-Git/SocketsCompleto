import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatUsuariosComponent } from './chat-usuarios/chat-usuarios.component';
import { FormUsuarioComponent } from './form-usuario/form-usuario.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'chat', component: ChatUsuariosComponent },
  { path: 'formulario/:id', component: FormUsuarioComponent },
  { path: 'lista-usuarios', component: ListaUsuariosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }

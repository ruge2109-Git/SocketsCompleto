import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgLibModule } from 'src/app/librerias/prime-ng-lib.module';
import { ComponentesModule } from 'src/app/librerias/componentes.module';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { LoginComponent } from './login/login.component';
import { ChatUsuariosComponent } from './chat-usuarios/chat-usuarios.component';
import { FormUsuarioComponent } from './form-usuario/form-usuario.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';


@NgModule({
  declarations: [
    LoginComponent,
    ChatUsuariosComponent,
    FormUsuarioComponent,
    ListaUsuariosComponent
  ],
  imports: [
    CommonModule,
    PrimeNgLibModule,
    ComponentesModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }

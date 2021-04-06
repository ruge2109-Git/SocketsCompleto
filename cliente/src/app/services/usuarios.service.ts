import { WebSocketService } from './web-socket.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioDTO } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(public wsSocket:WebSocketService,private router:Router) { }

  iniciarSesion(nomUsuario:string,clave:string){
    let payload = {
      nomUsuario,clave
    };
    return new Promise((resolve,reject)=>{
      this.wsSocket.emitir('iniciar-sesion',payload,(res)=>{
        resolve(res);
      })
    });
  }

  obtenerUsuarioActivos(){
    return this.wsSocket.escuchar("usuarios-activos");
  }

  usuarioActivosPrimeraVez(){
    return this.wsSocket.emitir("obtener-usuarios-activos")
  }


  cerrarSesion(){
    localStorage.clear();
    let payload = {
      nombres:''
    }
    this.wsSocket.emitir("actualizar-usuario-socket",payload, ()=>{});
    this.router.navigateByUrl("/");
  }

  crearUsuario(usuario:string){
    return new Promise((resolve,reject)=>{
      this.wsSocket.emitir("crear-usuario-bd",usuario,(res)=>{
        resolve(res);
      })
    })
  }

  modificarUsuarioBD(usuario:UsuarioDTO){
    return new Promise((resolve,reject)=>{
      this.wsSocket.emitir("modificar-usuario-bd",usuario,(res)=>{
        resolve(res);
      })
    })
  }

  llamarUsuariosBD(){
    return this.wsSocket.emitir("obtener-usuarios-bd");
  }

  obtenerUsuariosBD(){
    return this.wsSocket.escuchar("usuarios-bd");
  }

  obtenerUsuarioBDPorNomID(idUsuario:string){
    const payload = {
      idUsuario
    };
    return new Promise((resolve,reject)=>{
      this.wsSocket.emitir("obtener-usuario-bd-por-id",payload,(res)=>{
        resolve(res);
      })
    })
  }

  eliminarUsuarioPorID(usuario:UsuarioDTO){
    return new Promise((resolve,reject)=>{
      this.wsSocket.emitir("eliminar-usuario-bd",usuario,(res)=>{
        resolve(res);
      })
    })
  }


}

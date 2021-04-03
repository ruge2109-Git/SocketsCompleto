import { WebSocketService } from './web-socket.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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


}

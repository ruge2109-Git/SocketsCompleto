import { WebSocketService } from './web-socket.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private wsSocket:WebSocketService) { }

  iniciarSesion(nomUsuario:string,clave:string){
    this.wsSocket.checkStatus();
    let payload = {
      nomUsuario,clave
    };
    return new Promise((resolve,reject)=>{
      this.wsSocket.emitir('iniciar-sesion',payload,(res)=>{
        resolve(res);
      })
    });
  }
}

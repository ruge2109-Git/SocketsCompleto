import { WebSocketService } from './web-socket.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatPrivadoService {

  constructor(public wsSocket:WebSocketService) { }

  enviarMensaje(mensaje:string,nomUsuarioReceptor:string){
    let payload = {
      nomUsuario:this.wsSocket.obtenerUsuario().nomUsuario,
      nombres: this.wsSocket.obtenerUsuario().nombres,
      mensaje:mensaje,
      general:false,
      nomUsuarioReceptor:nomUsuarioReceptor,
      nomUsuarioEmisor:this.wsSocket.obtenerUsuario().nomUsuario
    };
    this.wsSocket.emitir('mensaje-privado',payload);
  }

  obtenerMensajesPrimeraVez(nomUsuarioReceptor:string){
    const payload = {
      nomUsuarioEmisor:this.wsSocket.obtenerUsuario().nomUsuario,
      nomUsuarioReceptor:nomUsuarioReceptor
    };
    return this.wsSocket.emitir("obtener-mensajes-privados-bd",payload)
  }

  obtenerMensajesCompletosPrimeraVez(){
    return this.wsSocket.escuchar("mensajes-privados");
  }

  obtenerMensajes(){
    return this.wsSocket.escuchar("mensaje-nuevo-privado");
  }
}

import { WebSocketService } from './web-socket.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatGeneralService {

  constructor(public wsSocket:WebSocketService) { }

  enviarMensaje(mensaje:string,general:boolean){
    let payload = {
      nomUsuario:this.wsSocket.obtenerUsuario().nomUsuario,
      mensaje:mensaje,
      general:general,
      nombres:this.wsSocket.obtenerUsuario().nombres
    };
    this.wsSocket.emitir('mensaje',payload);
  }

  obtenerMensajesPrimeraVez(){
    return this.wsSocket.emitir("obtener-mensajes-generales-bd")
  }

  obtenerMensajesCompletosPrimeraVez(){
    return this.wsSocket.escuchar("mensajes-generales");
  }

  obtenerMensajes(){
    return this.wsSocket.escuchar("mensaje-nuevo")
  }
}

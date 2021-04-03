import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { UsuarioDTO } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket: any;

  constructor() {
    this.iniciarSocket();
  }

  iniciarSocket() {
    this.socket = io(environment.URL_SERVER);
    this.checkStatus();
    this.actualizarUsuario();
  }

  checkStatus() {

    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
    });
  }

  emitir(evento: string, payload?: any, callback?: Function) {
    if (this.socket != null) {
      return this.socket.emit(evento, payload, callback);
    }
    return null;
  }

  escuchar(evento: string) {
    return new Observable((rta) => {
      this.socket.on(evento, (data) => {
        rta.next(data);
      })
    })
  }

  actualizarUsuario() {
    let sesion = localStorage.getItem("sesionUsuario");
    if (sesion != null) {
      sesion = atob(sesion);
      sesion = JSON.parse(sesion);
      this.emitir("actualizar-usuario-socket", sesion);
    }
  }

  obtenerUsuario(): UsuarioDTO {
    let usuario: UsuarioDTO;
    let sesion = localStorage.getItem("sesionUsuario");
    sesion = atob(sesion);
    usuario = JSON.parse(sesion);
    return usuario;
  }
}

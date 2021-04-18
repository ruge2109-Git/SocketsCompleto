import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { environment } from './../../environments/environment';
import { Lugar } from '../models/Mapa';

@Injectable({
  providedIn: 'root'
})
export class MapaService {
  private headers:HttpHeaders = new HttpHeaders()
  .set('Content-Type', 'application/x-www-form-urlencoded');

  constructor(public wsSocket:WebSocketService,private http:HttpClient) { }

  obtenerMarcadores(){
    return this.http.get(environment.URL_SERVER+"/mapa");
  }

  obtenerPosicion(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
      err => {
        resolve(null);
        console.log(err);

      });
    });
  }

  socketNuevoMarcador(marcador:Lugar){
    this.wsSocket.emitir("marcador-nuevo",marcador);
  }

  socketMoverMarcador(marcador:Lugar){
    this.wsSocket.emitir("mover-marcador",marcador);
  }

  socketEliminarMarcador(idMarcador:string){
    const payload = {
      idMarcador
    }
    this.wsSocket.emitir("eliminar-marcador",payload);
  }

  socketObtenerMarcadores(){
    return this.wsSocket.escuchar("marcador-nuevo");
  }

  socketEscuchaEliminarMarcador(){
    return this.wsSocket.escuchar("eliminar-marcador");
  }

  socketEscuchaMoverMarcador(){
    return this.wsSocket.escuchar("mover-marcador");
  }
}

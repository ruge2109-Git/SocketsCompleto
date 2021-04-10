import { WebSocketService } from './web-socket.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GraficaService {

  private headers:HttpHeaders = new HttpHeaders()
  .set('Content-Type', 'application/x-www-form-urlencoded');

  constructor(private wsSocket:WebSocketService,private http:HttpClient) { }

  obtenerData(){
    return this.http.get(environment.URL_SERVER+'/grafica');
  }

  obtenerDataSocket(){
    return this.wsSocket.escuchar("cambio-grafica");
  }

  sumarDataGrafica(mes:string,valor:number){

    const body = new HttpParams()
    .set('mes', mes)
    .set('valor', valor.toString());
    return this.http.post(environment.URL_SERVER+"/grafica",body.toString(),{headers:this.headers});
  }
}

import { Lugar } from './../../../models/Mapa';
import { MapaService } from './../../../services/mapa.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// declare var google: any;
import { google } from 'google-maps';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.scss']
})
export class MapasComponent implements OnInit {

  @ViewChild('boxMapa') boxMapa: ElementRef;
  public map: google.maps.Map;
  public marcadores:google.maps.Marker[] = [];
  public infoWindows:google.maps.InfoWindow[] = [];

  constructor(private mapaService: MapaService) { }

  ngOnInit(): void {
    this.cargarMapa();
  }

  cargarMapa() {
    this.mapaService.obtenerPosicion().then(pos => {
      const latlong = new google.maps.LatLng(pos.lat,pos.lng);
      const mapaOpciones: google.maps.MapOptions = {
        center:latlong,
        zoom:13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.boxMapa.nativeElement,mapaOpciones);
      const marcadorInicial = new Lugar();
      marcadorInicial.nombre = this.mapaService.wsSocket.obtenerUsuario().nombres;
      marcadorInicial.lat = pos.lat;
      marcadorInicial.lng = pos.lng;
      this.agregarMarcador(marcadorInicial);
    });
  }

  agregarMarcador(marcador:Lugar){
    const latlong = new google.maps.LatLng(marcador.lat,marcador.lng);
    const marker = new google.maps.Marker({
      map:this.map,
      animation:google.maps.Animation.DROP,
      position:latlong,
      draggable:true
    });
    this.marcadores.push(marker);
    this.seleccionarMarcador(marker,marcador);
    this.eliminarMarcador(marker);
    this.moverMarcador(marker,marcador);
  }

  eliminarMarcador(marker:google.maps.Marker){
    google.maps.event.addDomListener(marker,'dblclick',(coors:any)=>{
      marker.setMap(null);
    });
  }

  moverMarcador(marker:google.maps.Marker,marcador:Lugar){
    google.maps.event.addDomListener(marker,'drag',(coors:any)=>{
      const nuevoMarcador = {
        lat: coors.latLng.lat(),
        lng: coors.latLng.lng(),
        nombre: marcador.nombre
      };
    });
  }

  seleccionarMarcador(marker:google.maps.Marker,marcador:Lugar){
    const contenido = `<b>${marcador.nombre}</b>`;
    const infoWindow = new google.maps.InfoWindow({
      content: contenido
    });
    this.infoWindows.push(infoWindow);
    google.maps.event.addDomListener(marker,'click',()=>{
      this.infoWindows.forEach(element => {
        element.close();
      });
      infoWindow.open(this.map, marker)
    });
  }

}

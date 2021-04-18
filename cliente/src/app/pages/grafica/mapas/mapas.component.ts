import { Lugar } from './../../../models/Mapa';
import { MapaService } from './../../../services/mapa.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// declare var google: any;
import { google } from 'google-maps';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.scss']
})
export class MapasComponent implements OnInit {

  @ViewChild('boxMapa') boxMapa: ElementRef;
  public map: google.maps.Map;
  public marcadores: google.maps.Marker[] = [];
  public infoWindows: google.maps.InfoWindow[] = [];
  public listaLugares: Lugar[] = [];
  public posicionObtenida: boolean;
  public marcadorInicial:Lugar;

  constructor(private mapaService: MapaService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.escucharSockets();
    this.obtenerMarcadores();
  }


  cargarMapa() {
    const posi = new google.maps.LatLng(0,0);
    const mapaOpciones: google.maps.MapOptions = {
      center: posi,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.boxMapa.nativeElement,mapaOpciones);
    // this.agregarMarcadorDinamico();

    this.listaLugares.forEach(element => {
      this.agregarMarcador(element,false);
    });

  }

  obtenerMarcadores(){
    this.mapaService.obtenerMarcadores().subscribe(
      (data:any)=>{
        this.listaLugares = data;
        this.cargarMapa();
      }
    )
  }

  obtenerPosicionInicial() {
    this.mapaService.obtenerPosicion().then(pos => {
      if (pos != null) {
        this.posicionObtenida = true;
        const marcadorInicial = new Lugar();
        marcadorInicial.nombre = this.mapaService.wsSocket.obtenerUsuario().nombres;
        marcadorInicial.lat = pos.lat;
        marcadorInicial.lng = pos.lng;
        marcadorInicial.id = this.mapaService.wsSocket.obtenerUsuario()._id;
        this.agregarMarcador(marcadorInicial,true);
        this.marcadorInicial = marcadorInicial;
      }
      else {
        this.toastr.error("Ha ocurrido un error al cargar la ubicación", 'Correcto');
      }
    });
  }

  agregarMarcador(marcador: Lugar,emitirSocket:boolean) {
    const latlong = new google.maps.LatLng(marcador.lat, marcador.lng);
    this.map.setCenter(latlong);
    const marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latlong,
      draggable: true,
      title: marcador.id
    });
    this.marcadores.push(marker);
    this.seleccionarMarcador(marker, marcador);
    this.eliminarMarcador(marker,marcador);
    this.moverMarcador(marker, marcador);

    if (emitirSocket) {
      this.mapaService.socketNuevoMarcador(marcador);
    }
  }

  eliminarMarcador(marker: google.maps.Marker, marcador:Lugar) {
    google.maps.event.addDomListener(marker, 'dblclick', (coors: any) => {
      marker.setMap(null);
      this.mapaService.socketEliminarMarcador(marcador.id);
    });
  }

  moverMarcador(marker: google.maps.Marker, marcador: Lugar) {
    google.maps.event.addDomListener(marker, 'drag', (coors: any) => {
      const nuevoMarcador = {
        lat: coors.latLng.lat(),
        lng: coors.latLng.lng(),
        nombre: marcador.nombre,
        id:marcador.id
      };

      this.mapaService.socketMoverMarcador(nuevoMarcador);
    });
  }

  seleccionarMarcador(marker: google.maps.Marker, marcador: Lugar) {
    const contenido = `<b>${marcador.nombre}</b>`;
    const infoWindow = new google.maps.InfoWindow({
      content: contenido
    });
    this.infoWindows.push(infoWindow);
    google.maps.event.addDomListener(marker, 'click', () => {
      this.infoWindows.forEach(element => {
        element.close();
      });
      infoWindow.open(this.map, marker)
    });
  }

  agregarMarcadorDinamico() {
    this.map.addListener('click', (coors) => {
      const nuevoMarcador = {
        nombre: 'Nuevo marcador',
        lat: coors.latLng.lat(),
        lng: coors.latLng.lng(),
        id: new Date().toISOString()
      };
      this.agregarMarcador(nuevoMarcador,true);
    })

  }

  escucharSockets() {
    //Marcador nuevo
    this.mapaService.socketObtenerMarcadores().subscribe((marcador:Lugar)=>{
      this.agregarMarcador(marcador,false);
    })
    //Marcador borrado
    this.mapaService.socketEscuchaEliminarMarcador().subscribe((marcador:any)=>{

      if (marcador.idMarcador === this.marcadorInicial.id) {
        this.posicionObtenida = false;
      }
      this.marcadores.forEach(element => {
        if (element.getTitle() === marcador.idMarcador) {
          element.setMap(null)
        }
      });

    })

    //Mover marcador
    this.mapaService.socketEscuchaMoverMarcador().subscribe((marcador:Lugar)=>{
      this.marcadores.forEach(element => {
        if (element.getTitle() === marcador.id) {
          const latlong = new google.maps.LatLng(marcador.lat, marcador.lng);
          element.setPosition(latlong);
        }
      });
    })

  }

}

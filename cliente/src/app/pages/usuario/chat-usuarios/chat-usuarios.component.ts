import { ChatGeneralService } from './../../../services/chat-general.service';
import { UsuariosService } from './../../../services/usuarios.service';
import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioDTO } from 'src/app/models/Usuario';

@Component({
  selector: 'app-chat-usuarios',
  templateUrl: './chat-usuarios.component.html',
  styleUrls: ['./chat-usuarios.component.scss']
})
export class ChatUsuariosComponent implements OnInit, OnDestroy {

  public usuariosActivosObs: Observable<any>;
  public mensaje: string = "";
  public mensajes: any[] = [];
  public mensajesSub: Subscription;
  public mensajesSubPrimeraVez: Subscription;
  public element: Element;

  constructor(public usuarioSocket: UsuariosService,public chatGeneralService:ChatGeneralService) { }

  ngOnInit(): void {
    this.element = document.getElementById("chat-mensajes");
    this.obtenerUsuariosActivos();
    this.obtenerMensajes();

  }

  ngOnDestroy(): void {
    if (this.mensajesSub != null) { this.mensajesSub.unsubscribe(); }
  }

  obtenerUsuariosActivos() {
    this.usuarioSocket.usuarioActivosPrimeraVez();
    this.usuariosActivosObs = this.usuarioSocket.obtenerUsuarioActivos();
  }

  obtenerMensajes() {
    this.chatGeneralService.obtenerMensajesPrimeraVez();
    this.mensajesSubPrimeraVez = this.chatGeneralService.obtenerMensajesCompletosPrimeraVez().subscribe(
      (data:any) => {
        if (data!=null) {
          data.forEach(msm => {
            this.mensajes.push(msm);

          });
        }
        console.log(this.mensajes);

        setTimeout(() => {
          this.element.scrollTop = this.element.scrollHeight;
        }, 50);
      }
    )

    this.mensajesSub = this.chatGeneralService.obtenerMensajes().subscribe(
      (data) => {
        this.mensajes.push(data);
        setTimeout(() => {
          this.element.scrollTop = this.element.scrollHeight;
        }, 50);
      }
    )
  }

  enviarMensaje() {
    if (this.mensaje.trim().length === 0) {
      return;
    }

    this.chatGeneralService.enviarMensaje(this.mensaje, true);
    this.mensaje = "";
  }

  mensajeDesdeSesion(nomUsuario: string) {
    let usuario: UsuarioDTO;
    usuario = JSON.parse(atob(localStorage.getItem("sesionUsuario")));
    if (nomUsuario === usuario.nomUsuario) {
      return true;
    }
    return false;
  }

}

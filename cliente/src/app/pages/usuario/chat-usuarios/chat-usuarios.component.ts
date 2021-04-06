import { ChatPrivadoService } from './../../../services/chat-privado.service';
import { ChatGeneralDTO } from './../../../models/ChatGeneral';
import { ChatPrivadoDTO } from './../../../models/ChatPrivado';
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
  public mensajes: ChatGeneralDTO[] = [];
  public mensajesSub: Subscription;
  public mensajesSubPrimeraVez: Subscription;
  public element: Element;
  public usuario: UsuarioDTO;
  public chatPrivado: boolean;

  constructor(public usuarioSocket: UsuariosService, private chatGeneralService: ChatGeneralService, private chatPrivadoService: ChatPrivadoService) { }

  ngOnInit(): void {
    this.element = document.getElementById("chat-mensajes");
    this.obtenerUsuariosActivos();
    this.obtenerMensajes();
    this.usuario = new UsuarioDTO();
  }

  ngOnDestroy(): void {
    if (this.mensajesSub != null) { this.mensajesSub.unsubscribe(); }
  }

  obtenerUsuariosActivos() {
    this.usuarioSocket.usuarioActivosPrimeraVez();
    this.usuariosActivosObs = this.usuarioSocket.obtenerUsuarioActivos();
  }

  obtenerMensajes() {
    this.mensajes = [];
    this.chatPrivado = false;
    this.usuario = new UsuarioDTO();
    this.chatGeneralService.obtenerMensajesPrimeraVez();
    this.mensajesSubPrimeraVez = this.chatGeneralService.obtenerMensajesCompletosPrimeraVez().subscribe(
      (data: ChatGeneralDTO[]) => {
        if (data != null) {
          this.mensajes = data;
        }
        setTimeout(() => {
          if (this.element != null) {
            this.element.scrollTop = this.element.scrollHeight;
          }
        }, 50);
      }
    )

    this.mensajesSub = this.chatGeneralService.obtenerMensajes().subscribe(
      (data: ChatGeneralDTO) => {
        this.mensajes.forEach(mensaje => {
          if (data._id === mensaje._id) {
            data.yaExiste = true;
          }
        });
        if (!data.yaExiste && !this.chatPrivado) {
          this.mensajes.push(data);
        }
        setTimeout(() => {
          if (this.element != null) {
            this.element.scrollTop = this.element.scrollHeight;
          }
        }, 50);
        console.log(this.mensajes);
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

  seleccionarUsuario(usuarioS: UsuarioDTO) {
    if (usuarioS.nomUsuario != this.usuarioSocket.wsSocket.obtenerUsuario().nomUsuario) {
      this.usuario = usuarioS;
      this.chatPrivado = true;
      this.mensajes = [];
      this.obtenerMensajesPrivados();
    }
  }

  //Mensajes privados
  enviarMensajePrivado() {
    if (this.mensaje.trim().length === 0) {
      return;
    }

    this.chatPrivadoService.enviarMensaje(this.mensaje, this.usuario.nomUsuario);
    this.mensaje = "";
  }

  obtenerMensajesPrivados() {
    this.mensajes = [];
    this.chatPrivadoService.obtenerMensajesPrimeraVez(this.usuario.nomUsuario);
    this.mensajesSubPrimeraVez = this.chatPrivadoService.obtenerMensajesCompletosPrimeraVez().subscribe(
      (data: ChatPrivadoDTO[]) => {
        if (data != null) {
          data.forEach(msm => {
            this.mensajes.forEach(mensaje => {
              if (msm._id === mensaje._id) {
                msm.yaExiste = true;
              }
            });

            let condicion1 = msm.nomUsuarioEmisor == this.usuario.nomUsuario || msm.nomUsuarioEmisor == this.usuarioSocket.wsSocket.obtenerUsuario().nomUsuario;
            let condicion2 = msm.nomUsuarioReceptor == this.usuario.nomUsuario || msm.nomUsuarioReceptor == this.usuarioSocket.wsSocket.obtenerUsuario().nomUsuario;
            let condicion3 = msm.nomUsuario == this.usuario.nomUsuario || msm.nomUsuario == this.usuarioSocket.wsSocket.obtenerUsuario().nomUsuario;


            if (!msm.yaExiste && condicion1 && condicion2 && condicion3 && this.chatPrivado) {
              this.mensajes.push(msm);
            }

          });
        }
        setTimeout(() => {
          if (this.element != null) {
            this.element.scrollTop = this.element.scrollHeight;
          }
        }, 50);
      }
    )

    this.mensajesSub = this.chatPrivadoService.obtenerMensajes().subscribe(
      (data: ChatGeneralDTO) => {
        this.mensajes.forEach(mensaje => {
          if (data._id === mensaje._id) {
            data.yaExiste = true;
          }
        });
        if (!data.yaExiste && this.chatPrivado) {
          this.mensajes.push(data);
        }
        setTimeout(() => {
          if (this.element != null) {
            this.element.scrollTop = this.element.scrollHeight;
          }
        }, 50);
      }
    )
  }

}


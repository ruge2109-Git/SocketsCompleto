import { RespuestaSocket } from './../../../models/RespuestaSocket';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UsuariosService } from './../../../services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public frmDatos: FormGroup;
  public spinner:boolean;
  // public subLogin: Subscription;

  constructor(private router: Router, public usuarioSerice: UsuariosService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.frmDatos = this.newFormGroup();
    localStorage.clear();
    this.usuarioSerice.cerrarSesion();
  }

  ngOnDestroy(): void {
    // if (!this.subLogin) { this.subLogin.unsubscribe() }
  }

  iniciarSesion() {
    this.spinner = true;
    let usuario = this.obtenerPropiedadFormGroup("usuario").value;
    let clave = this.obtenerPropiedadFormGroup("clave").value;
    this.usuarioSerice.iniciarSesion(usuario,clave).then((data:RespuestaSocket)=>{
      this.spinner = false;
      if (data.flag) {
        localStorage.setItem("sesionUsuario",btoa(JSON.stringify(data.listUsuario)));
        this.usuarioSerice.wsSocket.actualizarUsuario();
        this.router.navigateByUrl('/usuarios/chat');
      }
      else{
        this.messageService.add({key: 'tc',severity:'error', summary: 'Error', detail: data.msg});
      }
    },
    (error)=>{
      this.spinner = false;
      console.log(error);
    })
  }

  newFormGroup() {
    return new FormGroup({
      usuario: new FormControl("", [Validators.required]),
      clave: new FormControl("", [Validators.required])
    });
  }

  condicionInvalid(xPropiedad) {
    if (this.obtenerPropiedadFormGroup(xPropiedad).invalid && (this.obtenerPropiedadFormGroup(xPropiedad).dirty || this.obtenerPropiedadFormGroup(xPropiedad).touched)) {
      return true;
    }
    return false;
  }

  obtenerPropiedadFormGroup(xPropiedad) {
    return this.frmDatos.get(xPropiedad)
  }

}

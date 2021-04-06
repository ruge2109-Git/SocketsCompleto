import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioDTO } from 'src/app/models/Usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ToastrService } from 'ngx-toastr';
import { RespuestaSocket } from 'src/app/models/RespuestaSocket';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.scss']
})
export class FormUsuarioComponent implements OnInit {

  public frmDatos: FormGroup;
  public usuario: UsuarioDTO;
  public nomUsuario: string;
  public spiner: boolean;

  constructor(private route: ActivatedRoute, private usuarioSer: UsuariosService, private toastr: ToastrService, private router: Router) {
    this.nomUsuario = route.snapshot.params.id;
    if (this.nomUsuario != "0") {
      this.obtenerInformacionUsuario();
    }
  }

  ngOnInit(): void {
    this.usuario = new UsuarioDTO();
    this.usuario.nombres = "";
    this.usuario.email = "";
    this.usuario.telefono = "";
    this.usuario.nomUsuario = "";
    this.usuario.clave = "";
    this.frmDatos = this.newFormGroup();
  }

  guardarInformacion() {

    if (this.nomUsuario!="0") {
      this.spiner = true;
      this.usuarioSer.modificarUsuarioBD(this.parsearUsuario()).then((res: RespuestaSocket) => {
        console.log(res);
        this.spiner = false;
        if (res.flag) {
          this.toastr.success(res.msg, 'Correcto');
          this.router.navigateByUrl('usuarios/lista-usuarios')
        }
        else {
          this.toastr.error(res.msg, 'Error');
        }
      })
    }
    else{
      this.spiner = true;
      this.usuarioSer.crearUsuario(this.frmDatos.value).then((res: RespuestaSocket) => {
        this.spiner = false;
        if (res.flag) {
          this.toastr.success(res.msg, 'Correcto');
          this.router.navigateByUrl('usuarios/lista-usuarios')
        }
        else {
          this.toastr.error(res.msg, 'Error');
        }
      })
    }

    // console.log(this.frmDatos.value);
  }

  obtenerInformacionUsuario() {
    this.spiner = true;
    this.usuarioSer.obtenerUsuarioBDPorNomID(this.nomUsuario).then((data: RespuestaSocket) => {
      if (data.flag) {
        this.usuario = data.listUsuario;
        this.frmDatos = this.newFormGroup();
      }
      else {
        this.toastr.error(data.msg, 'Error');
      }
      this.spiner = false;
    })
  }

  newFormGroup() {
    return new FormGroup({
      nombres: new FormControl(this.usuario.nombres, [Validators.required]),
      email: new FormControl(this.usuario.email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      telefono: new FormControl(this.usuario.telefono, [Validators.required]),
      nomUsuario: new FormControl(this.usuario.nomUsuario, [Validators.required]),
      clave: new FormControl(this.usuario.clave, [Validators.required])
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

  parsearUsuario(){
    this.usuario.nombres = this.obtenerPropiedadFormGroup("nombres").value;
    this.usuario.email = this.obtenerPropiedadFormGroup("email").value;
    this.usuario.telefono = this.obtenerPropiedadFormGroup("telefono").value;
    this.usuario.nomUsuario = this.obtenerPropiedadFormGroup("nomUsuario").value;
    this.usuario.clave = this.obtenerPropiedadFormGroup("clave").value;
    return this.usuario;
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.scss']
})
export class FormUsuarioComponent implements OnInit {

  public frmDatos:FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.frmDatos = this.newFormGroup();
  }

  guardarInformacion(){
    console.log(this.frmDatos.value);

  }

  newFormGroup() {
    return new FormGroup({
      nombres: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      telefono: new FormControl("", [Validators.required]),
      nomUsuario: new FormControl("", [Validators.required]),
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

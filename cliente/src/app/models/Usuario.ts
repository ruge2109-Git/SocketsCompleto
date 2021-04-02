export class UsuarioDTO {
  idSocket?: string;
  codUsuario: number;
  nombres:string;
  nomUsuario: string;
  contrasenia:string;
  email: string;
  telefono: string;
  seleccionado?:boolean = false;
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuardService implements CanActivate{

  constructor(private router:Router) { }

  canActivate(){
    let sesion = localStorage.getItem('sesionUsuario');
    if (sesion!=null) {
      return true;
    }
    this.router.navigate(['/usuarios']);
    return false;
  }

}

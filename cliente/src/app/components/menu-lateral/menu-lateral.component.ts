import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UsuariosService } from 'src/app/services/usuarios.service';
@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {

  public display: boolean;
  public items: MenuItem[];

  constructor(private usuarioSocet:UsuariosService) { }

  ngOnInit(): void {
    this.inicializarMenu();
  }

  inicializarMenu() {
    this.items = [
      {
        label: 'Usuarios',
        icon: 'pi pi-pw pi-users',
        items: [
          { label: 'Lista de usuarios', icon: 'pi pi-fw pi-list', routerLink: '/usuarios/lista-usuarios' },
          { label: 'Chat', icon: 'pi pi-fw pi-comments', routerLink: '/usuarios/chat' }
        ]
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-fw pi-sign-out',
        command: (event) => {
          this.usuarioSocet.cerrarSesion();
        }
      }
    ];
}

}

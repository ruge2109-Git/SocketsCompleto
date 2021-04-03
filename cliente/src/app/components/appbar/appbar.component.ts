import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss']
})
export class AppbarComponent implements OnInit {

  public mostrarMenu:boolean= false;

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem("sesionUsuario")!=null) {
      this.mostrarMenu = true;
    }
  }

}

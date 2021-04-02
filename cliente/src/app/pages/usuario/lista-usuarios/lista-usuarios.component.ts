import { Component, OnInit } from '@angular/core';
import { UsuarioDTO } from './../../../models/Usuario';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  public listUsuario: UsuarioDTO[] = [];
  public usuariosSeleccionados: UsuarioDTO[];
  public columnas: any[];
  public exportarColumnasTabla: any[];

  constructor() { }

  ngOnInit(): void {
    this.inicializarListaUsuarios();
    this.inicializarColumnas();
  }

  inicializarListaUsuarios() {
    for (let i = 0; i < 100; i++) {
      this.listUsuario.push({ codUsuario: i, nombres: `Jonathan Ruge ${i}`, nomUsuario: `Ruge210${i}`, email: `email${i}@gmail.com`, idSocket: `Socket${i}`, telefono: `304533${i}`, contrasenia: `hola${i}` })
    }
  }

  eliminarUsuario(usuario: UsuarioDTO) {

  }

  inicializarColumnas() {
    this.columnas = [
      { field: 'nombres', header: 'Nombres' },
      { field: 'email', header: 'Email' },
      { field: 'telefono', header: 'Teléfono' },
      { field: 'nomUsuario', header: 'Nombre de usuario' }
    ];

    this.exportarColumnasTabla = this.columnas.map(col => ({ title: col.header, dataKey: col.field }));
  }

  eliminarUsuariosSeleccionados() {
    console.log(this.usuariosSeleccionados);
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      let dataExportar = [];
      this.listUsuario.forEach(usuario => {
        dataExportar.push({
          nombres:usuario.nombres,
          email:usuario.email,
          usuario:usuario.nomUsuario,
          telefono:usuario.telefono,
        })
      });

      const worksheet = xlsx.utils.json_to_sheet(dataExportar);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Usuarios");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }


}

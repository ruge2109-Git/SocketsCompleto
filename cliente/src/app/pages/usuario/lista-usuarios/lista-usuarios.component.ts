import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { RespuestaSocket } from 'src/app/models/RespuestaSocket';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsuarioDTO } from './../../../models/Usuario';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit, OnDestroy {

  public listUsuario: UsuarioDTO[] = [];
  public usuariosSeleccionados: UsuarioDTO[];
  public columnas: any[];
  public exportarColumnasTabla: any[];
  public usuariosBDObs: Subscription;
  public spinner: boolean;

  constructor(private usuarioService: UsuariosService, private toastr: ToastrService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.inicializarColumnas();
    this.obtenerUsuarios();
  }


  ngOnDestroy(): void {
    if (this.usuariosBDObs != null) { this.usuariosBDObs.unsubscribe() };
  }

  eliminarUsuario(usuario: UsuarioDTO) {
    this.confirmationService.confirm({
      target: event.target,
      message: `¿Está seguro de querer eliminar el usuario ${usuario.nomUsuario}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.spinner = true;
        this.usuarioService.eliminarUsuarioPorID(usuario).then((data: RespuestaSocket) => {
          this.spinner = false;
          if (data.flag) {
            this.toastr.success(data.msg, 'Correcto');
          }
          else {
            this.toastr.error(data.msg, 'Error');
          }
        })
      },
      reject: () => {
        this.toastr.error("NO", 'Error');
      }
    });

  }

  obtenerUsuarios() {
    this.spinner = true;
    this.usuarioService.llamarUsuariosBD();
    this.usuariosBDObs = this.usuarioService.obtenerUsuariosBD().subscribe((data: UsuarioDTO[]) => {
      this.spinner = false;
      this.listUsuario = data;
    })
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
          nombres: usuario.nombres,
          email: usuario.email,
          usuario: usuario.nomUsuario,
          telefono: usuario.telefono,
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

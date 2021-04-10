import { GraficaService } from './../../../services/grafica.service';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss']
})
export class DatosComponent implements OnInit {

  public frmDatos: FormGroup;
  public dataGrafica:any[] = [{mes:"Seleccione"},{mes:"enero"},{mes:"febrero"},{mes:"marzo"},{mes:"abril"}];

  public lineChartData: ChartDataSets[] = [
    { data: [0,0,0,0], label: 'Ventas' }
  ];
  public lineChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril'];

  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };

  constructor(private graficaService:GraficaService) { }

  ngOnInit(): void {
    this.obtenerData();
    this.frmDatos = this.newFormGroup();
  }

  obtenerData(){
    this.graficaService.obtenerData().subscribe((data:any) => {
      this.lineChartData = data;
      this.obtenerDataSocket();
    })
  }

  obtenerDataSocket(){
    this.graficaService.obtenerDataSocket().subscribe((data:any)=>{
      this.lineChartData = data;
    })
  }

  newFormGroup() {
    return new FormGroup({
      mes: new FormControl("", [Validators.required]),
      valor: new FormControl("", [Validators.required, Validators.min(1)])
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

  sumarGrafica(){
    this.graficaService.sumarDataGrafica(this.obtenerPropiedadFormGroup("mes").value.mes,this.obtenerPropiedadFormGroup("valor").value).subscribe((data:any)=>{
      console.log(data);
    })
  }

}

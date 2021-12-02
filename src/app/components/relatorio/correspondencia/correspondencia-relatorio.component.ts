import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CorrespondenciaService} from "../../../services/correspodencia/correspondencia.service";
import {EstatistiticaCorrespondenciaTipo} from "../../../interfaces/relatorio/relatorio.interface";
import {LegendPosition} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-correspondencia-relatorio',
  templateUrl: './correspondencia-relatorio.component.html',
  styleUrls: ['./correspondencia-relatorio.component.css']
})
export class CorrespondenciaRelatorioComponent implements OnInit {

  formRelatorio: FormGroup;
  dadosPorData: EstatistiticaCorrespondenciaTipo[] = [];

  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Datas';
  yAxisLabel: string = 'Quantidade';
  timeline: boolean = false;
  position = LegendPosition.Below;

  constructor(
    private formBuilder: FormBuilder,
    private service: CorrespondenciaService) {
    this.formRelatorio = this.formBuilder.group({
      inicio: [''],
      fim: ['']
    })
  }

  ngOnInit(): void {
    this.service.relatorioData(undefined, undefined).subscribe(
      (res) => {
        this.dadosPorData = res.data;
      }, error => {
        console.error(error)
      }
    )
  }

  gerar() {
    const inicio = new Date(this.formRelatorio.controls.inicio.value);
    const termino = new Date(this.formRelatorio.controls.fim.value);

    this.service.relatorioData(inicio, termino).subscribe(
      (res) => {
        this.dadosPorData = res.data;
      }, error => {
        console.error(error)
      }
    )
  }

  limpar() {
    this.formRelatorio.controls.inicio.setValue('');
    this.formRelatorio.controls.fim.setValue('');
    this.ngOnInit();
  }

}

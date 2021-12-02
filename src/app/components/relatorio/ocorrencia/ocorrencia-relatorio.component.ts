import {Component, OnInit} from '@angular/core';
import {EstatisticaOcorrencia} from "../../../interfaces/relatorio/relatorio.interface";
import {OcorrenciaService} from "../../../services/ocorrencia/ocorrencia.service";
import {LegendPosition} from "@swimlane/ngx-charts";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-ocorrencia-relatorio',
  templateUrl: './ocorrencia-relatorio.component.html',
  styleUrls: ['./ocorrencia-relatorio.component.css']
})
export class OcorrenciaRelatorioComponent implements OnInit {

  dadosPorTipo: EstatisticaOcorrencia[] = [];
  dadosPorSituacao: EstatisticaOcorrencia[] = [];

  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  positionLegend = LegendPosition.Below

  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Situação';
  showYAxisLabel = true;
  yAxisLabel = 'Quantidade';
  formRelatorio: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: OcorrenciaService) {
    this.formRelatorio = this.formBuilder.group({
      inicio: [''],
      fim: ['']
    })
  }

  ngOnInit(): void {
    this.service.relatorioTipo(undefined, undefined).subscribe(
      (res) => {
        this.dadosPorTipo = res.data;
      }, error => {
        console.error(error)
      }
    )

    this.service.relatorioSituacao(undefined, undefined).subscribe(
      (res) => {
        this.dadosPorSituacao = res.data;
      }, error => {
        console.error(error);
      }
    )
  }

  gerar() {
    const inicio = new Date(this.formRelatorio.controls.inicio.value);
    const termino = new Date(this.formRelatorio.controls.fim.value);

    this.service.relatorioTipo(inicio, termino).subscribe(
      (res) => {
        this.dadosPorTipo = res.data;
      }, error => {
        console.error(error)
      }
    )

    this.service.relatorioSituacao(inicio, termino).subscribe(
      (res) => {
        this.dadosPorSituacao = res.data;
      }, error => {
        console.error(error);
      }
    )
  }

  limpar() {
    this.formRelatorio.controls.inicio.setValue('');
    this.formRelatorio.controls.fim.setValue('');
    this.ngOnInit();
  }
}

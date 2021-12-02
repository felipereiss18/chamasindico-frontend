import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AgendaService} from "../../../services/agenda/agenda.service";
import {EstatisticaAgendamento} from "../../../interfaces/relatorio/relatorio.interface";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";
import {UserService} from "../../../core/auth/user/user.service";
import {BasicComponent} from "../../../shared/basic-component/basic-component";

@Component({
  selector: 'app-agendamento-relatorio',
  templateUrl: './agendamento-relatorio.component.html',
  styleUrls: ['./agendamento-relatorio.component.css']
})
export class AgendamentoRelatorioComponent extends BasicComponent implements OnInit {

  dadosPorAreaComum: EstatisticaAgendamento[] = [];

  gradient: boolean = false;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Área Comum';
  showYAxisLabel = true;
  yAxisLabel = 'Agendamentos';
  formRelatorio: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: AgendaService,
    snipperService: NgxSpinnerService,
    snotifyService: SnotifyService,
    userService: UserService,
    ) {
    super(snipperService, snotifyService, userService);
    this.formRelatorio = this.formBuilder.group({
      inicio: [''],
      fim: ['']
    })
  }

  ngOnInit(): void {
    this.service.relatorioAreaComum(undefined, undefined).subscribe(
      (res) => {
        this.dadosPorAreaComum = res.data;
        if(res.data && res.data.length === 0) {
          this.messageInfo("Não foram encontrados dados para exebição.");
        }
      }, error => {
        console.error(error)
      }
    )
  }

  gerar() {
    const inicio = new Date(this.formRelatorio.controls.inicio.value);
    const termino = new Date(this.formRelatorio.controls.fim.value);

    this.service.relatorioAreaComum(inicio, termino).subscribe(
      (res) => {
        this.dadosPorAreaComum = res.data;
        if(res.data && res.data.length === 0) {
          this.messageInfo("Não foram encontrados dados para exebição.");
        }
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

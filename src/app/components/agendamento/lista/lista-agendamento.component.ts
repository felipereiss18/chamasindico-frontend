import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BasicComponent} from "../../../shared/basic-component/basic-component";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../core/auth/user/user.service";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";
import {MatTableDataSource} from "@angular/material/table";
import {AgendaService} from "../../../services/agenda/agenda.service";
import {AgendaPesquisa} from "../../../interfaces/pesquisa/agenda-pesquisa";
import {MatDialog} from "@angular/material/dialog";
import {FormularioAgendamentoComponent} from "../formulario/formulario-agendamento.component";
import {FormularioAgendamentoModel} from "../formulario/model/formulario-agendamento.model";
import {ConfirmationDialogModel} from "../../../shared/component/confirm-dialog/model/confirmation-dialog.model";
import {ConfirmDialogComponent} from "../../../shared/component/confirm-dialog/confirm-dialog.component";
import {faEdit} from "@fortawesome/free-solid-svg-icons"
import {Roles} from "../../../core/auth/user/roles.enum";

@Component({
  selector: 'app-formulario-agendamento',
  templateUrl: './lista-agendamento.component.html',
  styleUrls: ['./lista-agendamento.component.css']
})
export class ListaAgendamentoComponent extends BasicComponent implements OnInit {
  formAgendamento: FormGroup;
  displayColumns: string[] = ['bloco', 'unidade', 'areaComum', 'inicio', 'termino', 'confirmado', 'acoes']
  agendamentos: MatTableDataSource<AgendaPesquisa> = new MatTableDataSource<AgendaPesquisa>();
  dataMinima: Date = new Date();
  dataSelecionada: Date | undefined;
  faEdit = faEdit;
  roles = Roles;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly activeRoute: ActivatedRoute,
    private service: AgendaService,
    userService: UserService,
    spinnerService: NgxSpinnerService,
    snotifyService: SnotifyService,
    private dialog: MatDialog,
  ) {
    super(spinnerService, snotifyService, userService);

    this.formAgendamento = this.formBuilder.group({});
  }

  ngOnInit(): void {
  }

  buscarAgendamentos(data: Date) {
    const d = new Date(data)
    this.dataSelecionada = d
    this.service.buscarPorData(d).subscribe(
      (res) => {
        if(res.data && res.data.length > 0) {
          this.agendamentos.data = res.data;
        }else {
          this.agendamentos.data = [];
          this.messageInfo('Não foi encontrado nenhum agendamento para a data.')
        }
      }, error => {
        console.error(error);
        this.messageError('Erro ao buscar os agendamentos para a data.')
      }
    )
  }

  excluir(agendamento: AgendaPesquisa) {
    const dialogData =
      new ConfirmationDialogModel(
        'Confirmação',
        `Tem certeza em excluir o agendamento da data ${this.formatarData(agendamento.data)}?`);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '250px',
      closeOnNavigation: true,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        this.service.delete(agendamento.id).subscribe(
          res => {
            this.messageSucess(`Agendamento excluído com sucesso.`);
            if (this.dataSelecionada) {
              this.buscarAgendamentos(this.dataSelecionada);
            }
          }, error => {
            console.error(error);
            this.messageError('Erro ao excluir o agendamento.');
          }
        );
      }
    })
  }

  private formatarData(date: Date): string {
    const d = new Date(date)
    return d.toLocaleString().substring(0, d.toLocaleString().length-3);
  }

  criarAgendamento() {

    const dado = new FormularioAgendamentoModel();
    dado.visualizar = false;
    dado.title = 'Cadastrar';
    dado.data = this.dataSelecionada;

    const matDialogRef = this.dialog.open(FormularioAgendamentoComponent, {
      width: '850',
      closeOnNavigation: true,
      data: dado
    });

    matDialogRef.afterClosed().subscribe(
      (res) => {
        if (res) {
          if(this.dataSelecionada) {
            this.buscarAgendamentos(this.dataSelecionada)
          }
        }
      }
    );
  }

  formatarHora(hora: string): string {
    return hora.substring(0, hora.length-3);
  }

  editar(agendamento: AgendaPesquisa) {

    const dado = new FormularioAgendamentoModel();
    dado.visualizar = false;
    dado.title = 'Alterar';
    dado.id = agendamento.id;

    const matDialogRef = this.dialog.open(FormularioAgendamentoComponent, {
      width: '850',
      closeOnNavigation: true,
      data: dado
    })

    matDialogRef.afterClosed().subscribe(
      (res) => {
        if (res) {
          if(this.dataSelecionada) {
            this.buscarAgendamentos(this.dataSelecionada)
          }
        }
      }
    );
  }
}

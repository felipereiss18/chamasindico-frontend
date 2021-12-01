import { Component, OnInit } from '@angular/core';
import {AgendaPesquisa} from "../../../interfaces/pesquisa/agenda-pesquisa";
import {AgendaService} from "../../../services/agenda/agenda.service";
import {ConfirmationDialogModel} from "../../../shared/component/confirm-dialog/model/confirmation-dialog.model";
import {ConfirmDialogComponent} from "../../../shared/component/confirm-dialog/confirm-dialog.component";
import {UserService} from "../../../core/auth/user/user.service";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";
import {MatDialog} from "@angular/material/dialog";
import {BasicComponent} from "../../../shared/basic-component/basic-component";

@Component({
  selector: 'app-pendente-confirmacao-agendamento',
  templateUrl: './pendente-confirmacao-agendamento.component.html',
  styleUrls: ['./pendente-confirmacao-agendamento.component.css']
})
export class PendenteConfirmacaoAgendamentoComponent extends BasicComponent implements OnInit {

  agendamentos: AgendaPesquisa[] = [];

  constructor(
    private service: AgendaService,
    userService: UserService,
    spinnerService: NgxSpinnerService,
    snotifyService: SnotifyService,
    private dialog: MatDialog,
  ) {
    super(spinnerService, snotifyService, userService);
  }

  ngOnInit(): void {
    this.service.buscarConfirmacaoPendente().subscribe(
      (res) => {
        this.agendamentos = res.data;
      }, err => {
        console.error(err);
      }
    );
  }

  confirmar(agenda: AgendaPesquisa) {
    const dialogData =
      new ConfirmationDialogModel(
        'Confirmação',
        `Tem certeza que deseja confirmar o agendamento da data ${this.formatarData(new Date(agenda.data+' '))}?`);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '250px',
      closeOnNavigation: true,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        this.service.confirmar(agenda.id).subscribe(
          res => {
            this.messageSucess(`Agendamento confirmado com sucesso.`);
            this.ngOnInit();
          }, error => {
            console.error(error);
            this.messageError('Erro ao confirmr o agendamento.');
          }
        );
      }
    })
  }

  private formatarData(date: Date): string {
    const d = new Date(date)
    return d.toLocaleString().substring(0, d.toLocaleString().length-9);
  }
}

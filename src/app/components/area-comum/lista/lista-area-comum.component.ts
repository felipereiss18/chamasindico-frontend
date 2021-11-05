import { Component, OnInit } from '@angular/core';
import {BasicComponent} from "../../../shared/basic-component/basic-component";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";
import {UserService} from "../../../core/auth/user/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {DiaSemanaEnum} from "../../../enums/dia-semana.enum";
import {User} from "../../../core/auth/user/user";
import {AreaComum} from "../../../models/area-comum";
import {AreaComumPesqResp, AreaComumService} from "../../../services/area-comum/area-comum.service";
import {ConfirmationDialogModel} from "../../../shared/component/confirm-dialog/model/confirmation-dialog.model";
import {ConfirmDialogComponent} from "../../../shared/component/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-lista-area-comum',
  templateUrl: './lista-area-comum.component.html',
  styleUrls: ['./lista-area-comum.component.css']
})
export class ListaAreaComumComponent extends BasicComponent implements OnInit {
  formConsulta: FormGroup;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<AreaComumPesqResp>();
  displayColumns: string[] =
    ['bloco', 'nome', 'locacao', 'tipoReserva', 'tipoConfirmacao', 'inicial', 'fim', 'acoes', 'alterStatus'];
  faEdit = faEdit;
  diasSemana = DiaSemanaEnum;
  tiposReserva = [
    {id: 1, descricao: 'Por Dia'},
    {id: 2, descricao: 'Por Hora'},
    {id: 3, descricao: 'Apenas Informativo'},
  ];
  tiposConfirmacao = [
    {id: 1, descricao: 'Alerta Por E-mail'},
    {id: 2, descricao: 'Requer Confirmação'},
    {id: 3, descricao: 'Não é necessário'},
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: AreaComumService,
    spinnerService: NgxSpinnerService,
    snotifyService: SnotifyService,
    userService: UserService,
    private dialog: MatDialog
  ) {
    super(spinnerService, snotifyService, userService);

    this.formConsulta = formBuilder.group(
      {
        nome: [''],
        locacao: [''],
        tipoReserva: [''],
        tipoConfirmacao: [''],
        situacao: [''],
      }
    )
  }

  ngOnInit(): void {
  }

  pesquisar() {
    const areaComum = new AreaComum();
    areaComum.nome = this.formConsulta.controls.nome.value;
    areaComum.locacao = this.formConsulta.controls.locacao.value;
    areaComum.tipoReserva = this.formConsulta.controls.tipoReserva.value;
    areaComum.tipoConfirmacao = this.formConsulta.controls.tipoConfirmacao.value;
    areaComum.situacao = this.formConsulta.controls.situacao.value;

    this.service.pesquisar(areaComum).subscribe(
      res => {
        this.dataSource.data = res.data.content;

        if (this.dataSource.data != null && this.dataSource.data.length === 0) {
          this.messageInfo('Nenhum dado encontrado.')
        }
      }, error => {
        console.error(error);
        this.messageError('Não foi possível realizar a pesquisa.');
      }
    )
  }

  alterarSituacao(id: number, $event: MatSlideToggleChange) {
    const dialogData =
      new ConfirmationDialogModel(
        'Confirmação',
        `Tem certeza que quer ${$event.checked ? 'ativar' : 'desativar'} o Área Comum?`);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '250px',
      closeOnNavigation: true,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        this.service.alterarSituacao(id, $event.checked).subscribe(
          res => {
            this.messageSucess(`Área Comum ${$event.checked ? 'ativado' : 'desativado'} com sucesso!`);
            this.pesquisar();
          }, error => {
            console.error(error);
            this.messageError('Erro ao alterar a situação do área comum.');
          }
        );
      }
    })
  }
}

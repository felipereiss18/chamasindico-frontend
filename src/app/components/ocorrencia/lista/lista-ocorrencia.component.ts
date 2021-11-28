import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BasicComponent} from "../../../shared/basic-component/basic-component";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";
import {UserService} from "../../../core/auth/user/user.service";
import {MatDialog} from "@angular/material/dialog";
import {faEdit} from "@fortawesome/free-solid-svg-icons"
import {OcorrenciaPesqReq, OcorrenciaPesqResp} from "../../../interfaces/pesquisa/ocorrencia-pesquisa";
import {SituacaoOcorrencia} from "../../../models/SituacaoOcorrencia";
import {Roles} from "../../../core/auth/user/roles.enum";
import {TipoOcorrenciaEnum} from "../../../enums/tipo-ocorrencia.enum";
import {OcorrenciaService} from "../../../services/ocorrencia/ocorrencia.service";
import {ConfirmationDialogModel} from "../../../shared/component/confirm-dialog/model/confirmation-dialog.model";
import {ConfirmDialogComponent} from "../../../shared/component/confirm-dialog/confirm-dialog.component";
import {formatDate} from "@angular/common";
import {ConfirmInputDialogComponent} from "../../../shared/component/confirm-input-dialog/confirm-input-dialog.component";

@Component({
  selector: 'app-lista-ocorrencia',
  templateUrl: './lista-ocorrencia.component.html',
  styleUrls: ['./lista-ocorrencia.component.css']
})
export class ListaOcorrenciaComponent extends BasicComponent implements OnInit {
  consultarForm: FormGroup;
  displayColumns: string[] = ['bloco', 'unidade', 'situacao', 'tipo', 'descricao', 'acoes']
  dataSource: MatTableDataSource<OcorrenciaPesqResp> = new MatTableDataSource<OcorrenciaPesqResp>();
  faEdit = faEdit;
  situacoes: SituacaoOcorrencia[] = [];
  roles = Roles;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    snipperService: NgxSpinnerService,
    snotifyService: SnotifyService,
    userService: UserService,
    private service: OcorrenciaService,
    private dialog: MatDialog,
  ) {
    super(snipperService, snotifyService, userService);

    this.consultarForm = formBuilder.group({
      situacao: [''],
      tipo: [''],
      data: [''],
      descricao: [''],
    });

    this.service.buscarSituacoes().subscribe(
      (res) => {
        this.situacoes = res.data;
      }, error => {
        this.messageError('Não foi possível carregar as situações da ocorrência.');
        console.error(error);
      }
    )
  }

  ngOnInit(): void {
  }

  pesquisar() {
    let dado = {} as OcorrenciaPesqReq;
    dado.situacao = new SituacaoOcorrencia()
    if(this.consultarForm.controls.situacao.value) {
      dado.situacao.id = this.consultarForm.controls.situacao.value;
    }
    dado.tipo = this.consultarForm.controls.tipo.value;
    dado.data = this.consultarForm.controls.data.value;
    dado.descricao = this.consultarForm.controls.descricao.value;

    this.service.pesquisar(dado).subscribe(
      (res) => {
        this.dataSource.data = res.data.content;

        if (this.dataSource.data != null && this.dataSource.data.length === 0) {
          this.messageInfo('Nenhuma ocorrência encontrada.')
        }
      }, error => {
        console.error(error);
        this.messageError('Não foi possível realizar a pesquisa.')
      }
    )
  }

  analise(ocorr: OcorrenciaPesqResp) {
    const dialogData =
      new ConfirmationDialogModel(
        'Confirmação',
        `Tem certeza colocar em análise a ocorrência da data ${ListaOcorrenciaComponent.formatarData(ocorr.data)}
        do tipo ${this.verificarTipo(ocorr.tipo)}?`);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '250px',
      closeOnNavigation: true,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        if (ocorr.id) {
          this.service.colocarEmAnalise(ocorr.id).subscribe(
            res => {
              this.messageSucess(`Ocorrência se encontra Em Análise com sucesso!`);
              this.pesquisar();
            }, error => {
              console.error(error);
              this.messageError('Erro ao colocar a ocorrência Em Análise.');
            }
          );
        }
      }
    })
  }

  concluir(ocorr: OcorrenciaPesqResp) {
    const dialogData =
      new ConfirmationDialogModel(
        'Confirmação',
        `Deseja concluir a ocorrência da data ${ListaOcorrenciaComponent.formatarData(ocorr.data)}
        do tipo ${this.verificarTipo(ocorr.tipo)}?`);
    const dialogRef = this.dialog.open(ConfirmInputDialogComponent, {
      maxWidth: '800px',
      closeOnNavigation: true,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe( result => {
      if(result.confirmacao) {
        if (ocorr.id) {
          this.service.concluir(ocorr.id, result.dado).subscribe(
            res => {
              this.messageSucess(`Ocorrência concluída com sucesso!`);
              this.pesquisar();
            }, error => {
              console.error(error);
              this.messageError('Erro ao concluir a ocorrência.');
            }
          );
        }
      }
    })
  }

  excluir(ocorr: OcorrenciaPesqResp) {
    const dialogData =
      new ConfirmationDialogModel(
        'Confirmação',
        `Tem certeza em excluir a ocorrência da data ${ListaOcorrenciaComponent.formatarData(ocorr.data)}
        do tipo ${this.verificarTipo(ocorr.tipo)}?`);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '250px',
      closeOnNavigation: true,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        if (ocorr.id) {
          this.service.delete(ocorr.id).subscribe(
            res => {
              this.messageSucess(`Ocorrência excluída com sucesso!`);
              this.pesquisar();
            }, error => {
              console.error(error);
              this.messageError('Erro ao excluir a ocorrência.');
            }
          );
        }
      }
    })
  }

  private static formatarData(data: Date | undefined): string {

    if(!data){
      return '';
    }

    return formatDate(data, 'dd/MM/yyyy', 'pt-BR')
  }

  verificarTipo(tipo: number | undefined) {
    switch (tipo) {
      case TipoOcorrenciaEnum.MUDANCA:
        return 'Mudança';
      case TipoOcorrenciaEnum.BARULHO:
        return 'Barulho';
      case TipoOcorrenciaEnum.REPARO:
        return 'Reparo';
      case TipoOcorrenciaEnum.OUTROS:
        return 'Outros';
      default:
        return '';
    }
  }
}

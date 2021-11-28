import { Component, OnInit } from '@angular/core';
import {Ocorrencia} from "../../../models/Ocorrencia";
import {TipoOcorrenciaEnum} from "../../../enums/tipo-ocorrencia.enum";
import {OcorrenciaService} from "../../../services/ocorrencia/ocorrencia.service";
import {UserService} from "../../../core/auth/user/user.service";
import {Roles} from "../../../core/auth/user/roles.enum";
import {SituacaoOcorrencia} from "../../../models/SituacaoOcorrencia";
import {ComunicadoPesqResp} from "../../../interfaces/pesquisa/comunicado-pesquisa";
import {VisualizarDialogModel} from "../../../shared/component/visualizar-dialog/model/visualizar-dialog.model";
import {VisualizarDialogComponent} from "../../../shared/component/visualizar-dialog/visualizar-dialog.component";
import {SnotifyPosition} from "ng-snotify";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-mural-ocorrencia',
  templateUrl: './mural-ocorrencia.component.html',
  styleUrls: ['./mural-ocorrencia.component.css']
})
export class MuralOcorrenciaComponent implements OnInit {

  minhasOcorrencias: Ocorrencia[] = [];
  condominoOcorrencias: Ocorrencia[] = [];
  paraMimOcorrencias: Ocorrencia[] = [];
  admCondominio = false;

  constructor(
    private service: OcorrenciaService,
    private userService: UserService,
    private dialog: MatDialog,
  ) {
    this.userService.getUser().subscribe(
      res => {
        this.admCondominio = res.perfil?.role === Roles.SINDICO || res.perfil?.role === Roles.FUNCIONARIO;

        if(this.admCondominio) {
          this.service.buscarAbertaAnalise().subscribe(
            (res) => {
              this.condominoOcorrencias = res.data;
            }, error => {
              console.error(error);
            }
          )
        }
      }
    )

    this.service.buscarMinhas().subscribe(
      (res) => {
        this.minhasOcorrencias = res.data
      }, error => {
        console.error(error);
      }
    );

    this.service.buscarParaMim().subscribe(
      (res) => {
        this.paraMimOcorrencias = res.data
      }, error => {
        console.error(error);
      }
    )
  }

  ngOnInit(): void {
  }

  visualizar(ocorrencia: Ocorrencia) {
    const dialogData =
      new VisualizarDialogModel(
       `${this.verificarTipo(ocorrencia.tipo)}`,
        ocorrencia.descricao + '');
    const dialogRef = this.dialog.open(VisualizarDialogComponent, {
      maxWidth: '500px',
      closeOnNavigation: true,
      data: dialogData
    });
  }

  verificarTipo(tipo: number | undefined): string {
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

  verificarIcone(situacao: SituacaoOcorrencia | undefined): string {
    switch (situacao?.id) {
      case 1:
        return 'import_contacts';
      case 2:
        return 'plagiarism';
      default:
        return '';
    }
  }

  criarDescricao(ocorr: Ocorrencia): string {
    if(ocorr.unidadeCriacao && ocorr.blocoCriacao) {
      return `Bloco ${ocorr.blocoCriacao} - Unidade ${ocorr.unidadeCriacao}`
    }else {
      return `${ocorr.criador}`
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {ComunicadoPesqResp} from "../../../interfaces/pesquisa/comunicado-pesquisa";
import {ComunicadoService} from "../../../services/comunicado/comunicado.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogModel} from "../../../shared/component/confirm-dialog/model/confirmation-dialog.model";
import {ConfirmDialogComponent} from "../../../shared/component/confirm-dialog/confirm-dialog.component";
import {VisualizarDialogModel} from "../../../shared/component/visualizar-dialog/model/visualizar-dialog.model";
import {VisualizarDialogComponent} from "../../../shared/component/visualizar-dialog/visualizar-dialog.component";
import {SnotifyPosition, SnotifyService} from "ng-snotify";

@Component({
  selector: 'app-ativo-comunicado',
  templateUrl: './ativo-comunicado.component.html',
  styleUrls: ['./ativo-comunicado.component.css']
})
export class AtivoComunicadoComponent implements OnInit {
  comunicados: ComunicadoPesqResp[] = [];

  constructor(
    private service: ComunicadoService,
    private dialog: MatDialog,
    private snotifyService: SnotifyService
  ) { }

  ngOnInit(): void {
    this.service.buscarAtivos().subscribe(
      (res) => {
        if(res && res.data) {
          this.comunicados = res.data;
        }
      }, error => {
        console.error(error);
      }
    )
  }

  visualizar(comu: ComunicadoPesqResp) {
    this.service.findOne(comu.id).subscribe(
      (res) => {
        if(res && res.data) {
          const dialogData =
            new VisualizarDialogModel(
              res.data.titulo,
              res.data.corpo);
          const dialogRef = this.dialog.open(VisualizarDialogComponent, {
            maxWidth: '500px',
            closeOnNavigation: true,
            data: dialogData
          });
        }
      },
      error => {
        console.error(error);
        this.snotifyService.error('Ocorreu um erro ao buscar o comunicado.', {
          timeout: 5000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          position: SnotifyPosition.rightTop,
        })
      }
    )
  }
}

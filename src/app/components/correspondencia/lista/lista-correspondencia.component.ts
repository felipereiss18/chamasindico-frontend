import {Component, OnInit} from '@angular/core';
import {BasicComponent} from "../../../shared/basic-component/basic-component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";
import {UserService} from "../../../core/auth/user/user.service";
import {faEdit} from "@fortawesome/free-solid-svg-icons"
import {CorrespondenciaPesqReq, CorrespondenciaPesqResp} from "../../../interfaces/pesquisa/correspondencia-pesquisa";
import {CorrespondenciaService} from "../../../services/correspodencia/correspondencia.service";
import {Bloco} from "../../../models/bloco";
import {CondominioService} from "../../../services/condominio/condominio.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogModel} from "../../../shared/component/confirm-dialog/model/confirmation-dialog.model";
import {ConfirmDialogComponent} from "../../../shared/component/confirm-dialog/confirm-dialog.component";
import {Roles} from "../../../core/auth/user/roles.enum";


@Component({
  selector: 'app-lista-correspondencia',
  templateUrl: './lista-correspondencia.component.html',
  styleUrls: ['./lista-correspondencia.component.css']
})
export class ListaCorrespondenciaComponent extends BasicComponent implements OnInit {

  consultarForm: FormGroup;
  displayColumns: string[] = ['bloco', 'unidade', 'remetente', 'data', 'entrega', 'acoes']
  dataSource: MatTableDataSource<CorrespondenciaPesqResp> = new MatTableDataSource<CorrespondenciaPesqResp>();
  faEdit = faEdit;
  blocos: Bloco[] = [];
  roles = Roles;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private service: CorrespondenciaService,
    private condominioService: CondominioService,
    snipperService: NgxSpinnerService,
    snotifyService: SnotifyService,
    userService: UserService,
    private dialog: MatDialog,
  ) {
    super(snipperService, snotifyService, userService);

    this.consultarForm = formBuilder.group({
      unidade: [''],
      bloco: [''],
      data: [''],
      entrega: [''],
      remetente: [''],
    });

  }

  ngOnInit(): void {

    this.condominioService.buscarBlocos(this.getUser().condominio).subscribe(
      (res) =>{
        this.blocos = res.data
      }, error => {
        console.error(error);
        this.messageWarning('Não foi possível carregar os blocos.')
      }
    )

  }

  pesquisar() {
    let dado = {} as CorrespondenciaPesqReq;
    dado.unidade = this.consultarForm.controls.unidade.value;
    dado.bloco = this.consultarForm.controls.bloco.value;
    dado.remetente = this.consultarForm.controls.remetente.value;
    dado.data = this.consultarForm.controls.data.value;
    dado.entrega = this.consultarForm.controls.entrega.value;

    this.service.pesquisar(dado).subscribe(
      (res) => {
        this.dataSource.data = res.data.content;

        if (this.dataSource.data != null && this.dataSource.data.length === 0) {
          this.messageInfo('Nenhuma correspondência encontrada.')
        }
      }, error => {
        console.error(error);
        this.messageError('Não foi possível realizar a pesquisa.')
      }
    )
  }

  excluir(corresp: CorrespondenciaPesqResp) {
    const dialogData =
      new ConfirmationDialogModel(
        'Confirmação',
        `Tem certeza em excluir a correspondência com remetente ${corresp.remetente} na data ${this.formatarData(corresp.data)}?`);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '250px',
      closeOnNavigation: true,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        this.service.delete(corresp.id).subscribe(
          res => {
            this.messageSucess(`Correspondência excluída com sucesso!`);
            this.pesquisar();
          }, error => {
            console.error(error);
            this.messageError('Erro ao excluir a correspondência.');
          }
        );
      }
    })
  }

  private formatarData(data: string): string {
    const strings = data.split('-');

    return strings[2] + "/" + strings[1] + "/" + strings[0];
  }

  entregar(corresp: CorrespondenciaPesqResp): void {
    const dialogData =
      new ConfirmationDialogModel(
        'Confirmação',
        `A correspondência com remetente ${corresp.remetente} na data ${this.formatarData(corresp.data)} foi entregue hoje?`);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '250px',
      closeOnNavigation: true,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        this.service.entregar(corresp.id).subscribe(
          res => {
            this.messageSucess(`Correspondência entregue com sucesso!`);
            this.pesquisar();
          }, error => {
            console.error(error);
            this.messageError('Erro ao entregue a correspondência.');
          }
        );
      }
    })
  }
}

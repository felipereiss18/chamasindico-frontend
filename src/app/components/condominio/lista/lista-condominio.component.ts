import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Condominio} from "../../../models/condominio";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Estado} from "../../../models/estado";
import {EstadoService} from "../../../services/estado/estado.service";
import {BasicComponent} from "../../../shared/basic-component/basic-component";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";
import {CondominioService} from "../../../services/condominio/condominio.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogModel} from "../../../shared/component/confirm-dialog/model/confirmation-dialog.model";
import {ConfirmDialogComponent} from "../../../shared/component/confirm-dialog/confirm-dialog.component";
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {UserService} from "../../../core/auth/user/user.service";

@Component({
  selector: 'app-lista-condominio',
  templateUrl: './lista-condominio.component.html',
  styleUrls: ['./lista-condominio.component.css']
})
export class ListaCondominioComponent extends BasicComponent implements OnInit {

  displayColumns: string[] = ['nome', 'cnpj', 'cidade', 'estado', 'acoes', 'alterStatus']
  dataSource: MatTableDataSource<Condominio> = new MatTableDataSource<Condominio>();
  faEdit = faEdit;

  consultarForm: FormGroup = this.formBuilder.group({
    nome: [null],
    cidade: [null],
    estado: [null],
    situacao: [null],
  })

  estados: Estado[] = [];

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private estadoService: EstadoService,
    private service: CondominioService,
    snipperService: NgxSpinnerService,
    snotifyService: SnotifyService,
    userService: UserService,
    private dialog: MatDialog
  ) {
    super(snipperService, snotifyService, userService);
    estadoService.gets('estados').subscribe(
      (res) => {
        this.estados = res.data
      },
      error => {
        this.messageError('Ocorreu um erro em buscar os Estados');
        console.error(error);
      }
    )
  }

  ngOnInit(): void {
  }

  pesquisar() {
    const condominio = new Condominio()
    condominio.nome = this.consultarForm.controls.nome.value;
    condominio.cidade = this.consultarForm.controls.cidade.value;
    condominio.estado = new Estado(this.consultarForm.controls.estado.value);
    condominio.situacao = this.consultarForm.controls.situacao.value;

    this.service.pesquisar(condominio).subscribe(
      (res) => {
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

  adicionar(){
    this.router.navigate(['condominio/adicionar']);
  }

  alterarSituacao(id: number, $event: any): void {
    const dialogData =
      new ConfirmationDialogModel(
        'Confirmação',
        `Tem certeza que quer ${$event.checked ? 'ativar' : 'desativar'} o Condomínio?`);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '250px',
      closeOnNavigation: true,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        this.service.alterarSituacao(id, $event.checked).subscribe(
          res => {
            this.messageSucess(`Condomínio ${$event.checked ? 'ativado' : 'desativado'} com sucesso!`);
            this.pesquisar();
          }, error => {
            console.error(error);
            this.messageError('Erro ao alterar a situação do condomínio.');
          }
        );
      }
    })
  }

  editar(id: number): void {
    this.router.navigate(['condominio/editar/'+id]);
  }

  visualizar(id: number): void{
    this.router.navigate(['condominio/detalhar/'+id]);
  }
}

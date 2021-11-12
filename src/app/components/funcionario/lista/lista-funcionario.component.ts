import {Component, OnInit} from '@angular/core';
import {BasicComponent} from "../../../shared/basic-component/basic-component";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";
import {UserService} from "../../../core/auth/user/user.service";
import {MatDialog} from "@angular/material/dialog";
import {FuncionarioService} from "../../../services/funcionario/funcionario.service";
import {MatTableDataSource} from "@angular/material/table";
import {FuncionarioPesqReq, FuncionarioPesqResp} from "../../../interfaces/pesquisa/funcionario-pesquisa";
import {Roles} from "../../../core/auth/user/roles.enum";
import {faEdit} from "@fortawesome/free-solid-svg-icons"
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {ConfirmationDialogModel} from "../../../shared/component/confirm-dialog/model/confirmation-dialog.model";
import {ConfirmDialogComponent} from "../../../shared/component/confirm-dialog/confirm-dialog.component";
import {UsuarioService} from "../../../services/usuario/usuario.service";

@Component({
  selector: 'app-lista-funcionario',
  templateUrl: './lista-funcionario.component.html',
  styleUrls: ['./lista-funcionario.component.css']
})
export class ListaFuncionarioComponent extends BasicComponent implements OnInit {

  consultarForm: FormGroup;
  displayColumns: string[] = ['nome', 'usuario', 'email', 'telefone', 'acoes', 'alterStatus']
  dataSource: MatTableDataSource<FuncionarioPesqResp> = new MatTableDataSource<FuncionarioPesqResp>();
  roles = Roles;
  faEdit = faEdit;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private service: FuncionarioService,
    private usuarioService: UsuarioService,
    snipperService: NgxSpinnerService,
    snotifyService: SnotifyService,
    userService: UserService,
    private dialog: MatDialog,
  ) {
    super(snipperService, snotifyService, userService);

    this.consultarForm = formBuilder.group({
      nome: [''],
      usuario: ['']
    })
  }

  ngOnInit(): void {
  }

  pesquisar() {
    let dado = {} as FuncionarioPesqReq;
    dado.nome = this.consultarForm.controls.nome.value;
    dado.usuario = this.consultarForm.controls.usuario.value;

    this.service.pesquisar(dado).subscribe(
      (res) => {
        this.dataSource.data = res.data.content;

        if (this.dataSource.data != null && this.dataSource.data.length === 0) {
          this.messageInfo('Nenhum funcionário encontrado.')
        }
      }, error => {
        console.error(error);
        this.messageError('Não foi possível realizar a pesquisa.')
      }
    )

  }

  alterarSituacao(id: number, $event: MatSlideToggleChange) {
    const dialogData =
      new ConfirmationDialogModel(
        'Confirmação',
        `Tem certeza que quer ${$event.checked ? 'ativar' : 'desativar'} o Funcionário?`);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '250px',
      closeOnNavigation: true,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        this.usuarioService.alterarSituacao(id, $event.checked).subscribe(
          res => {
            this.messageSucess(`Funcionário ${$event.checked ? 'ativado' : 'desativado'} com sucesso!`);
            this.pesquisar();
          }, error => {
            console.error(error);
            this.messageError('Erro ao alterar a situação do Funcionário.');
          }
        );
      }
    })
  }
}

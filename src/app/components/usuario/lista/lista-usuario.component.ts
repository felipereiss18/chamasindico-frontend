import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {faEdit} from "@fortawesome/free-solid-svg-icons"
import {Perfil} from "../../../core/auth/user/perfil";
import {Usuario} from "../../../models/usuario";
import {PerfilService} from "../../../services/perfil/perfil.service";
import {BasicComponent} from "../../../shared/basic-component/basic-component";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../../core/auth/user/user.service";
import {Roles} from "../../../core/auth/user/roles.enum";
import {UsuarioPesquisa, UsuarioService} from "../../../services/usuario/usuario.service";
import {ConfirmationDialogModel} from "../../../shared/component/confirm-dialog/model/confirmation-dialog.model";
import {ConfirmDialogComponent} from "../../../shared/component/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent extends BasicComponent implements OnInit {

  consultarForm: FormGroup;
  displayColumns: string[] = ['usuario', 'perfil', 'acoes', 'alterStatus']
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>();
  faEdit = faEdit;
  perfis: Perfil[] = [];
  roles = Roles;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private perfilService: PerfilService,
    private service: UsuarioService,
    snipperService: NgxSpinnerService,
    snotifyService: SnotifyService,
    userService: UserService,
    private dialog: MatDialog,
  ) {
    super(snipperService, snotifyService, userService)
    this.consultarForm = formBuilder.group({
      usuario: [''],
      situacao: [''],
      perfil: ['']
    })

    perfilService.gets().subscribe(
      res => {
        this.perfis = res.data;

        if(this.getUser().perfil?.role !== this.roles.ADMIN) {
          const index = this.perfis.findIndex(p  => p.role === this.roles.ADMIN);
          this.perfis = this.perfis.splice(index, 1);
        }

      }, error => {
        console.error(error);
        this.messageError('Não foi possível carregar Perfis.')
      }
    )
  }

  ngOnInit(): void {
  }

  pesquisar() {

    const usuPesq = {
      usuario: this.consultarForm.controls.usuario.value,
      situacao: this.consultarForm.controls.situacao.value,
      perfil: {id: this.consultarForm.controls.perfil.value} as Perfil
    } as UsuarioPesquisa

    this.service.pesquisar(usuPesq).subscribe(
      res => {
        this.dataSource.data = res.data.content;

        if (this.dataSource.data != null && this.dataSource.data.length === 0) {
          this.messageInfo('Nenhum dado encontrado.')
        }
      }, error => {
        console.error(error);
        this.messageError('Não foi possível realizar a pesquisa.')
      }
    )

  }

  adicionarAdministrador() {
    this.router.navigate(['usuario/adicionar']);
  }

  editar(id: number) {
    this.router.navigate(['usuario/editar/'+id]);
  }

  alterarSituacao(id: number, $event: any) {
    const dialogData =
      new ConfirmationDialogModel(
        'Confirmação',
        `Tem certeza que quer ${$event.checked ? 'ativar' : 'desativar'} o Usuário?`);
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
}

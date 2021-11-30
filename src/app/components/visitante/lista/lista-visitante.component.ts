import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";
import {UserService} from "../../../core/auth/user/user.service";
import {MatDialog} from "@angular/material/dialog";
import {BasicComponent} from "../../../shared/basic-component/basic-component";
import {MatTableDataSource} from "@angular/material/table";
import {Roles} from "../../../core/auth/user/roles.enum";
import {faEdit} from "@fortawesome/free-solid-svg-icons"
import {Visitante} from "../../../models/visitante";
import {VisitantePesquisa} from "../../../interfaces/pesquisa/visitante-pesquisa";
import {VisitanteService} from "../../../services/visitante/visitante.service";
import {FormularioVisitanteComponent} from "../formulario/formulario-visitante.component";
import {ListaVisitaComponent} from "../visita/lista/lista-visita.component";

@Component({
  selector: 'app-lista-visitante',
  templateUrl: './lista-visitante.component.html',
  styleUrls: ['./lista-visitante.component.css']
})
export class ListaVisitanteComponent extends BasicComponent implements OnInit {
  consultarForm: FormGroup;
  displayColumns: string[] = ['documento', 'nome', 'telefone', 'acoes']
  dataSource: MatTableDataSource<Visitante> = new MatTableDataSource<Visitante>();
  faEdit = faEdit;
  roles = Roles;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private service: VisitanteService,
    snipperService: NgxSpinnerService,
    snotifyService: SnotifyService,
    userService: UserService,
    private dialog: MatDialog,
  ) {
    super(snipperService, snotifyService, userService);

    this.consultarForm = formBuilder.group({
      documento: [''],
      nome: ['']
    });
  }

  ngOnInit(): void {
  }

  pesquisar() {
    const dado = {} as VisitantePesquisa;
    dado.documento = this.consultarForm.controls.documento.value;
    dado.nome = this.consultarForm.controls.nome.value;

    this.service.pesquisar(dado).subscribe(
      (res) => {
        this.dataSource.data = res.data.content

        if (this.dataSource.data != null && this.dataSource.data.length === 0) {
          this.messageInfo('Nenhuma ocorrência encontrada.')
        }

      }, error => {
        console.error(error);
        this.messageError('Não foi possível realizar a pesquisa.')
      }
    )
  }

  editar(documento: string) {
    const dialogRef = this.dialog.open(FormularioVisitanteComponent, {
      maxWidth: '800px',
      closeOnNavigation: true,
      data: documento
    });

    dialogRef.afterClosed().subscribe( (result) => {
      if(result.confirmacao) {
        const visitante = new Visitante();
        visitante.documento = documento;
        visitante.nome = result.nome;
        visitante.telefone = result.telefone;

        this.service.update(documento, visitante).subscribe(
          (res) => {
            this.messageSucess('Visitante alterado com sucesso.');
            this.pesquisar();
          }, error => {
            console.error(error);
            this.messageError('Erro ao alterar o visitante.');
          }
        )
      }
    })
  }

  listarVisitas(documento: string) {
    this.dialog.open(ListaVisitaComponent, {
      width: '800px',
      closeOnNavigation: true,
      data: documento
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {CondominioService} from "../../../services/condominio/condominio.service";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";
import {UserService} from "../../../core/auth/user/user.service";
import {MatTableDataSource} from "@angular/material/table";
import {Condominio} from "../../../models/condominio";
import {UnidadePesquisaDto} from "../../../interfaces/pesquisa/unidade-pesquisa-dto";
import {BasicComponent} from "../../../shared/basic-component/basic-component";
import {Bloco} from "../../../models/bloco";
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {UnidadePesquisa, UnidadeService} from "../../../services/unidade/unidade.service";
import {Roles} from "../../../core/auth/user/roles.enum";

@Component({
  selector: 'app-lista-unidade',
  templateUrl: './lista-unidade.component.html',
  styleUrls: ['./lista-unidade.component.css']
})
export class ListaUnidadeComponent extends BasicComponent implements OnInit {
  consultarForm: FormGroup;
  displayColumns: string[] = ['condominio', 'bloco', 'unidade', 'metragem', 'quarto', 'banheiro', 'acoes']
  dataSource: MatTableDataSource<UnidadePesquisaDto> = new MatTableDataSource<UnidadePesquisaDto>();
  condominios: Condominio[] = [];
  blocos: Bloco[] = [];
  faEdit = faEdit;
  roles = Roles;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private condominioService: CondominioService,
    private service: UnidadeService,
    snipperService: NgxSpinnerService,
    snotifyService: SnotifyService,
    userService: UserService,
  ) {
    super(snipperService, snotifyService, userService);
    this.consultarForm = formBuilder.group({
      condominio: [null],
      bloco: [null],
      unidade: [null]
    })
  }

  async ngOnInit() {

    await this.condominioService.findAll().toPromise().then(
      res => {
        this.condominios = res.data;
      },
      error => {
        this.messageError('Não foi possível carregar os condomínios');
        console.error(error);
      }
    );

    if (this.getUser().perfil?.role !== this.roles.ADMIN) {
      this.carregarBlocos(this.getUser().condominio);
    }
  }

  pesquisar() {
    const dado = {} as UnidadePesquisa;
    dado.unidade = this.consultarForm.controls.unidade.value;
    dado.idCondominio = this.consultarForm.controls.condominio.value;
    dado.idBloco = this.consultarForm.controls.bloco.value;

    this.service.pesquisar(dado).subscribe(
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

  carregarBlocos(value: number) {
    if (value) {
      const condominio = this.condominios.find(c => c.id === value);

      if (condominio && condominio.blocos) {
        this.blocos = condominio.blocos;
      }
    } else {
      this.blocos = [];
    }
  }

  editar(id: number) {

  }
}

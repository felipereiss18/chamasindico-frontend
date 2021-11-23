import {Component, OnInit} from '@angular/core';
import {BasicComponent} from "../../../shared/basic-component/basic-component";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";
import {UserService} from "../../../core/auth/user/user.service";
import {MatTableDataSource} from "@angular/material/table";
import {faEdit} from "@fortawesome/free-solid-svg-icons"
import {ComunicadoPesqReq, ComunicadoPesqResp} from "../../../interfaces/pesquisa/comunicado-pesquisa";
import {ComunicadoService} from "../../../services/comunicado/comunicado.service";

@Component({
  selector: 'app-lista-comunicado',
  templateUrl: './lista-comunicado.component.html',
  styleUrls: ['./lista-comunicado.component.css']
})
export class ListaComunicadoComponent extends BasicComponent implements OnInit {

  consultarForm: FormGroup;
  displayColumns: string[] = ['data', 'vencimento', 'titulo', 'acoes']
  dataSource: MatTableDataSource<ComunicadoPesqResp> = new MatTableDataSource<ComunicadoPesqResp>();
  faEdit = faEdit;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private service: ComunicadoService,
    snipperService: NgxSpinnerService,
    snotifyService: SnotifyService,
    userService: UserService,
  ) {
    super(snipperService, snotifyService, userService);

    this.consultarForm = formBuilder.group({
      data: [''],
      vencimento: [''],
      titulo: ['']
    });

  }

  ngOnInit(): void {
  }

  pesquisar() {
    let dado = {} as ComunicadoPesqReq;
    dado.data = this.consultarForm.controls.data.value;
    dado.vencimento = this.consultarForm.controls.vencimento.value;
    dado.titulo = this.consultarForm.controls.titulo.value;

    this.service.pesquisar(dado).subscribe(
      (res) => {
        this.dataSource.data = res.data.content;

        if (this.dataSource.data != null && this.dataSource.data.length === 0) {
          this.messageInfo('Nenhum Comunicado encontrado.')
        }
      }, error => {
        console.error(error);
        this.messageError('Não foi possível realizar a pesquisa.')
      }
    )
  }

  enviar(comunicado: ComunicadoPesqResp) {
    if (this.verificarDataVencimento(comunicado)) {
      this.service.enviar(comunicado.id).subscribe(
        (res) => {
          this.messageSucess('Comunicado enviado com sucesso.');
        }, error => {
          console.error(error);
          this.messageError('Não foi possível enviar o comunicado.');
        }
      );
    }
  }

  verificarDataVencimento(comunicado: ComunicadoPesqResp): boolean {
    const data = new Date();

    const vencimento = new Date(comunicado.vencimento + ' ');

    return vencimento >= data;
  }
}

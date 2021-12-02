import {Component, OnInit} from '@angular/core';
import {BasicComponent} from "../../../shared/basic-component/basic-component";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CondominioService} from "../../../services/condominio/condominio.service";
import {UnidadeService} from "../../../services/unidade/unidade.service";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";
import {UserService} from "../../../core/auth/user/user.service";
import {OcorrenciaService} from "../../../services/ocorrencia/ocorrencia.service";
import {Bloco} from "../../../models/bloco";
import {Unidade} from "../../../models/unidade";
import {Editor, Toolbar} from "ngx-editor";
import {Ocorrencia} from "../../../models/Ocorrencia";

@Component({
  selector: 'app-formulario-ocorrencia',
  templateUrl: './formulario-ocorrencia.component.html',
  styleUrls: ['./formulario-ocorrencia.component.css']
})
export class FormularioOcorrenciaComponent extends BasicComponent implements OnInit {

  formOcorre: FormGroup;
  title: string;
  private tipo: number;
  id: number;
  visualizar: boolean;
  blocos: Bloco[] = [];
  unidades: Unidade[] = [];

  editor: Editor;
  toolbar: Toolbar = [
    ["bold", "italic"],
    ["underline", "strike"],
    ["code", "blockquote"],
    ["ordered_list", "bullet_list"],
    [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
    ["link", "image"],
    ["text_color", "background_color"],
    ["align_left", "align_center", "align_right", "align_justify"]
  ];
  dataResposta: Date | undefined;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly activeRoute: ActivatedRoute,
    private service: OcorrenciaService,
    private condominioService: CondominioService,
    private unidadeService: UnidadeService,
    snipperService: NgxSpinnerService,
    snotifyService: SnotifyService,
    userService: UserService,
  ) {
    super(snipperService, snotifyService, userService);
    this.editor = new Editor();
    this.title = `${activeRoute.snapshot.data['title']} Ocorrência`;
    this.tipo = activeRoute.snapshot.data['tipo'];
    this.id = Number(this.activeRoute.snapshot.paramMap.get('id'));

    this.visualizar = this.tipo === 3;

    this.formOcorre = this.formBuilder.group({
      unidade: [{value: '', disabled: this.visualizar}],
      bloco: [{value: '', disabled: this.visualizar}],
      descricao: [{value: '', disabled: this.visualizar}, [Validators.required]],
      tipo: [{value: null, disabled: this.visualizar}, [Validators.required]],
      data: [{value: new Date(), disabled: true}, [Validators.required]],
      resposta: [{value: ''}]
    });

    this.condominioService.buscarBlocos(this.getUser().condominio).subscribe(
      (res) => {
        this.blocos = res.data
      }, error => {
        console.error(error);
        this.messageError('Ocorreu um erro ao buscar os blocos.');
      }
    )
  }

  ngOnInit(): void {
    if(this.id) {
      this.service.findOne(this.id).subscribe(
        (res) => {
          if (res.data) {
            this.formOcorre.patchValue(res.data);
            this.dataResposta = res.data.conclusao;
            if(res.data.blocoDestinatario && res.data.unidadeDestinatario) {
              this.formOcorre.controls.bloco.setValue(res.data.blocoDestinatario);
              this.buscarUnidade(res.data.blocoDestinatario);
              this.formOcorre.controls.unidade.setValue(res.data.unidadeDestinatario);
            }
            this.formOcorre.controls.tipo.setValue(res.data.tipo?.toString());
          }
        }, error => {
          console.error(error);
          this.messageError('Não foi possível carregar os dados da ocorrência.')
        }
      )
    }
  }

  salvar() {
    if(this.formOcorre.valid) {

      let ocorrencia = new Ocorrencia();
      ocorrencia.blocoDestinatario = this.formOcorre.controls.bloco.value;
      ocorrencia.unidadeDestinatario = this.formOcorre.controls.unidade.value;
      ocorrencia.data = this.formOcorre.controls.data.value;
      ocorrencia.tipo = this.formOcorre.controls.tipo.value;
      ocorrencia.descricao = this.formOcorre.controls.descricao.value;

      if(this.id && this.id > 0) {
        this.edit(ocorrencia);
      }else {
        this.save(ocorrencia);
      }
    }
  }

  buscarUnidade(bloco: string) {
    if (bloco && bloco.length > 0) {
      this.unidadeService.buscarPorCondominoBloco(this.getUser().condominio, bloco).subscribe(
        (res) => {
          this.unidades = res.data
        }, error => {
          console.error(error);
          this.messageError('Não foi possível carregar as unidades.');
        }
      )
    } else {
      this.unidades = [];
    }
  }

  private edit(ocorrencia: Ocorrencia) {
    this.service.update(this.id, ocorrencia).subscribe(
      (res) => {
        this.messageSucess('Ocorrência alterada com sucesso.')
        this.router.navigate(['ocorrencia']);
      }, error => {
        console.error(error);
        this.messageError('Não foi possível alterar a ocorrência.')
      }
    );
  }

  private save(ocorrencia: Ocorrencia) {
    this.service.save(ocorrencia).subscribe(
      (res) => {
        if (res.data) {
          this.id = res.data;
        }
        this.messageSucess('Ocorrência salva com sucesso.')
        this.router.navigate(['ocorrencia']);
      }, error => {
        console.error(error);
        this.messageError('Não foi possível salvar a ocorrência.')
      }
    );
  }
}

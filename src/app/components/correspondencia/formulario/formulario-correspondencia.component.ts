import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";
import {UserService} from "../../../core/auth/user/user.service";
import {BasicComponent} from "../../../shared/basic-component/basic-component";
import {CorrespondenciaService} from "../../../services/correspodencia/correspondencia.service";
import {CondominioService} from "../../../services/condominio/condominio.service";
import {Bloco} from "../../../models/bloco";
import {Correspondencia} from "../../../models/correspondencia";
import {Unidade} from "../../../models/unidade";
import {Condominio} from "../../../models/condominio";
import {UnidadeService} from "../../../services/unidade/unidade.service";

@Component({
  selector: 'app-formulario-correspondencia',
  templateUrl: './formulario-correspondencia.component.html',
  styleUrls: ['./formulario-correspondencia.component.css']
})
export class FormularioCorrespondenciaComponent extends BasicComponent implements OnInit {

  formCorresp: FormGroup;
  title: string;
  private tipo: number;
  id: number;
  visualizar: boolean;
  blocos: Bloco[] = [];
  generos = [
    {id: 'F', descricao: 'Feminino'},
    {id: 'M', descricao: 'Masculino'}
  ]
  unidades: Unidade[] = [];

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly activeRoute: ActivatedRoute,
    private service: CorrespondenciaService,
    private condominioService: CondominioService,
    private unidadeService: UnidadeService,
    snipperService: NgxSpinnerService,
    snotifyService: SnotifyService,
    userService: UserService,
  ) {
    super(snipperService, snotifyService, userService);

    this.title = `${activeRoute.snapshot.data['title']} Comunicado`;
    this.tipo = activeRoute.snapshot.data['tipo'];
    this.id = Number(this.activeRoute.snapshot.paramMap.get('id'));

    this.visualizar = this.tipo === 3;

    this.formCorresp = formBuilder.group({
      unidade: [{value: '', disabled: this.visualizar}, [Validators.required]],
      bloco: [{value: '', disabled: this.visualizar}, [Validators.required]],
      remetente: [{value: '', disabled: this.visualizar}, [Validators.required]],
      genero: [{value: '', disabled: this.visualizar}, [Validators.required]],
      data: [{value: '', disabled: this.visualizar}, [Validators.required]],
      funcionarioCriacao: [{value: '', disabled: true}],
      funcionarioEntrega: [{value: '', disabled: true}],
      entrega: [{value: '', disabled: true}],
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
            this.formCorresp.patchValue(res.data);

            let data;
            if (res.data.data) {
              data = new Date(res.data.data + ' ');
              this.formCorresp.controls.data.setValue(data.toISOString());
            }

            this.buscarUnidade(res.data.bloco);
            this.formCorresp.controls.unidade.setValue(res.data.unidade.id);
            this.formCorresp.controls.funcionarioCriacao.setValue(res.data.funcionarioCriacao?.nome);
            this.formCorresp.controls.funcionarioEntrega.setValue(res.data.funcionarioEntrega?.nome);
          }
        }, error => {
          console.error(error);
          this.messageError('Não foi possível carregar os dados da correspondência.')
        }
      )
    }
  }

  salvar() {

    if(this.formCorresp.valid) {

      const unidade = new Unidade();
      unidade.id = this.formCorresp.controls.unidade.value;

      const correspondencia = new Correspondencia (
        unidade,
        this.formCorresp.controls.bloco.value,
        new Condominio(this.getUser().condominio),
        this.formCorresp.controls.remetente.value,
        this.formCorresp.controls.data.value,
        this.formCorresp.controls.genero.value,
      );

      if(this.id && this.id > 0) {
        this.edit(correspondencia);
      }else {
        this.save(correspondencia);
      }
    }

  }

  private edit(correspondencia: Correspondencia) {

    this.service.update(this.id, correspondencia).subscribe(
      (res) => {
        this.messageSucess('Correspondência alterada com sucesso.')
        this.router.navigate(['correspondencia']);
      }, error => {
        console.error(error);
        this.messageError('Não foi possível alterar a correspondência.')
      }
    );
  }

  private save(correspondencia: Correspondencia) {

    this.service.save(correspondencia).subscribe(
      (res) => {
        if (res.data) {
          this.id = res.data;
        }
        this.messageSucess('Correspondência salva com sucesso.')
        this.router.navigate(['correspondencia']);
      }, error => {
        console.error(error);
        this.messageError('Não foi possível salvar o correspondência.')
      }
    );
  }

  buscarUnidade(bloco: string) {
    this.unidadeService.buscarPorCondominoBloco(this.getUser().condominio, bloco).subscribe(
      (res) => {
        this.unidades = res.data
      },error => {
        console.error(error);
        this.messageError('Não foi possível carregar as unidades.');
      }
    )
  }
}

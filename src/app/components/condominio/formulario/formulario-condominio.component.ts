import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Estado} from "../../../models/estado";
import {Bloco} from "../../../models/bloco";
import {Unidade} from "../../../models/unidade";
import {BasicComponent} from "../../../shared/basic-component/basic-component";
import {CepService} from "../../../services/cep/cep.service";
import {EstadoService} from "../../../services/estado/estado.service";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";
import {CondominioService} from "../../../services/condominio/condominio.service";
import {Condominio} from "../../../models/condominio";


@Component({
  selector: 'app-formulario-condominio',
  templateUrl: './formulario-condominio.component.html',
  styleUrls: ['./formulario-condominio.component.css']
})
export class FormularioCondominioComponent extends BasicComponent implements OnInit {

  title;
  id: number;
  private tipo: number;
  columnsTableUnidade: string[] = ['id', 'banheiros', 'metragem', 'quartos', 'acao']

  estados: Estado[] = [];
  blocos: Bloco[] = [];
  formularioCondominio: FormGroup = this.formBuilder.group({});
  bloco: FormControl;
  qtdAndares: FormControl;
  qtdUnidade: FormControl;
  blocosInvalid = ''
  visualizar: boolean;
  situacao = true;

  constructor(
    private readonly router: Router,
    private readonly activeRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private cepService: CepService,
    private estadoService: EstadoService,
    private condominioService: CondominioService,
    spinnerService: NgxSpinnerService,
    snotifyService: SnotifyService,
  ) {
    super(spinnerService, snotifyService);
    this.title = activeRoute.snapshot.data['title'] + ' Condomínio';
    this.tipo = activeRoute.snapshot.data['tipo'];
    this.id = Number(this.activeRoute.snapshot.paramMap.get('id'));

    this.visualizar = this.tipo === 3;

    if (this.visualizar) {
      this.columnsTableUnidade = ['id', 'banheiros', 'metragem', 'quartos']
    }
    this.bloco = new FormControl( {value: '', disabled: this.visualizar}, Validators.required);
    this.qtdAndares = new FormControl({value: '', disabled: this.visualizar}, Validators.required);
    this.qtdUnidade = new FormControl({value: '', disabled: this.visualizar}, Validators.required);

    this.estadoService.gets('estados').subscribe(
      (res) => {
        this.estados = res.data
      },
      (error) => {
        console.error(error);
      }
    )
  }

  ngOnInit(): void {
    this.formularioCondominio = this.formBuilder.group({
      nome: [{value: '', disabled: this.visualizar}, [Validators.required]],
      cnpj: [{value: '', disabled: this.visualizar}, [Validators.required]],
      cep: [{value: '', disabled: this.visualizar}, Validators.required],
      endereco: [{value: '', disabled: this.visualizar}, Validators.required],
      numero: [{value: '', disabled: this.visualizar}, Validators.required],
      complemento: [{value: '', disabled: this.visualizar}],
      bairro: [{value: '', disabled: this.visualizar}, Validators.required],
      cidade: [{value: '', disabled: this.visualizar}, Validators.required],
      estado: [{value: '', disabled: this.visualizar}, Validators.required],
      blocos: [this.blocos.length, Validators.min(1)],
    })

    if (this.id) {
      this.condominioService.findOne(this.id).subscribe(
        res => {
          this.formularioCondominio.patchValue(res.data);
          this.formularioCondominio.get('estado')?.setValue(res.data.estado?.id);
          if (res.data.situacao !== undefined) {
            this.situacao = res.data.situacao
          }
          if(res.data.blocos) {
            this.blocos = res.data.blocos;
          }
        }, error => {
          console.error(error);
          this.messageError('Não foi possível carregar as informações do condomínio.');
        }
      )
    }
  }

  adicionarComUnidade(): void {

    this.bloco.markAllAsTouched();
    this.qtdAndares.markAllAsTouched();
    this.qtdUnidade.markAllAsTouched();

    if(this.bloco.valid && this.qtdAndares.valid && this.qtdUnidade.valid) {
      this.showLoading();
      const andares = this.qtdAndares.value;
      const quantidade = this.qtdUnidade.value;
      let unidades: Unidade[] = [];

      for (let andar = 1; andar <= andares; andar++) {
        for (let unidade = 1; unidade <= quantidade; unidade++) {
          unidades.push({
            id: ((andar * 100) + unidade),
            banheiros: 0,
            metragem: 0,
            quartos: 0,
          })
        }
      }

      this.blocos.push({
        id: this.bloco.value,
        condominio: 0,
        unidades: unidades
      })

      this.bloco.reset()
      this.qtdAndares.reset();
      this.qtdUnidade.reset();

    }

    this.closeLoading();
    this.formularioCondominio.controls['blocos'].setValue(this.blocos.length);
    this.verificarBlocos();
  }

  adicionar(): void {
    this.showLoading();
    this.bloco.markAllAsTouched();
    this.qtdUnidade.reset();
    this.qtdAndares.reset();
    if(this.bloco.valid) {
      this.blocos.push({
        id: this.bloco.value,
        condominio: 0,
        unidades: [{} as Unidade]
      })

      this.bloco.reset();
      this.qtdAndares.reset();
      this.qtdUnidade.reset();
    }

    this.closeLoading();
    this.formularioCondominio.controls['blocos'].setValue(this.blocos.length);
    this.verificarBlocos();
  }

  excluirBloco(index: number): void {
    this.blocos.splice(index, 1);
    this.formularioCondominio.controls['blocos'].setValue(this.blocos.length);
  }

  adicionarUnidade(pos: number, bloco: Bloco): void {
    if(bloco.unidades.length === 1) {
      this.blocos.find(b => b === bloco)?.unidades.push({} as Unidade);
    }else {
      const firts = this.blocos.find(b => b === bloco)?.unidades.slice(0, pos+1);
      const end = this.blocos.find(b => b === bloco)?.unidades.splice(pos+1, bloco.unidades.length);
      if (firts && end) {
        end.unshift({} as Unidade);
        // @ts-ignore
        this.blocos.find(b => b === bloco)?.unidades = firts.concat(end);
      }
    }
  }

  excluirUnidade(pos: number, bloco: Bloco): void {
   if(bloco.unidades.length > 1) {
      this.blocos.find(b => b === bloco)?.unidades.splice(pos, 1);
    }else {
      this.messageError('Não foi possível apagar unidade. Obrigatório pelo 1 unidade no bloco.')
    }
  }

  salvar(): void {
    this.formularioCondominio.markAllAsTouched();
    this.verificarBlocos();
    if (this.formularioCondominio.valid){
      const condominio = new Condominio(
        this.id ? this.id : undefined,
        this.formularioCondominio.controls.nome.value,
        this.formularioCondominio.controls.cnpj.value,
        this.formularioCondominio.controls.cep.value,
        this.formularioCondominio.controls.endereco.value,
        this.formularioCondominio.controls.bairro.value,
        this.formularioCondominio.controls.numero.value,
        this.formularioCondominio.controls.complemento.value,
        this.formularioCondominio.controls.cidade.value,
        new Estado(this.formularioCondominio.controls.estado.value),
        this.blocos
      );

      if(this.id){
        this.edit(this.id, condominio);
      }else {
        this.save(condominio);
      }
    }
  }

  private save(condominio: Condominio): void {
    this.condominioService.save(condominio).subscribe(
      (res) => {
        this.messageSucess('Condomínio salvo com sucesso!');
        this.router.navigate(['condominio']);
      }, error => {
        console.error(error);
        this.messageError('Ocorreu um erro no salvar condomínio.')
      }
    )
  }

  private edit(id: number, condominio: Condominio): void {
    this.condominioService.update(id, condominio).subscribe(
      res => {
        this.messageSucess('Condomínio alterado com sucesso!');
        this.router.navigate(['condominio']);
      }, error => {
        console.error(error);
        this.messageError('Ocorreu um erro no alterar condomínio.')
      }
    )
  }

  verificarBlocos(): void {
    if(this.formularioCondominio.controls['blocos'].invalid) {
      this.blocosInvalid = 'border: 2px solid red !important;';
      this.messageError('Favor adicionar pelo menos um bloco!')
    }else {
      this.blocosInvalid = ''
    }
  }

  buscarCep(cep: any) {
    if(cep && cep.target.value.length > 8) {
      this.cepService.getCep(cep.target.value).subscribe((res) => {
          if (res) {
            this.formularioCondominio.controls['endereco'].setValue(res.logradouro);
            this.formularioCondominio.controls['complemento'].setValue(res.complemento);
            this.formularioCondominio.controls['bairro'].setValue(res.bairro);
            this.formularioCondominio.controls['cidade'].setValue(res.localidade);
            this.formularioCondominio.controls['estado'].setValue(res.uf);
          }
        },
        error => {
          console.error(error);
        });
    }
  }
}

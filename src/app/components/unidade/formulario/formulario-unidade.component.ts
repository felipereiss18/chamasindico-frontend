import {Component, OnInit} from '@angular/core';
import {BasicComponent} from "../../../shared/basic-component/basic-component";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";
import {UserService} from "../../../core/auth/user/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Condominio} from "../../../models/condominio";
import {CondominioService} from "../../../services/condominio/condominio.service";
import {telefoneNumeroRepetidoValidator} from "../../../validators/telefone-repetidos/telefone-numero-repetido.validator";
import {CPFValidator} from "../../../validators/federal-code/federal-code.validator";
import {CepService} from "../../../services/cep/cep.service";
import {Estado} from "../../../models/estado";
import {EstadoService} from "../../../services/estado/estado.service";
import {Proprietario} from "../../../models/proprietario";
import {ProprietarioService} from "../../../services/proprietario/proprietario.service";
import {Usuario} from "../../../models/usuario";
import {Perfil} from "../../../core/auth/user/perfil";
import {Roles} from "../../../core/auth/user/roles.enum";
import {Unidade} from "../../../models/unidade";
import {UnidadeService} from "../../../services/unidade/unidade.service";
import {ConfirmationDialogModel} from "../../../shared/component/confirm-dialog/model/confirmation-dialog.model";
import {ConfirmDialogComponent} from "../../../shared/component/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-formulario-unidade',
  templateUrl: './formulario-unidade.component.html',
  styleUrls: ['./formulario-unidade.component.css']
})
export class FormularioUnidadeComponent extends BasicComponent implements OnInit {
  title: string;
  tipo: number;
  id: number;
  bloco: string;
  condominio: Condominio = new Condominio();
  unidade: Unidade = new Unidade();
  visualizar: boolean;
  formProprietario: FormGroup;
  estados: Estado[] = [];
  proprietario = new Proprietario();
  private idCondominio: number;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly activeRoute: ActivatedRoute,
    private unidadeService: UnidadeService,
    private condominioService: CondominioService,
    private cepService: CepService,
    private estadoService: EstadoService,
    private proprietarioService: ProprietarioService,
    spinnerService: NgxSpinnerService,
    snotifyService: SnotifyService,
    userService: UserService,
    private dialog: MatDialog
  ) {
    super(spinnerService, snotifyService, userService)

    this.title = activeRoute.snapshot.data['title'] + ' Unidade';
    this.tipo = activeRoute.snapshot.data['tipo'];
    this.id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    this.bloco = this.activeRoute.snapshot.paramMap.get('bloco')+'';
    this.idCondominio = Number(this.activeRoute.snapshot.paramMap.get('idCondominio'));

    this.visualizar = this.tipo === 2;

    this.condominioService.findOne(this.idCondominio).subscribe(
      res => {
        this.condominio = res.data
      }, error => {
        console.error(error);
        this.messageError('Não foi possível carregar os dados do condomínio');
      }
    )

    this.estadoService.gets('estados').subscribe(
      (res) => {
        this.estados = res.data
      },
      (error) => {
        console.error(error);
        this.messageError('Não foi possível carregar os Estados.')
      }
    )

    this.formProprietario = formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, CPFValidator]],
      nascimento: ['', Validators.required],
      email: ['', [
                    Validators.required,
                    Validators.email,
                    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
                  ]
      ],
      telefone: ['', [Validators.required, telefoneNumeroRepetidoValidator]],
      usuario: ['', Validators.required],
      morador: [true],
      sindico: [false],
      cep: [''],
      estado: [null],
      cidade: [''],
      endereco: [''],
      bairro: [''],
      numero: [null],
      complemento: ['']
    });
  }

  ngOnInit(): void {

    this.unidadeService.get(`/${this.idCondominio}/${this.bloco}/${this.id}`).subscribe(
      res => {
        this.unidade = res.data;
      }, error => {
        console.error(error);
        this.messageError('Não foi possível carregar os dados da Unidade.')
      }
    )

    this.atualizarDados();
  }


  buscarCep(cep: any) {
    if(cep && cep.target.value.length > 8) {
      this.cepService.getCep(cep.target.value).subscribe((res) => {
          if (res) {
            this.formProprietario.controls['endereco'].setValue(res.logradouro);
            this.formProprietario.controls['complemento'].setValue(res.complemento);
            this.formProprietario.controls['bairro'].setValue(res.bairro);
            this.formProprietario.controls['cidade'].setValue(res.localidade);
            this.formProprietario.controls['estado'].setValue(res.uf);
          }
        },
        error => {
          console.error(error);
          this.messageError('Não foi possível buscar o endereço pelo CEP.')
        });
    }
  }

  async salvarProprietario() {

    if (this.proprietario.sindico !== this.formProprietario.controls.sindico.value && this.formProprietario.controls.sindico) {
      const hasSindico : any = await this.condominioService.buscarSindico(this.idCondominio).toPromise().then(
        res => {
          return res.data
        }
      ).catch(error => {
        return error.statusError;
      })
      if(hasSindico.usuario.id) {
        const dialogData =
          new ConfirmationDialogModel(
            'Confirmação',
            `Foi encontrado(a) ${hasSindico.nome} como síndico do condomínio, tem certeza que deseja alterar?`);
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          maxWidth: '450px',
          closeOnNavigation: true,
          data: dialogData
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            if (this.proprietario.usuario?.id) {
              this.editarProprietario(this.proprietario.usuario.id);
            } else {
              this.saveProprietario();
            }
          }
        })
      } else if (hasSindico === 400) {
        if (this.proprietario.usuario?.id) {
          this.editarProprietario(this.proprietario.usuario.id);
        } else {
          this.saveProprietario();
        }
      }
    } else {
      if (this.proprietario.usuario?.id) {
        this.editarProprietario(this.proprietario.usuario.id);
      } else {
        this.saveProprietario();
      }
    }
  }

  private saveProprietario() : void {
    const perfil = {} as Perfil;
    perfil.role = Roles.PROPRIE;

    this.proprietario.usuario = new Usuario(
      this.formProprietario.controls.usuario.value,
      perfil,
      true
    );
    this.proprietario.nome = this.formProprietario.controls.nome.value;
    this.proprietario.cpf = this.formProprietario.controls.cpf.value;
    this.proprietario.nascimento = new Date(this.formProprietario.controls.nascimento.value).toISOString().split('T')[0];
    this.proprietario.email = this.formProprietario.controls.email.value;
    this.proprietario.telefone = this.formProprietario.controls.telefone.value;
    this.proprietario.morador = this.formProprietario.controls.morador.value;
    this.proprietario.sindico = this.formProprietario.controls.sindico.value;
    if (!this.proprietario.morador) {
      this.proprietario.cep = this.formProprietario.controls.cep.value;
      this.proprietario.estado = new Estado(this.formProprietario.controls.estado.value);
      this.proprietario.cidade = this.formProprietario.controls.cidade.value;
      this.proprietario.endereco = this.formProprietario.controls.endereco.value;
      this.proprietario.bairro = this.formProprietario.controls.bairro.value;
      this.proprietario.numero = this.formProprietario.controls.numero.value;
      this.proprietario.complemento = this.formProprietario.controls.complemento.value;
    }

    this.proprietario.unidade = new Unidade();
    this.proprietario.unidade.id = this.id;
    this.proprietario.bloco = this.bloco;
    this.proprietario.condominio = new Condominio();
    this.proprietario.condominio.id = this.condominio.id;

    this.proprietarioService.save(this.proprietario).subscribe(
      res => {
        this.messageSucess('Proprietário salvo com sucesso.');
        this.atualizarDados();
      }, error => {
        console.error(error);
        this.messageError('Ocorreu um erro no salvar proprietário.')
      }
    )
  }

  private editarProprietario(id: number): void {

    this.proprietario.nome = this.formProprietario.controls.nome.value;
    this.proprietario.cpf = this.formProprietario.controls.cpf.value;
    this.proprietario.nascimento = new Date(this.formProprietario.controls.nascimento.value).toISOString().split('T')[0];
    this.proprietario.email = this.formProprietario.controls.email.value;
    this.proprietario.telefone = this.formProprietario.controls.telefone.value;
    this.proprietario.morador = this.formProprietario.controls.morador.value;
    this.proprietario.sindico = this.formProprietario.controls.sindico.value;
    if (!this.proprietario.morador) {
      this.proprietario.cep = this.formProprietario.controls.cep.value;
      this.proprietario.estado = new Estado(this.formProprietario.controls.estado.value);
      this.proprietario.cidade = this.formProprietario.controls.cidade.value;
      this.proprietario.endereco = this.formProprietario.controls.endereco.value;
      this.proprietario.bairro = this.formProprietario.controls.bairro.value;
      this.proprietario.numero = this.formProprietario.controls.numero.value;
      this.proprietario.complemento = this.formProprietario.controls.complemento.value;
    }

    // @ts-ignore
    this.proprietario.usuario?.nome = this.formProprietario.controls.usuario.value;

    this.proprietarioService.update(id, this.proprietario).subscribe(
      res => {
        this.messageSucess('Proprietário alterado com sucesso.');
        this.atualizarDados();
      }, error => {
        console.error(error);
        this.messageError('Ocorreu um erro no salvar proprietário.')
      }
    )
  }

  private atualizarDados() {
    this.proprietarioService.get(`/${this.idCondominio}/${this.bloco}/${this.id}`).subscribe(
      (res) => {
        this.proprietario = res.data;
        this.formProprietario.patchValue(res.data);

        if (res.data.nascimento) {
          let data = new Date(res.data.nascimento + ' ');
          this.formProprietario.controls.nascimento.setValue(data.toISOString());
        }
        this.formProprietario.controls.usuario.setValue(res.data.usuario?.nome);
        this.formProprietario.controls.estado.setValue(res.data.estado?.id);
      }, error => {
        if (error.statusError !== 400) {
          this.messageError('Não foi possível carregar os dados do Proprietário.')
          console.error(error);
        } else {
          this.messageWarning(error.message);
        }
      }
    )
  }

  novoProprietario() {
    this.proprietario = new Proprietario();
    this.formProprietario.controls.nome.setValue('');
    this.formProprietario.controls.cpf.setValue('');
    this.formProprietario.controls.nascimento.setValue('');
    this.formProprietario.controls.email.setValue('');
    this.formProprietario.controls.telefone.setValue('');
    this.formProprietario.controls.usuario.setValue('');
    this.formProprietario.controls.morador.setValue(true);
    this.formProprietario.controls.sindico.setValue(false);
    this.formProprietario.controls.cep.setValue('');
    this.formProprietario.controls.estado.setValue(null);
    this.formProprietario.controls.cidade.setValue('');
    this.formProprietario.controls.endereco.setValue('');
    this.formProprietario.controls.bairro.setValue('');
    this.formProprietario.controls.numero.setValue(null);
    this.formProprietario.controls.complemento.setValue('');
  }

  alteraSindico(checked: boolean) {
    if (!checked) {
      this.formProprietario.controls.sindico.setValue(false);
    }
  }
}

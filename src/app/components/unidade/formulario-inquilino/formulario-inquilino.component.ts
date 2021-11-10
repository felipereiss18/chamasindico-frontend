import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";
import {UserService} from "../../../core/auth/user/user.service";
import {BasicComponent} from "../../../shared/basic-component/basic-component";
import {CPFValidator} from "../../../validators/federal-code/federal-code.validator";
import {telefoneNumeroRepetidoValidator} from "../../../validators/telefone-repetidos/telefone-numero-repetido.validator";
import {MatDialog} from "@angular/material/dialog";
import {Aluguel} from "../../../models/aluguel";
import {AluguelService} from "../../../services/aluguel/aluguel.service";
import {Inquilino} from "../../../models/inquilino";
import {Usuario} from "../../../models/usuario";
import {Perfil} from "../../../core/auth/user/perfil";
import {Roles} from "../../../core/auth/user/roles.enum";
import {UnidadeService} from "../../../services/unidade/unidade.service";

@Component({
  selector: 'app-formulario-inquilino',
  templateUrl: './formulario-inquilino.component.html',
  styleUrls: ['./formulario-inquilino.component.css']
})
export class FormularioInquilinoComponent extends BasicComponent implements OnInit {

  @Input('id') id: number = 0;
  @Input('bloco') bloco: string = "";
  @Input('condominio') idCondominio: number = 0;
  @Input('visualizar') visualizar: boolean = false;
  formInquilino: FormGroup;
  columnsTableAluguel: string[] = ['dataInicio', 'dataFim', 'nome', 'cpf', 'telefone','acao'];
  alugueis: Aluguel[] = [];
  edicao: boolean = false;
  private idAluguel: number | undefined = 0;
  private idUsuario: number | undefined;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly activeRoute: ActivatedRoute,
    spinnerService: NgxSpinnerService,
    snotifyService: SnotifyService,
    userService: UserService,
    private dialog: MatDialog,
    private service: AluguelService,
    private unidadeSevice: UnidadeService,
  ) {
    super(spinnerService, snotifyService, userService)

    this.formInquilino = this.formBuilder.group({
      dataInicio: ['', [Validators.required]],
      dataFim: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required, CPFValidator]],
      nascimento: ['', [Validators.required]],
      email: ['',
              [
                Validators.required,
                Validators.email,
                Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
              ]
      ],
      telefone: ['', [Validators.required, telefoneNumeroRepetidoValidator]],
      usuario: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.edicao = false;
    this.atualizar();
  }

  salvarInquilino() {
    for (const key in this.formInquilino.controls) {
      this.formInquilino.get(key)?.updateValueAndValidity();
    }
    if(this.formInquilino.valid) {
      if (this.edicao) {
        this.edit().then(() => {
          this.atualizar();
          this.novoInquilino()
        });
      } else {
        this.save().then(() => {
          this.atualizar();
          this.novoInquilino();
        });
      }
    }
  }

  async save() {
    const perfil = {} as Perfil;
    perfil.role = Roles.INQUILINO;

    const aluguel = new Aluguel(
      this.formInquilino.controls.dataInicio.value,
      this.formInquilino.controls.dataFim.value,
      new Inquilino(
        this.formInquilino.controls.nome.value,
        this.formInquilino.controls.cpf.value,
        this.formInquilino.controls.nascimento.value,
        this.formInquilino.controls.email.value,
        this.formInquilino.controls.telefone.value,
        new Usuario(
          this.formInquilino.controls.usuario.value,
          perfil,
          true,
          this.idUsuario
        )
      )
    );

    await this.service.salvar(this.idCondominio, this.bloco, this.id, aluguel).toPromise().then(
      (res) => {
        if (res) {
          this.messageSucess('Inquílino salvo com sucesso.');
        }
      }, error => {
        console.error(error);
        this.messageError('Não foi possível salvar o aluguel.');
      }
    );
  }

  async edit() {

    const perfil = {} as Perfil;
    perfil.role = Roles.INQUILINO;

    const aluguel = new Aluguel(
      this.formInquilino.controls.dataInicio.value,
      this.formInquilino.controls.dataFim.value,
      new Inquilino(
        this.formInquilino.controls.nome.value,
        this.formInquilino.controls.cpf.value,
        this.formInquilino.controls.nascimento.value,
        this.formInquilino.controls.email.value,
        this.formInquilino.controls.telefone.value,
        new Usuario(
          this.formInquilino.controls.usuario.value,
          perfil,
          true,
          this.idUsuario
        )
      ),
    );

    await this.service.editar(this.idCondominio, this.bloco, this.id, this.idAluguel, aluguel).toPromise().then(
      res => {
        if (res) {
          this.messageSucess('Aluguel alterado com sucesso.');
        }
      }, error => {
        console.error(error);
        this.messageError('Não foi possível alterar o aluguel.')
      }
    )
  }

  novoInquilino() {
    this.edicao = false;
    this.idAluguel = undefined;
    this.idUsuario = undefined;

    for (const key in this.formInquilino.controls) {
      this.formInquilino.get(key)?.setValue('');
      this.formInquilino.get(key)?.clearValidators();
      this.formInquilino.get(key)?.updateValueAndValidity();
    }

    this.formInquilino.get('dataInicio')?.setValidators([Validators.required]);
    this.formInquilino.get('dataFim')?.setValidators([Validators.required]);
    this.formInquilino.get('nome')?.setValidators([Validators.required]);
    this.formInquilino.get('cpf')?.setValidators([Validators.required, CPFValidator]);
    this.formInquilino.get('nascimento')?.setValidators([Validators.required]);
    this.formInquilino.get('email')?.setValidators(
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
        ]
      );
    this.formInquilino.get('telefone')?.setValidators([Validators.required, telefoneNumeroRepetidoValidator]);
    this.formInquilino.get('usuario')?.setValidators([Validators.required]);

  }

  editar(aluguel: Aluguel) {
    this.edicao = true;

    this.idAluguel = aluguel.id;
    this.idUsuario = aluguel.inquilino.usuario.id;
    let data = new Date(aluguel.dataInicio + ' ');
    this.formInquilino.controls.dataInicio.setValue(data);

    data = new Date(aluguel.dataFim + ' ');
    this.formInquilino.controls.dataFim.setValue(data);

    this.formInquilino.controls.nome.setValue(aluguel.inquilino.nome);
    this.formInquilino.controls.cpf.setValue(aluguel.inquilino.cpf);

    data = new Date(aluguel.inquilino.nascimento + ' ');
    this.formInquilino.controls.nascimento.setValue(data);

    this.formInquilino.controls.email.setValue(aluguel.inquilino.email);
    this.formInquilino.controls.telefone.setValue(aluguel.inquilino.telefone);
    this.formInquilino.controls.usuario.setValue(aluguel.inquilino.usuario.nome);
  }

  private atualizar() {
    this.unidadeSevice.buscarAlugueis(this.idCondominio, this.bloco, this.id).subscribe(
      (res) => {
        this.alugueis = res.data
      },
      error => {
        if (error.statusError !== 400) {
          console.error(error);
          this.messageError('Não foi possível carregar os alugueis.')
        }
      }
    )
  }
}

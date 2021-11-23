import {Component, OnInit} from '@angular/core';
import {BasicComponent} from "../../../shared/basic-component/basic-component";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FuncionarioService} from "../../../services/funcionario/funcionario.service";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";
import {UserService} from "../../../core/auth/user/user.service";
import {MatDialog} from "@angular/material/dialog";
import {telefoneNumeroRepetidoValidator} from "../../../validators/telefone-repetidos/telefone-numero-repetido.validator";
import {CPFValidator} from "../../../validators/federal-code/federal-code.validator";
import {Funcionario} from "../../../models/funcionario";
import {Usuario} from "../../../models/usuario";

@Component({
  selector: 'app-formulario-funcionario',
  templateUrl: './formulario-funcionario.component.html',
  styleUrls: ['./formulario-funcionario.component.css']
})
export class FormularioFuncionarioComponent extends BasicComponent implements OnInit {

  formFuncionario: FormGroup;
  title: string;
  private tipo: number;
  id: number;
  visualizar: boolean;
  situacao: boolean | undefined;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly activeRoute: ActivatedRoute,
    private service: FuncionarioService,
    snipperService: NgxSpinnerService,
    snotifyService: SnotifyService,
    userService: UserService,
    private dialog: MatDialog,
  ) {
    super(snipperService, snotifyService, userService)

    this.title = `${activeRoute.snapshot.data['title']} Funcionário`;
    this.tipo = activeRoute.snapshot.data['tipo'];
    this.id = Number(this.activeRoute.snapshot.paramMap.get('id'));

    this.visualizar = this.tipo === 3;

    this.formFuncionario = formBuilder.group({
      nome: [{value: '', disabled: this.visualizar}, [Validators.required]],
      cpf: [{value: '', disabled: this.visualizar}, [Validators.required, CPFValidator]],
      nascimento: [{value: '', disabled: this.visualizar}, [Validators.required]],
      email: [{value: '', disabled: this.visualizar},
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
        ]
      ],
      telefone: [{value: '', disabled: this.visualizar}, [Validators.required, telefoneNumeroRepetidoValidator]],
      usuario: [{value: '', disabled: this.visualizar}, [Validators.required]],
    })
  }

  ngOnInit(): void {
    if (this.id) {
      this.service.findOne(this.id).subscribe(
        res => {
          this.formFuncionario.patchValue(res.data);

          if (res.data.nascimento) {
            let data = new Date(res.data.nascimento + ' ');
            this.formFuncionario.controls.nascimento.setValue(data.toISOString());
          }
          this.situacao = res.data.usuario?.situacao;
          this.formFuncionario.controls.usuario.setValue(res.data.usuario?.nome)
        },
        error => {
          this.messageError('Não foi possível carregar os dados da Área Comum.');
          console.error(error);
        }
      );
    }
  }

  salvar() {
    const funcionario = new Funcionario(
      new Usuario(
        this.formFuncionario.controls.usuario.value,
        undefined,
        undefined
      ),
      this.formFuncionario.controls.nome.value,
      this.formFuncionario.controls.cpf.value,
      this.formFuncionario.controls.nascimento.value,
      this.formFuncionario.controls.email.value,
      this.formFuncionario.controls.telefone.value,
      undefined
    );

    if(this.id){
      this.edit(this.id, funcionario);
    }else {
      this.save(funcionario);
    }
  }

  private edit(id: number, funcionario: Funcionario) {
    this.service.update(id, funcionario).subscribe(
      res => {
        this.messageSucess('Funcionário alterado com sucesso.');
        this.router.navigate(['funcionario']);
      }, error => {
        console.error(error);
        this.messageError('Não foi possível alterar o funcionário.')
      }
    )
  }

  private save(funcionario: Funcionario) {
    this.service.save(funcionario).subscribe(
      res => {
        this.messageSucess('Funcionário salvo com sucesso.');
        this.router.navigate(['funcionario']);
      }, error => {
        this.messageError('Não foi possível salvar o funcionário.');
        console.error(error);
      }
    )
  }
}

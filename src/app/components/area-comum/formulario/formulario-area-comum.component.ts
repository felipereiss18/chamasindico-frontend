import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../core/auth/user/user.service";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";
import {BasicComponent} from "../../../shared/basic-component/basic-component";
import {Bloco} from "../../../models/bloco";
import {AreaComumService} from "../../../services/area-comum/area-comum.service";
import {CondominioService} from "../../../services/condominio/condominio.service";
import {convertEnumDiaSemanaToArray} from "../../../utils/convert.util";
import {MatRadioChange} from "@angular/material/radio";
import {AreaComum} from "../../../models/area-comum";

@Component({
  selector: 'app-formulario-area-comum',
  templateUrl: './formulario-area-comum.component.html',
  styleUrls: ['./formulario-area-comum.component.css']
})
export class FormularioAreaComumComponent extends BasicComponent implements OnInit {

  formAreaComum: FormGroup;
  title: string;
  private tipo: number;
  id: number;
  tiposReserva = [
    {id: 1, descricao: 'Por Dia'},
    {id: 2, descricao: 'Por Hora'},
    {id: 3, descricao: 'Apenas Informativo'},
  ];
  tiposConfirmacao = [
    {id: 1, descricao: 'Alerta Por E-mail'},
    {id: 2, descricao: 'Requer Confirmação'},
    {id: 3, descricao: 'Não é necessário'},
  ];

  blocos: Bloco[] = [];
  diasSemanas: [{id: number, descricao: string, value: boolean}];
  diasFuncionamentoInvalid: string = '';
  requiredLocacao: boolean = false;
  visualizar: boolean;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly activeRoute: ActivatedRoute,
    private service: AreaComumService,
    private condominioService: CondominioService,
    userService: UserService,
    spinnerService: NgxSpinnerService,
    snotifyService: SnotifyService,
  ) {
    super(spinnerService, snotifyService, userService);

    this.title = activeRoute.snapshot.data['title'] + ' Área Comum';
    this.tipo = activeRoute.snapshot.data['tipo'];
    this.id = Number(this.activeRoute.snapshot.paramMap.get('id'));

    this.visualizar = this.tipo === 3;

    this.formAreaComum = formBuilder.group({
      bloco: [{value: '', disabled: this.visualizar}],
      nome: [{value: '', disabled: this.visualizar}, Validators.required],
      locacao: [{value: null, disabled: this.visualizar}, Validators.required],
      inicial: [{value: '', disabled: this.visualizar}, []],
      fim: [{value: '', disabled: this.visualizar}, []],
      tipoReserva: [{value: '', disabled: this.visualizar}, []],
      tipoConfirmacao: [{value: '', disabled: this.visualizar}, []],
      limpeza: [{value: '', disabled: this.visualizar}],
      anotacao: [{value: '', disabled: this.visualizar}],
      diasFuncionamento: this.formBuilder.array([])
    })

    this.diasSemanas = convertEnumDiaSemanaToArray();

    condominioService.buscarBlocos(12).subscribe(
      res => this.blocos = res.data,
      error => {
        console.error(error);
        this.messageError('Não foi possível carregar os blocos.')
      })

  }

  ngOnInit(): void {
    if (this.id) {
      this.service.findOne(this.id).subscribe(
        res => {
          this.formAreaComum.patchValue(res.data);
          this.formAreaComum.controls.bloco.setValue(res.data.bloco?.id);
          res.data.diasFuncionamento?.forEach(d => {
            const diaSemana = <FormArray> this.formAreaComum.get('diasFuncionamento') as FormArray;
            diaSemana.push(new FormControl((d)));
            this.diasSemanas.forEach(dia => {
              if (dia.id === d) {
                dia.value = true;
              }
            });
          })
          console.log(this.formAreaComum)
        },
        error => {
          this.messageError('Não foi possível carregar os dados da Área Comum.');
          console.error(error);
        }
      );
    }
  }

  onChangeDiaSemana(event: any) {
    const diaSemana = <FormArray>this.formAreaComum.get('diasFuncionamento') as FormArray;
    const valor = Number(event.source.value);

    if(event.checked) {
      diaSemana.push(new FormControl((valor)));
      this.diasFuncionamentoInvalid = '';
    } else {
      const d = diaSemana.controls.findIndex(x => x.value === valor);
      diaSemana.removeAt(d);
      if(diaSemana.length === 0) {
        this.diasFuncionamentoInvalid = 'border: 2px solid red !important;';
      }
    }
  }

  salvar() {
    this.formAreaComum.markAllAsTouched();

    if (this.formAreaComum.valid) {
      const areaComum = new AreaComum(
        {id: this.getUser().condominio},
        undefined,
        this.formAreaComum.controls.nome.value,
        this.formAreaComum.controls.locacao.value,
        this.formAreaComum.controls.tipoReserva.value,
        this.formAreaComum.controls.tipoConfirmacao.value,
        true,
        this.formAreaComum.controls.inicial.value,
        this.formAreaComum.controls.fim.value,
        this.formAreaComum.controls.limpeza.value,
        this.formAreaComum.controls.anotacao.value,
        this.formAreaComum.controls.diasFuncionamento.value
      );

      if (this.formAreaComum.controls.bloco.value !== null) {
        areaComum.bloco = {id: this.formAreaComum.controls.bloco.value};
      }

      if(this.id){
        this.edit(this.id, areaComum);
      }else {
        this.save(areaComum);
      }
    }

  }

  private save(areaComum: AreaComum) {
    this.service.save(areaComum).subscribe(
      res => {
        this.messageSucess('Área Comum salva com sucesso.');
        this.router.navigate(['area-comum']);
      }, error => {
        this.messageError('Não foi possível salvar a área comum.');
        console.error(error);
      }
    )
  }

  private edit(id: number, areaComum: AreaComum) {
    this.service.update(id, areaComum).subscribe(
      res => {
        this.messageSucess('Área Comum alterada com sucesso.');
        this.router.navigate(['area-comum']);
      }, error => {
        console.error(error);
        this.messageError('Ocorreu um erro no alterar área comum.')
      }
    )
  }

  onChangeLocacao($event: MatRadioChange) {

    this.requiredLocacao = Boolean(JSON.parse($event.value))

    if (this.requiredLocacao) {
      this.formAreaComum.controls['inicial'].setValidators([Validators.required]);
      this.formAreaComum.controls['inicial'].updateValueAndValidity();
      this.formAreaComum.controls['fim'].setValidators([Validators.required]);
      this.formAreaComum.controls['fim'].updateValueAndValidity();
      this.formAreaComum.controls['tipoReserva'].setValidators([Validators.required]);
      this.formAreaComum.controls['tipoReserva'].updateValueAndValidity();
      this.formAreaComum.controls['tipoConfirmacao'].setValidators([Validators.required]);
      this.formAreaComum.controls['tipoConfirmacao'].updateValueAndValidity();
      this.formAreaComum.controls['diasFuncionamento'].setValidators([Validators.required]);
      this.formAreaComum.controls['diasFuncionamento'].updateValueAndValidity();
      this.diasFuncionamentoInvalid = 'border: 2px solid red !important;';
    } else {
      this.formAreaComum.controls['inicial'].clearValidators();
      this.formAreaComum.controls['inicial'].updateValueAndValidity();
      this.formAreaComum.controls['fim'].clearValidators();
      this.formAreaComum.controls['fim'].updateValueAndValidity();
      this.formAreaComum.controls['tipoReserva'].clearValidators();
      this.formAreaComum.controls['tipoReserva'].updateValueAndValidity();
      this.formAreaComum.controls['tipoConfirmacao'].clearValidators();
      this.formAreaComum.controls['tipoConfirmacao'].updateValueAndValidity();
      this.formAreaComum.controls['diasFuncionamento'].clearValidators();
      this.formAreaComum.controls['diasFuncionamento'].updateValueAndValidity();
      this.diasFuncionamentoInvalid = '';
    }
  }
}

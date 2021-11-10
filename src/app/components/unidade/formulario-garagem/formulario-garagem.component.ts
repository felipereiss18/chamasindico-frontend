import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";
import {UserService} from "../../../core/auth/user/user.service";
import {UnidadeService} from "../../../services/unidade/unidade.service";
import {BasicComponent} from "../../../shared/basic-component/basic-component";
import {Garagem} from "../../../models/Garagem";

@Component({
  selector: 'app-formulario-garagem',
  templateUrl: './formulario-garagem.component.html',
  styleUrls: ['./formulario-garagem.component.css']
})
export class FormularioGaragemComponent extends BasicComponent implements OnInit {

  @Input('id') id: number = 0;
  @Input('bloco') bloco: string = "";
  @Input('condominio') idCondominio: number = 0;
  @Input('visualizar') visualizar: boolean = false;

  formGaragem: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly activeRoute: ActivatedRoute,
    spinnerService: NgxSpinnerService,
    snotifyService: SnotifyService,
    userService: UserService,
    private service: UnidadeService,
  ) {
    super(spinnerService, snotifyService, userService);

    this.formGaragem = formBuilder.group({
      numero: ['', [Validators.required]],
      placa: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      anoFabricacao: ['', [Validators.required]],
      anoModelo: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.service.buscarGaragem(this.idCondominio, this.bloco, this.id).subscribe(
      (res) => {
        this.formGaragem.patchValue(res.data)
      }, error => {
        console.error(error);
        this.messageError('Não foi possível carregar os dados da garagem.')
      }
    )
  }

  salvar(): void {

    if(this.formGaragem.valid){
      const garagem = new Garagem(
        this.formGaragem.controls.numero.value,
        this.formGaragem.controls.placa.value,
        this.formGaragem.controls.marca.value,
        this.formGaragem.controls.modelo.value,
        this.formGaragem.controls.anoFabricacao.value,
        this.formGaragem.controls.anoModelo.value
      );

      this.service.salvarGaragem(this.idCondominio, this.bloco, this.id, garagem).subscribe(
        (res) =>{
          this.messageSucess('Garagem salva com sucesso.');
        }, error => {
          console.error(error);
          this.messageError('Não foi possível salvar a garagem.');
        }
      )
    }
  }
}

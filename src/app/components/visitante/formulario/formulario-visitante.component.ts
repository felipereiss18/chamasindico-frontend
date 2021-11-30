import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CPFValidator} from "../../../validators/federal-code/federal-code.validator";
import {telefoneNumeroRepetidoValidator} from "../../../validators/telefone-repetidos/telefone-numero-repetido.validator";
import {VisitanteService} from "../../../services/visitante/visitante.service";
import {BasicComponent} from "../../../shared/basic-component/basic-component";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";
import {UserService} from "../../../core/auth/user/user.service";
import {FormularioVisitanteModel} from "./model/formulario-visitante.model";

@Component({
  selector: 'app-formulario-visitante',
  templateUrl: './formulario-visitante.component.html',
  styleUrls: ['./formulario-visitante.component.css']
})
export class FormularioVisitanteComponent extends BasicComponent implements OnInit {

  formVisitante: FormGroup;
  title: string;

  constructor(
    private formBuilder: FormBuilder,
    private service: VisitanteService,
    public dialogRef: MatDialogRef<FormularioVisitanteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    snipperService: NgxSpinnerService,
    snotifyService: SnotifyService,
    userService: UserService,
  ) {
    super(snipperService, snotifyService, userService);
    this.formVisitante = this.formBuilder.group({
      documento: ['', [Validators.required, CPFValidator]],
      nome: ['', Validators.required],
      telefone: ['', [Validators.required, telefoneNumeroRepetidoValidator]]
    })

    this.title = 'Cadastrar Visitante'
  }

  ngOnInit(): void {
    if (this.data) {

      this.formVisitante.controls.documento.disable();
      this.title = 'Alterar Visitante'

      this.service.findOne(this.data).subscribe(
        (res) => {
          this.formVisitante.patchValue(res.data)
        }, error => {
          console.error(error);

        }
      )
    }
  }

  onConfirm(): void {
    if (this.formVisitante.valid) {
      this.dialogRef.close(new FormularioVisitanteModel(
        true,
        this.formVisitante.controls.nome.value,
        this.formVisitante.controls.documento.value,
        this.formVisitante.controls.telefone.value
      ));
    }
  }

  onCancel(): void {
    this.dialogRef.close(new FormularioVisitanteModel(false, '', '', ''));
  }

}

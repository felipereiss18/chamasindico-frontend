import {Component, Inject, OnInit} from '@angular/core';
import {BasicComponent} from "../../../shared/basic-component/basic-component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AreaComumService} from "../../../services/area-comum/area-comum.service";
import {AgendaService} from "../../../services/agenda/agenda.service";
import {UserService} from "../../../core/auth/user/user.service";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormularioAgendamentoModel} from "./model/formulario-agendamento.model";
import {Editor, Toolbar} from "ngx-editor";
import {AreaComum} from "../../../models/area-comum";
import {Agenda} from "../../../models/agenda";

@Component({
  selector: 'app-formulario-agendamento',
  templateUrl: './formulario-agendamento.component.html',
  styleUrls: ['./formulario-agendamento.component.css']
})
export class FormularioAgendamentoComponent extends BasicComponent implements OnInit {
  title: string;
  formAgendamento: FormGroup;
  areaComuns: AreaComum[] = [];
  dataMinima = new Date();
  mostrarCamposHora = true;

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
  horaMinima: string = '00:00';
  horaMaxima: string = '24:00';

  constructor(
    private readonly formBuilder: FormBuilder,
    private areaComumService: AreaComumService,
    private service: AgendaService,
    public dialogRef: MatDialogRef<FormularioAgendamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public dado: FormularioAgendamentoModel,
    userService: UserService,
    spinnerService: NgxSpinnerService,
    snotifyService: SnotifyService,
  ) {
    super(spinnerService, snotifyService, userService);

    this.title = dado.title + ' Agendamento';

    this.formAgendamento = this.formBuilder.group({
      areaComum: ['', [Validators.required]],
      data: [{value: this.dado.data, disabled: this.dado.visualizar}, [Validators.required]],
      inicio: [{value: '', disabled: this.dado.visualizar}, [Validators.required]],
      termino: [{value: '', disabled: this.dado.visualizar}, [Validators.required]],
      observacao: [{value: '', disabled: this.dado.visualizar}],
    });

    this.editor = new Editor();
  }

  ngOnInit(): void {
    this.areaComumService.buscarPorLocacao().subscribe(
      (res) => {
        this.areaComuns = res.data;
      }, error => {
        this.messageError("Não foi possível carregar as Áreas Comuns");
      }
    )

    if (this.dado.id) {
      this.service.findOne(this.dado.id).subscribe(
        (res) => {
          if(res.data) {
            this.formAgendamento.patchValue(res.data);
            this.formAgendamento.controls.data.setValue(new Date(res.data.data+' '))

            this.formAgendamento.controls.areaComum.setValue(res.data.areaComum?.id);
            this.mostrarCamposHora = !(res.data.areaComum?.tipoReserva && res.data.areaComum.tipoReserva === 1);
          }
        }, error => {
          console.error(error);
          this.messageError("Não foi possível carregar os dados do agendamento.");
          this.onCancel();
        }
      )

    }
  }

  salvar() {
    if (this.formAgendamento.valid) {
      const agenda = new Agenda();
      agenda.areaComum = new AreaComum();
      agenda.areaComum.id = this.formAgendamento.controls.areaComum.value;
      agenda.data = this.formAgendamento.controls.data.value;
      agenda.inicio = this.formAgendamento.controls.inicio.value;
      agenda.termino = this.formAgendamento.controls.termino.value;
      agenda.observacao = this.formAgendamento.controls.observacao.value;

      if (this.dado.id) {
        this.service.update(this.dado.id, agenda).subscribe(
          (res) => {
            if (res) {
              this.messageSucess('Agendamento alterado com sucesso.')
              this.dialogRef.close(true);
            }
          }, error => {
            console.error(error);
            if(error.statusError === 400){
              this.messageError(error.message)
            }else {
              this.messageError('Erro ao alterar o agendamento.')
            }
          }
        );
      } else {
        this.service.save(agenda).subscribe(
          (res) => {
            if (res) {
              this.messageSucess('Agendamento cadastrado com sucesso.')
              this.dialogRef.close(true);
            }
          }, error => {
            console.error(error);
            if(error.statusError === 400){
              this.messageError(error.message)
            }else {
              this.messageError('Erro ao cadastrar o agendamento.')
            }
          }
        );
      }
    }
  }

  selecionarAreaComum(id: number) {
    const areaComum = this.areaComuns.find(a => a.id === id);

    if(areaComum) {
      this.mostrarCamposHora = !(areaComum.tipoReserva && areaComum.tipoReserva === 1);
      this.horaMaxima = areaComum.fim?.hours+":"+areaComum.fim?.minutes;
      this.horaMinima = areaComum.inicial?.hours+":"+areaComum.inicial?.minutes;

      if(!this.mostrarCamposHora) {
        this.formAgendamento.controls.inicio.setValue('');
        this.formAgendamento.controls.inicio.clearValidators();
        this.formAgendamento.controls.inicio.updateValueAndValidity();
        this.formAgendamento.controls.termino.setValue('');
        this.formAgendamento.controls.termino.clearValidators();
        this.formAgendamento.controls.termino.updateValueAndValidity();
      }else {
        this.formAgendamento.controls.inicio.setValidators(Validators.required);
        this.formAgendamento.controls.inicio.updateValueAndValidity();
        this.formAgendamento.controls.termino.setValidators(Validators.required);
        this.formAgendamento.controls.termino.updateValueAndValidity();
      }
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}

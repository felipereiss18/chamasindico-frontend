import {Component, OnInit} from '@angular/core';
import {BasicComponent} from "../../../shared/basic-component/basic-component";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";
import {UserService} from "../../../core/auth/user/user.service";
import {Editor, Toolbar} from "ngx-editor";
import {Comunicado} from "../../../models/Comunicado";
import {ComunicadoService} from "../../../services/comunicado/comunicado.service";

@Component({
  selector: 'app-formulario-comunicado',
  templateUrl: './formulario-comunicado.component.html',
  styleUrls: ['./formulario-comunicado.component.css']
})
export class FormularioComunicadoComponent extends BasicComponent implements OnInit {

  formComunicado: FormGroup;
  title: string;
  private tipo: number;
  id: number;
  visualizar: boolean;

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

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly activeRoute: ActivatedRoute,
    private service: ComunicadoService,
    snipperService: NgxSpinnerService,
    snotifyService: SnotifyService,
    userService: UserService,
  ) {
    super(snipperService, snotifyService, userService);

    this.title = `${activeRoute.snapshot.data['title']} Comunicado`;
    this.tipo = activeRoute.snapshot.data['tipo'];
    this.id = Number(this.activeRoute.snapshot.paramMap.get('id'));

    this.visualizar = this.tipo === 3;

    this.formComunicado = formBuilder.group(
      {
        data: [{value: (new Date()).toISOString(), disabled: true}],
        vencimento: [{value: '', disabled: this.visualizar}, [Validators.required]],
        titulo: [{value: '', disabled: this.visualizar}, [Validators.required, Validators.max(45)]],
        corpo: [{value: '', disabled: this.visualizar}, [Validators.required]]
      }
    )

    this.editor = new Editor();
  }

  ngOnInit(): void {
    if(this.id) {
      this.service.findOne(this.id).subscribe(
        (res) => {
          if (res.data) {
            this.formComunicado.patchValue(res.data);

            let data;
            if (res.data.vencimento) {
              data = new Date(res.data.vencimento + ' ');
              this.formComunicado.controls.vencimento.setValue(data.toISOString());
            }
            if (res.data.data) {
              data = new Date(res.data.data + ' ');
              this.formComunicado.controls.data.setValue(data.toISOString());
            }
          }
        }, error => {
          console.error(error);
          this.messageError('Não foi possível carregar os dados do comunicado.')
        }
      )
    }
  }

  salvar() {

    if(this.formComunicado.valid) {
      if(this.id && this.id > 0) {
        this.edit();
      }else {
        this.save();
      }
    }

  }

  private edit() {
    const comunicado = new Comunicado(
      this.formComunicado.controls.data.value,
      this.formComunicado.controls.vencimento.value,
      this.formComunicado.controls.titulo.value,
      this.formComunicado.controls.corpo.value,
      this.id
    );

    this.service.update(this.id, comunicado).subscribe(
      (res) => {
        this.messageSucess('Comunicado alterado com sucesso.')
      }, error => {
        console.error(error);
        this.messageError('Não foi possível alterar o comunidado.')
      }
    )
  }

  private save() {
    const comunicado = new Comunicado(
      this.formComunicado.controls.data.value,
      this.formComunicado.controls.vencimento.value,
      this.formComunicado.controls.titulo.value,
      this.formComunicado.controls.corpo.value
    )

    this.service.save(comunicado).subscribe(
      (res) => {
        if (res.data) {
          this.id = res.data;
        }
        this.messageSucess('Comunicado salvo com sucesso.')
      }, error => {
        console.error(error);
        this.messageError('Não foi possível salvar o comunidado.')
      }
    )
  }

  enviar() {
    if (this.id && this.verificarDataVencimento()) {
      this.service.enviar(this.id).subscribe(
        (res) => {
          this.messageSucess('Comunicado enviado com sucesso.');
        }, error => {
          console.error(error);
          this.messageError('Não foi possível enviar o comunicado.');
        }
      );
    }
  }

  verificarDataVencimento(): boolean {
    const data = new Date();

    const vencimento = new Date(this.formComunicado.controls.vencimento.value);

    return vencimento >= data;
  }
}

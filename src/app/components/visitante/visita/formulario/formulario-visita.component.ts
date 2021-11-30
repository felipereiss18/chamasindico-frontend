import {Component, OnInit} from '@angular/core';
import {BasicComponent} from "../../../../shared/basic-component/basic-component";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {SnotifyService} from "ng-snotify";
import {UserService} from "../../../../core/auth/user/user.service";
import {VisitanteService} from "../../../../services/visitante/visitante.service";
import {UnidadeService} from "../../../../services/unidade/unidade.service";
import {Unidade} from "../../../../models/unidade";
import {CondominioService} from "../../../../services/condominio/condominio.service";
import {Bloco} from "../../../../models/bloco";
import {CPFValidator} from "../../../../validators/federal-code/federal-code.validator";
import {MatDialog} from "@angular/material/dialog";
import {FormularioVisitanteComponent} from "../../formulario/formulario-visitante.component";
import {Visitante} from "../../../../models/visitante";
import {Visita} from "../../../../models/visita";

@Component({
  selector: 'app-formulario-visita',
  templateUrl: './formulario-visita.component.html',
  styleUrls: ['./formulario-visita.component.css']
})
export class FormularioVisitaComponent extends BasicComponent implements OnInit {

  formVisitante: FormGroup;
  title: string;
  private tipo: number;
  id: number;
  visualizar: boolean;
  unidades: Unidade[] =[];
  blocos: Bloco[] = [];

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly activeRoute: ActivatedRoute,
    private service: VisitanteService,
    private condominioService: CondominioService,
    private unidadeService: UnidadeService,
    snipperService: NgxSpinnerService,
    snotifyService: SnotifyService,
    userService: UserService,
    private dialog: MatDialog,
  ) {
    super(snipperService, snotifyService, userService);

    this.title = `${activeRoute.snapshot.data['title']} Visitante`;
    this.tipo = activeRoute.snapshot.data['tipo'];
    this.id = Number(this.activeRoute.snapshot.paramMap.get('id'));

    this.visualizar = this.tipo === 3;

    this.formVisitante = this.formBuilder.group({
      documento: ['', [Validators.required, CPFValidator]],
      nome: [{value: '', disabled: true}, [Validators.required]],
      bloco: ['', Validators.required],
      unidade: ['', Validators.required],
      areaComum: [false]
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
  }

  buscarUnidade(bloco: string): void {
    if (bloco && bloco.length > 0) {
      this.unidadeService.buscarPorCondominoBloco(this.getUser().condominio, bloco).subscribe(
        (res) => {
          this.unidades = res.data
        }, error => {
          console.error(error);
          this.messageError('Não foi possível carregar as unidades.');
        }
      )
    } else {
      this.unidades = [];
    }
  }

  salvar() {
    this.formVisitante.markAllAsTouched();

    const visita = new Visita();
    visita.visitante = new Visitante();
    visita.visitante.documento = this.formVisitante.controls.documento.value;
    visita.areaComum = this.formVisitante.controls.areaComum.value;
    visita.bloco = this.formVisitante.controls.bloco.value;
    visita.unidade = this.formVisitante.controls.unidade.value;

    this.service.visitar(this.formVisitante.controls.documento.value, visita).subscribe(
      (res) => {
        this.messageSucess('Visita cadastrada com sucesso.')
        this.router.navigate(['visitante'])
      }, error => {
        console.error(error);
        this.messageError('Erro ao cadastrar a visita.');
      }
    )

  }

  buscarVisitante($event: any) {
    if($event.target?.value) {
      this.pesquisarVisitante($event.target.value);
    }
  }

  pesquisarVisitante(documento: string) {
    documento = documento.replace(/[^0-9]/g,'')
    if(documento && documento.length === 11) {
      this.service.findOne(documento).subscribe(
        (res) => {
          this.formVisitante.controls.nome.setValue(res.data.nome)
        }, error => {
          console.error(error);
          this.messageWarning(error.message)
        }
      )
    }
  }

  adicionarVisitante() {
    const dialogRef = this.dialog.open(FormularioVisitanteComponent, {
      maxWidth: '800px',
      closeOnNavigation: true,
      data: undefined
    });

    dialogRef.afterClosed().subscribe( (result) => {
      if(result.confirmacao) {

        const visitante = new Visitante();
        visitante.documento = result.documento;
        visitante.nome = result.nome;
        visitante.telefone = result.telefone;

        this.service.save(visitante).subscribe(
          (res) => {
            this.messageSucess('Visitante salvo com sucesso.');
          }, error => {
            console.error(error);
            this.messageError('Erro ao salvar o visitante.');
          }
        )
      }
    })
  }
}

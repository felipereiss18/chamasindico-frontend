import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {NgxMaskModule} from "ngx-mask";
import {NgxEditorModule} from "ngx-editor";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {ListaVisitanteComponent} from './lista/lista-visitante.component';
import {FormularioVisitanteComponent} from './formulario/formulario-visitante.component';
import {FormularioVisitaComponent} from './visita/formulario/formulario-visita.component';
import {VisitanteRoutingModule} from "./visitante-routing.module";
import { ListaVisitaComponent } from './visita/lista/lista-visita.component';


@NgModule({
  declarations: [
    ListaVisitanteComponent,
    FormularioVisitanteComponent,
    FormularioVisitaComponent,
    ListaVisitaComponent
  ],
  exports: [

  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxMaskModule.forRoot({}),
    NgxEditorModule,
    MatDatepickerModule,
    FontAwesomeModule,
    MatSlideToggleModule,
    VisitanteRoutingModule,
    VisitanteRoutingModule,
  ]
})
export class VisitanteModule { }

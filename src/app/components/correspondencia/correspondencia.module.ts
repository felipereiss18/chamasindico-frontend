import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";
import {NgxMaskModule} from "ngx-mask";
import {NgxEditorModule} from "ngx-editor";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {CorrespondenciaRoutingModule} from "./correspondencia-routing.module";
import { ListaCorrespondenciaComponent } from './lista/lista-correspondencia.component';
import { FormularioCorrespondenciaComponent } from './formulario/formulario-correspondencia.component';
import { AtivosCorrespondenciaComponent } from './ativos/ativos-correspondencia.component';

@NgModule({
  declarations: [
    ListaCorrespondenciaComponent,
    FormularioCorrespondenciaComponent,
    AtivosCorrespondenciaComponent
  ],
  exports: [
    AtivosCorrespondenciaComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxMaskModule.forRoot({}),
    NgxEditorModule,
    MatDatepickerModule,
    FontAwesomeModule,
    MatSlideToggleModule,
    CorrespondenciaRoutingModule,
  ]
})
export class CorrespondenciaModule{}

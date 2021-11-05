import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {NgxMaskModule} from "ngx-mask";
import {NgxEditorModule} from "ngx-editor";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {ListaUnidadeComponent} from './lista/lista-unidade.component';
import {UnidadeRoutingModule} from "./unidade-routing.module";
import { FormularioUnidadeComponent } from './formulario/formulario-unidade.component';


@NgModule({
  declarations: [
    ListaUnidadeComponent,
    FormularioUnidadeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxMaskModule.forRoot({}),
    NgxEditorModule,
    MatDatepickerModule,
    UnidadeRoutingModule,
    FontAwesomeModule,
    MatSlideToggleModule,
  ]
})
export class UnidadeModule { }

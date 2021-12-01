import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {NgxMaskModule} from "ngx-mask";
import {NgxEditorModule} from "ngx-editor";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AreaComumRoutingModule} from "./area-comum-routing.module";
import {ListaAreaComumComponent} from './lista/lista-area-comum.component';
import {FormularioAreaComumComponent} from './formulario/formulario-area-comum.component';


@NgModule({
  declarations: [
    ListaAreaComumComponent,
    FormularioAreaComumComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxMaskModule.forRoot({}),
    NgxEditorModule,
    FontAwesomeModule,
    AreaComumRoutingModule,
  ],
})
export class AreaComumModule { }

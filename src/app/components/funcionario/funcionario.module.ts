import {NgModule} from "@angular/core";
import {ListaFuncionarioComponent} from "./lista/lista-funcionario.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";
import {NgxMaskModule} from "ngx-mask";
import {NgxEditorModule} from "ngx-editor";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FuncionarioRoutingModule} from "./funcionario-routing.module";
import { FormularioFuncionarioComponent } from './formulario/formulario-funcionario.component';

@NgModule({
  declarations: [
    ListaFuncionarioComponent,
    FormularioFuncionarioComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxMaskModule.forRoot({}),
    NgxEditorModule,
    MatDatepickerModule,
    FuncionarioRoutingModule,
    FontAwesomeModule,
    MatSlideToggleModule,
  ]
})
export class FuncionarioModule {}

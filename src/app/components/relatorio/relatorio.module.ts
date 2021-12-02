import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";
import {NgxMaskModule} from "ngx-mask";
import {NgxEditorModule} from "ngx-editor";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TelaPrincipalRelatorioComponent} from './tela-principal/tela-principal-relatorio.component';
import {RelatorioRoutingModule} from "./relatorio-routing.module";
import {MatRippleModule} from "@angular/material/core";
import { OcorrenciaRelatorioComponent } from './ocorrencia/ocorrencia-relatorio.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";

@NgModule({
  declarations: [
    TelaPrincipalRelatorioComponent,
    OcorrenciaRelatorioComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    SharedModule,
    NgxMaskModule.forRoot({}),
    NgxEditorModule,
    FontAwesomeModule,
    RelatorioRoutingModule,
    MatRippleModule,
    NgxChartsModule
  ]
})
export class RelatorioModule {

}

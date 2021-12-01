import {NgModule} from "@angular/core";
import {TelaInicialComponent} from "./common/tela-inicial/tela-inicial.component";
import {TelaInicialRoutingModule} from "./tela-inicial-routing.module";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";
import {NgxMaskModule} from "ngx-mask";
import {NgxEditorModule} from "ngx-editor";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ComunicadoModule} from "../comunicado/comunicado.module";
import {CorrespondenciaModule} from "../correspondencia/correspondencia.module";
import {OcorrenciaModule} from "../ocorrencia/ocorrencia.module";
import {AgendamentoModule} from "../agendamento/agendamento.module";

@NgModule({
  declarations: [
    TelaInicialComponent
  ],
    imports: [
        TelaInicialRoutingModule,
        CommonModule,
        SharedModule,
        NgxMaskModule.forRoot({}),
        NgxEditorModule,
        MatDatepickerModule,
        ComunicadoModule,
        CorrespondenciaModule,
        OcorrenciaModule,
        AgendamentoModule
    ],
})
export class TelaInicialModule {

}

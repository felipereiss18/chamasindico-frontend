import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {NgxMaskModule} from "ngx-mask";
import {NgxEditorModule} from "ngx-editor";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AgendamentoRoutingModules} from "./agendamento-routing.modules";
import {ListaAgendamentoComponent} from "./lista/lista-agendamento.component";
import { FormularioAgendamentoComponent } from './formulario/formulario-agendamento.component';
import { PendenteConfirmacaoAgendamentoComponent } from './pendente-confirmacao/pendente-confirmacao-agendamento.component';

@NgModule({
  declarations: [
    ListaAgendamentoComponent,
    FormularioAgendamentoComponent,
    PendenteConfirmacaoAgendamentoComponent
  ],
  exports: [
    PendenteConfirmacaoAgendamentoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxMaskModule.forRoot({}),
    NgxEditorModule,
    FontAwesomeModule,
    AgendamentoRoutingModules
  ]
})
export class AgendamentoModule { }

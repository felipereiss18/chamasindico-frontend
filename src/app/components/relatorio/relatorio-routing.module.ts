import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TelaPrincipalRelatorioComponent} from "./tela-principal/tela-principal-relatorio.component";
import {OcorrenciaRelatorioComponent} from "./ocorrencia/ocorrencia-relatorio.component";
import {AgendamentoRelatorioComponent} from "./agendamento/agendamento-relatorio.component";
import {CorrespondenciaRelatorioComponent} from "./correspondencia/correspondencia-relatorio.component";

export const routes: Routes = [
  {
    path: '',
    component: TelaPrincipalRelatorioComponent
  },
  {
    path: 'ocorrencia',
    component: OcorrenciaRelatorioComponent
  },
  {
    path: 'agendamento',
    component: AgendamentoRelatorioComponent
  },
  {
    path: 'correspondencia',
    component: CorrespondenciaRelatorioComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioRoutingModule{
}

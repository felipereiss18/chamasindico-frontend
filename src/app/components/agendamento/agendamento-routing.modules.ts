import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ListaAgendamentoComponent} from "./lista/lista-agendamento.component";

export const routes: Routes = [
  {
    path: '',
    component: ListaAgendamentoComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendamentoRoutingModules {

}

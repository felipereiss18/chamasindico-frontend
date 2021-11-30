import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ListaVisitanteComponent} from "./lista/lista-visitante.component";
import {FormularioVisitanteComponent} from "./formulario/formulario-visitante.component";
import {FormularioVisitaComponent} from "./visita/formulario/formulario-visita.component";

export const routes: Routes = [
  {
    path: '',
    component: ListaVisitanteComponent
  },
  {
    path: 'adicionar',
    component: FormularioVisitaComponent,
    data: {tipo: 1, title: 'Cadastrar'}
  },
  {
    path: 'editar/:id',
    component: FormularioVisitanteComponent,
    data: {tipo: 2, title: 'Alterar'}
  },
  {
    path: 'detalhar/:id',
    component: FormularioVisitanteComponent,
    data: {tipo: 3, title: 'Visualizar'}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitanteRoutingModule {
}

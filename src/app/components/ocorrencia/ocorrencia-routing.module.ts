import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ListaOcorrenciaComponent} from "./lista/lista-ocorrencia.component";
import {FormularioOcorrenciaComponent} from "./formulario/formulario-ocorrencia.component";

export const routes: Routes = [
  {
    path: '',
    component: ListaOcorrenciaComponent
  },
  {
    path: 'adicionar',
    component: FormularioOcorrenciaComponent,
    data: {tipo: 1, title: 'Cadastrar'}
  },
  {
    path: 'editar/:id',
    component: FormularioOcorrenciaComponent,
    data: {tipo: 2, title: 'Alterar'}
  },
  {
    path: 'detalhar/:id',
    component: FormularioOcorrenciaComponent,
    data: {tipo: 3, title: 'Visualizar'}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OcorrenciaRoutingModule {
}

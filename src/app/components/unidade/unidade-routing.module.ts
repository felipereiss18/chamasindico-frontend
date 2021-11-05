import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ListaUnidadeComponent} from "./lista/lista-unidade.component";
import {FormularioUnidadeComponent} from "./formulario/formulario-unidade.component";

export const routes: Routes = [
  {
    path: '',
    component: ListaUnidadeComponent
  },
  {
    path: 'editar/:idCondominio/:bloco/:id',
    component: FormularioUnidadeComponent,
    data: {tipo: 1, title: 'Alterar'}
  },
  {
    path: 'detalhar/:idCondominio/:bloco/:id',
    component: FormularioUnidadeComponent,
    data: {tipo: 2, title: 'Visualizar'}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadeRoutingModule { }

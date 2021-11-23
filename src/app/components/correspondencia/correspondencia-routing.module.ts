import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ListaCorrespondenciaComponent} from "./lista/lista-correspondencia.component";
import {FormularioCorrespondenciaComponent} from "./formulario/formulario-correspondencia.component";

export const routes: Routes = [
  {
    path: '',
    component: ListaCorrespondenciaComponent
  },
  {
    path: 'adicionar',
    component: FormularioCorrespondenciaComponent,
    data: {tipo: 1, title: 'Cadastrar'}
  },
  {
    path: 'editar/:id',
    component: FormularioCorrespondenciaComponent,
    data: {tipo: 2, title: 'Alterar'}
  },
  {
    path: 'detalhar/:id',
    component: FormularioCorrespondenciaComponent,
    data: {tipo: 3, title: 'Visualizar'}
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorrespondenciaRoutingModule{}

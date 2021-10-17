import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ListaAreaComumComponent} from "./lista/lista-area-comum.component";
import {FormularioAreaComumComponent} from "./formulario/formulario-area-comum.component";


export const routes: Routes = [
  {
    path: '',
    component: ListaAreaComumComponent
  },
  {
    path: 'adicionar',
    component: FormularioAreaComumComponent,
    data: {tipo: 1, title: 'Cadastrar'}
  },
  {
    path: 'editar/:id',
    component: FormularioAreaComumComponent,
    data: {tipo: 2, title: 'Alterar'}
  },
  {
    path: 'detalhar/:id',
    component: FormularioAreaComumComponent,
    data: {tipo: 3, title: 'Visualizar'}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaComumRoutingModule { }

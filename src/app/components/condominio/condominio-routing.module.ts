import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ListaCondominioComponent} from "./lista/lista-condominio.component";
import {FormularioCondominioComponent} from "./formulario/formulario-condominio.component";

export const routes: Routes = [
  {
    path: '',
    component: ListaCondominioComponent
  },
  {
    path: 'adicionar',
    component: FormularioCondominioComponent,
    data: {tipo: 1, title: 'Cadastrar'}
  },
  {
    path: 'editar/:id',
    component: FormularioCondominioComponent,
    data: {tipo: 2, title: 'Alterar'}
  },
  {
    path: 'detalhar/:id',
    component: FormularioCondominioComponent,
    data: {tipo: 3, title: 'Visualizar'}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CondominioRoutingModule{
}

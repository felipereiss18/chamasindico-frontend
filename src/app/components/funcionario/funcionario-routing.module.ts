import {RouterModule, Routes} from "@angular/router";
import {ListaFuncionarioComponent} from "./lista/lista-funcionario.component";
import {NgModule} from "@angular/core";
import {FormularioFuncionarioComponent} from "./formulario/formulario-funcionario.component";

export const routes: Routes = [
  {
    path: '',
    component: ListaFuncionarioComponent
  },
  {
    path: 'adicionar',
    component: FormularioFuncionarioComponent,
    data: {tipo: 1, title: 'Cadastrar'}
  },
  {
    path: 'editar/:id',
    component: FormularioFuncionarioComponent,
    data: {tipo: 2, title: 'Alterar'}
  },
  {
    path: 'detalhar/:id',
    component: FormularioFuncionarioComponent,
    data: {tipo: 3, title: 'Visualizar'}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionarioRoutingModule {}

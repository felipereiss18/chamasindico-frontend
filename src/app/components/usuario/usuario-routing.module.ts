import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ListaUsuarioComponent} from "./lista/lista-usuario.component";
import {FormularioUsuarioAdministradorComponent} from "./formulario/administrador/formulario-usuario-administrador.component";


export const routes: Routes = [
  {
    path: '',
    component: ListaUsuarioComponent
  },
  {
    path: 'adicionar',
    component: FormularioUsuarioAdministradorComponent,
    data: {tipo: 1, title: 'Cadastrar'}
  },
  {
    path: 'editar/:id',
    component: FormularioUsuarioAdministradorComponent,
    data: {tipo: 2, title: 'Alterar'}
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }

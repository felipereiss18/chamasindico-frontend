import {RouterModule, Routes} from "@angular/router";
import {ListaComunicadoComponent} from "./lista/lista-comunicado.component";
import {NgModule} from "@angular/core";
import {FormularioComunicadoComponent} from "./formulario/formulario-comunicado.component";

export const routes: Routes =[
  {
    path: '',
    component: ListaComunicadoComponent
  },
  {
    path: 'adicionar',
    component: FormularioComunicadoComponent,
    data: {tipo: 1, title: 'Cadastrar'}
  },
  {
    path: 'editar/:id',
    component: FormularioComunicadoComponent,
    data: {tipo: 2, title: 'Alterar'}
  },
  {
    path: 'detalhar/:id',
    component: FormularioComunicadoComponent,
    data: {tipo: 3, title: 'Visualizar'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComunicadoRouting {}

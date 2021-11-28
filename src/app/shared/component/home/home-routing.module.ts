import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./commons/home.component";
import {NgModule} from "@angular/core";
import {AuthGuard} from "../../../core/auth/auth.guard";

const homeRoute: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('../../../components/tela-inicial/tela-inicial.module').then(m => m.TelaInicialModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'condominio',
        loadChildren: () => import('../../../components/condominio/condominio.module')
          .then(m => m.CondominioModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'usuario',
        loadChildren: () => import('../../../components/usuario/usuario.module')
          .then(m => m.UsuarioModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'area-comum',
        loadChildren: () => import('../../../components/area-comum/area-comum.module')
          .then(m => m.AreaComumModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'unidade',
        loadChildren: () => import('../../../components/unidade/unidade.module')
          .then(m => m.UnidadeModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'funcionario',
        loadChildren: () => import('../../../components/funcionario/funcionario.module')
          .then(m => m.FuncionarioModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'comunicado',
        loadChildren: () => import('../../../components/comunicado/comunicado.module')
          .then(m => m.ComunicadoModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'correspondencia',
        loadChildren: () => import('../../../components/correspondencia/correspondencia.module')
          .then(m => m.CorrespondenciaModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'ocorrencia',
        loadChildren: () => import('../../../components/ocorrencia/ocorrencia.module')
          .then(m => m.OcorrenciaModule),
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(homeRoute)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}

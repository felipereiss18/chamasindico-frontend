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

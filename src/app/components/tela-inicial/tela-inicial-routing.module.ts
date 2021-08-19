import {RouterModule, Routes} from "@angular/router";
import {TelaInicialComponent} from "./common/tela-inicial/tela-inicial.component";
import {NgModule} from "@angular/core";

export const routes: Routes = [
  {
    path: '',
    component: TelaInicialComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TelaInicialRoutingModule{
}

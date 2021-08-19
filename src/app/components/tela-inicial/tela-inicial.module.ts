import {NgModule} from "@angular/core";
import {TelaInicialComponent} from "./common/tela-inicial/tela-inicial.component";
import {TelaInicialRoutingModule} from "./tela-inicial-routing.module";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";
import {NgxMaskModule} from "ngx-mask";
import {NgxEditorModule} from "ngx-editor";
import {MatDatepickerModule} from "@angular/material/datepicker";

@NgModule({
  declarations: [
    TelaInicialComponent
  ],
  imports: [
    TelaInicialRoutingModule,
    CommonModule,
    SharedModule,
    NgxMaskModule.forRoot({}),
    NgxEditorModule,
    MatDatepickerModule
  ],
})
export class TelaInicialModule {

}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {NgxMaskModule} from "ngx-mask";
import {NgxEditorModule} from "ngx-editor";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {UsuarioRoutingModule} from "./usuario-routing.module";
import { ListaUsuarioComponent } from './lista/lista-usuario.component';
import { FormularioUsuarioAdministradorComponent } from './formulario/administrador/formulario-usuario-administrador.component';


@NgModule({
  declarations: [
    ListaUsuarioComponent,
    FormularioUsuarioAdministradorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxMaskModule.forRoot({}),
    NgxEditorModule,
    FontAwesomeModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }

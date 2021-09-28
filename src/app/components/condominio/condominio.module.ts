import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {NgxMaskModule} from "ngx-mask";
import {NgxEditorModule} from "ngx-editor";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { ListaCondominioComponent } from './lista/lista-condominio.component';
import {CondominioRoutingModule} from "./condominio-routing.module";
import { FormularioCondominioComponent } from './formulario/formulario-condominio.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@NgModule({
  declarations: [
    ListaCondominioComponent,
    FormularioCondominioComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        NgxMaskModule.forRoot({}),
        NgxEditorModule,
        MatDatepickerModule,
        CondominioRoutingModule,
        FontAwesomeModule,
        MatSlideToggleModule,
    ]
})
export class CondominioModule { }

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {NgxMaskModule} from "ngx-mask";
import {NgxEditorModule} from "ngx-editor";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {OcorrenciaRoutingModule} from "./ocorrencia-routing.module";
import { ListaOcorrenciaComponent } from './lista/lista-ocorrencia.component';
import { FormularioOcorrenciaComponent } from './formulario/formulario-ocorrencia.component';
import { MuralOcorrenciaComponent } from './mural/mural-ocorrencia.component';

@NgModule({
    declarations: [
        ListaOcorrenciaComponent,
        FormularioOcorrenciaComponent,
        MuralOcorrenciaComponent
    ],
    exports: [
        MuralOcorrenciaComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        NgxMaskModule.forRoot({}),
        NgxEditorModule,
        MatDatepickerModule,
        FontAwesomeModule,
        MatSlideToggleModule,
        OcorrenciaRoutingModule,
    ]
})
export class OcorrenciaModule { }

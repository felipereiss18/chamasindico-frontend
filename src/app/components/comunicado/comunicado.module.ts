import {NgModule} from "@angular/core";
import {ListaComunicadoComponent} from "./lista/lista-comunicado.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";
import {NgxMaskModule} from "ngx-mask";
import {NgxEditorModule} from "ngx-editor";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {ComunicadoRoutingModule} from "./comunicado-routing.module";
import { FormularioComunicadoComponent } from './formulario/formulario-comunicado.component';
import { AtivoComunicadoComponent } from './ativo-comunicado/ativo-comunicado.component';

@NgModule({
    declarations: [
        ListaComunicadoComponent,
        FormularioComunicadoComponent,
        AtivoComunicadoComponent
    ],
    exports: [
        AtivoComunicadoComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        NgxMaskModule.forRoot({}),
        NgxEditorModule,
        MatDatepickerModule,
        FontAwesomeModule,
        MatSlideToggleModule,
        ComunicadoRoutingModule,
    ]
})
export class ComunicadoModule {

}

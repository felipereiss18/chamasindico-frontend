import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, CurrencyPipe, registerLocaleData} from '@angular/common';
import {AppMaterialModule} from "../components/app-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxMaskModule} from "ngx-mask";
import {NgxEditorModule} from "ngx-editor";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material/snack-bar";
import localePT from '@angular/common/locales/pt';

registerLocaleData(localePT, 'pt-BR');

@NgModule({
  declarations: [

  ],
  exports: [
    AppMaterialModule
    , FormsModule
    , ReactiveFormsModule
  ],
  imports: [
    FormsModule
    , ReactiveFormsModule
    , CommonModule
    , AppMaterialModule
    , NgxMaskModule.forRoot({})
    , NgxEditorModule
  ],
  entryComponents: [
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt-BR'}
    , CurrencyPipe
    , {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
  ]
})
export class SharedModule {
}
import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, CurrencyPipe, registerLocaleData} from '@angular/common';
import {AppMaterialModule} from "../components/app-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxMaskModule} from "ngx-mask";
import {NgxEditorModule} from "ngx-editor";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material/snack-bar";
import localePT from '@angular/common/locales/pt';
import {ConfirmDialogComponent} from './component/confirm-dialog/confirm-dialog.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {APP_DATE_FORMATS, AppDateAdapter} from "./adapter/AppDateAdapter";
import {VisualizarDialogComponent} from "./component/visualizar-dialog/visualizar-dialog.component";
import { ConfirmInputDialogComponent } from './component/confirm-input-dialog/confirm-input-dialog.component';

registerLocaleData(localePT, 'pt-BR');

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    VisualizarDialogComponent,
    ConfirmInputDialogComponent
  ],
  exports: [
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogComponent,
    VisualizarDialogComponent
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
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class SharedModule {
}

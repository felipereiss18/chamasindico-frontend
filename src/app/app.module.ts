import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from "./core/core.module";
import {LoginComponent} from "./components/login/login.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppMaterialModule} from "./components/app-material.module";
import {IConfig, NgxMaskModule} from "ngx-mask";
import {NgxEditorModule} from "ngx-editor";
import {AppRoutingModule} from "./app-routing.module";
import {AuthGuard} from "./core/auth/auth.guard";
import {HomeModule} from "./shared/component/home/home.module";
import {NgxSpinnerModule} from "ngx-spinner";
import {SnotifyModule, SnotifyService, ToastDefaults} from "ng-snotify";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    FontAwesomeModule,
    CoreModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    HomeModule,
    NgxMaskModule.forRoot(maskConfig),
    NgxEditorModule,
    NgxSpinnerModule,
    SnotifyModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AuthGuard,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

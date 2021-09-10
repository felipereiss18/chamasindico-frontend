import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./commons/home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {AppMaterialModule} from "../../../components/app-material.module";
import {MenuComponent} from './menu/menu.component';
import {HeaderComponent} from "./header/header.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {LoadingBarRouterModule} from "@ngx-loading-bar/router";
import {LoadingBarModule} from "@ngx-loading-bar/core";

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    MenuComponent
  ],
    imports: [
        HomeRoutingModule,
        CommonModule,
        AppMaterialModule,
        FontAwesomeModule,
        LoadingBarRouterModule,
        LoadingBarModule,
    ]
})
export class HomeModule { }

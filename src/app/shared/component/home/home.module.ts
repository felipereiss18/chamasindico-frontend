import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./commons/home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {AppMaterialModule} from "../../../components/app-material.module";
import {MenuComponent} from './menu/menu.component';
import {HeaderComponent} from "./header/header.component";

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
  ]
})
export class HomeModule { }

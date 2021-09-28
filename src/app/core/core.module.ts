import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {RequestInterceptor} from "./interceptors/request.interceptor";
import {LoadingRequestInterceptor} from "./interceptors/loading-request.interceptor";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingRequestInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }

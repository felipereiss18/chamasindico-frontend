import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {finalize} from "rxjs/operators";
import {NgxSpinnerService} from "ngx-spinner";

@Injectable()
export class LoadingRequestInterceptor implements HttpInterceptor {

  private totalRequests = 0;

  constructor(private spinnerService: NgxSpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    this.spinnerService.show('global').then(r => r);

    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.spinnerService.hide('global').then(r => r);
        }
      })
    )
  }
}

import {CrudService} from "./crud-service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {ResponseDto} from "../interfaces/response-dto.interface";

export class BaseService<T, ID> extends CrudService<T, ID> {

  constructor(baseUrl: string, http: HttpClient) {
    super(baseUrl, http);
  }

  get(urlComplemento?: string, options?: { headers: HttpHeaders, params?: HttpParams }) {
    this.resolveOptions(options);
    const complemento = urlComplemento !== undefined ? urlComplemento : '';

    return this.http
      .get<ResponseDto<T>>(this.base + complemento, options)
      .pipe(
        catchError(this.handleError));
  }

  getParam(urlComplemento?: string, options?: { params?: HttpParams }) {
    this.resolveOptions(options);
    const complemento = urlComplemento !== undefined ? urlComplemento : '';
    return this.http
      .get<ResponseDto<T>>(this.base + complemento, options)
      .pipe(
        catchError(this.handleError));
  }

  gets(urlComplemento?: string, options?: { headers: HttpHeaders }) {
    this.resolveOptions(options);
    const complemento = urlComplemento !== undefined ? urlComplemento : '';
    return this.http.get<ResponseDto<T[]>>(this.base + complemento, options).pipe(
      catchError(this.handleError));
  }

  post(t: T, urlComplemento?: string, options?: { headers: HttpHeaders }) {
    this.resolveOptions(options);
    const complemento = urlComplemento !== undefined ? urlComplemento : '';
    return this.http.post(this.base + complemento, t, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  private resolveOptions(options: { params?: HttpParams | undefined; } | { headers: HttpHeaders; } | undefined) {
    if (options === null) {
      this.options = options;
    }
  }

}

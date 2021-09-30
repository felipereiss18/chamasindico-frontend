import { Injectable } from '@angular/core';
import {BaseService} from "../base-service";
import {Perfil} from "../../core/auth/user/perfil";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ResponseDto} from "../../interfaces/response-dto.interface";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PerfilService extends BaseService<Perfil, number>{

  constructor(http: HttpClient) {
    super(environment.api+'perfil', http)
  }

  public buscarPorRole(role: string): Observable<ResponseDto<Perfil>> {
    return this.http.get<ResponseDto<Perfil>>(`${this.base}/role/${role}`, this.options)
      .pipe(catchError(this.handleError));
  }
}

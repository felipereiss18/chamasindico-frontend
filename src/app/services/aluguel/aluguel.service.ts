import { Injectable } from '@angular/core';
import {BaseService} from "../base-service";
import {Inquilino} from "../../models/inquilino";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ResponseDto} from "../../interfaces/response-dto.interface";
import {Aluguel} from "../../models/aluguel";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AluguelService extends BaseService<Inquilino, number>{

  constructor(http: HttpClient) {
    super(environment.api+'aluguel', http)
  }

  salvar(condominio: number, bloco: string, unidade: number, aluguel: Aluguel): Observable<ResponseDto<any>>{
    return this.http.post<ResponseDto<any>>(`${this.base}/${condominio}/${bloco}/${unidade}`, aluguel, this.options)
      .pipe(catchError(this.handleError));
  }

  editar(condominio: number, bloco: string, unidade: number, id: number | undefined, aluguel: Aluguel): Observable<ResponseDto<any>> {
    return this.http.put<ResponseDto<any>>(`${this.base}/${condominio}/${bloco}/${unidade}/${id}`, aluguel, this.options)
      .pipe(catchError(this.handleError));
  }
}

import { Injectable } from '@angular/core';
import {BaseService} from "../base-service";
import {Funcionario} from "../../models/funcionario";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ResponsePagination} from "../../interfaces/response-pagination.interface";
import {FuncionarioPesqReq, FuncionarioPesqResp} from "../../interfaces/pesquisa/funcionario-pesquisa";
import {catchError} from "rxjs/operators";
import {ResponseDto} from "../../interfaces/response-dto.interface";

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService extends BaseService<Funcionario, number>{

  constructor(http: HttpClient) {
    super(environment.api+'funcionario', http);
  }

  public pesquisar(dado: FuncionarioPesqReq): Observable<ResponsePagination<FuncionarioPesqResp>> {
    const optionPost = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      paramns: new HttpParams().set('size', '0').set('page', '10')
    }

    return this.http.post<ResponsePagination<FuncionarioPesqResp>>(`${this.base}/pesquisar`, dado, optionPost)
      .pipe(catchError(this.handleError));
  }

}

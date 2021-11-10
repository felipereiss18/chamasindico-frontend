import {Injectable} from '@angular/core';
import {BaseService} from "../base-service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Unidade} from "../../models/unidade";
import {Condominio} from "../../models/condominio";
import {Observable} from "rxjs";
import {ResponsePagination} from "../../interfaces/response-pagination.interface";
import {catchError} from "rxjs/operators";
import {UnidadePesquisaDto} from "../../interfaces/pesquisa/unidade-pesquisa-dto";
import {ResponseDto} from "../../interfaces/response-dto.interface";
import {Aluguel} from "../../models/aluguel";

export interface UnidadePesquisa {
  idBloco: string;
  idCondominio: number;
  unidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class UnidadeService extends BaseService<Unidade, number>{

  constructor(http: HttpClient) {
    super(environment.api+'unidade', http);
  }

  pesquisar(dado: UnidadePesquisa): Observable<ResponsePagination<UnidadePesquisaDto>> {

    const optionPost = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      paramns: new HttpParams().set('size', '0').set('page', '10')
    }

    return this.http.post<ResponsePagination<UnidadePesquisaDto>>(this.base + '/pesquisar', dado, optionPost)
      .pipe(catchError(this.handleError));
  }

  buscarAlugueis(condominio: number, bloco: string, unidade: number): Observable<ResponseDto<Aluguel[]>> {
    return this.http.get<ResponseDto<Aluguel[]>>(`${this.base}/${condominio}/${bloco}/${unidade}/alugueis`)
      .pipe(catchError(this.handleError));
  }
}

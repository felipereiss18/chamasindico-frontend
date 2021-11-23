import {Injectable} from '@angular/core';
import {BaseService} from "../base-service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Unidade} from "../../models/unidade";
import {Observable} from "rxjs";
import {ResponsePagination} from "../../interfaces/response-pagination.interface";
import {catchError} from "rxjs/operators";
import {UnidadePesquisaDto} from "../../interfaces/pesquisa/unidade-pesquisa-dto";
import {ResponseDto} from "../../interfaces/response-dto.interface";
import {Aluguel} from "../../models/aluguel";
import {Garagem} from "../../models/Garagem";

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
    return this.http.get<ResponseDto<Aluguel[]>>(`${this.base}/${condominio}/${bloco}/${unidade}/alugueis`, this.options)
      .pipe(catchError(this.handleError));
  }

  buscarGaragem(condominio: number, bloco: string, unidade: number): Observable<ResponseDto<Garagem>> {
    return this.http.get<ResponseDto<Garagem>>(`${this.base}/${condominio}/${bloco}/${unidade}/garagem`, this.options)
      .pipe(catchError(this.handleError));
  }

  salvarGaragem(condominio: number, bloco: string, unidade: number, garagem: Garagem): Observable<ResponseDto<any>> {
    return this.http.put<ResponseDto<any>>(`${this.base}/${condominio}/${bloco}/${unidade}/garagem`, garagem, this.options)
      .pipe(catchError(this.handleError));
  }

  buscarPorCondominoBloco(condominio: number, bloco: string): Observable<ResponseDto<Unidade[]>> {
    return this.http.get<ResponseDto<Unidade[]>>(`${this.base}/${condominio}/${bloco}/listar`, this.options)
      .pipe(catchError(this.handleError))
  }
}

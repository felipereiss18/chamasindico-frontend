import {Injectable} from '@angular/core';
import {Condominio} from "../../models/condominio";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Estado} from "../../models/estado";
import {Observable} from "rxjs";
import {ResponseDto} from "../../interfaces/response-dto.interface";
import {ResponsePagination} from "../../interfaces/response-pagination.interface";
import {catchError} from "rxjs/operators";
import {BaseService} from "../base-service";
import {Bloco} from "../../models/bloco";
import {Proprietario} from "../../models/proprietario";

interface CondominioPesquisa {
    cidade: string | undefined,
    estado: Estado | undefined,
    nome: string | undefined,
    situacao: boolean | undefined
}

@Injectable({
  providedIn: 'root'
})
export class CondominioService extends BaseService<Condominio, number>{

  constructor(http: HttpClient) {
    super(environment.api+'condominio', http)
  }

  pesquisar(condominio: Condominio): Observable<ResponsePagination<Condominio>> {

    const condPesq = {} as CondominioPesquisa;
    condPesq.nome = condominio.nome;
    condPesq.estado = condominio.estado;
    condPesq.cidade = condominio.cidade;
    condPesq.situacao = condominio.situacao;

    const optionPost = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      paramns: new HttpParams().set('size', '0').set('page', '10')
    }

    return this.http.post<ResponsePagination<Condominio>>(this.base + '/pesquisar', condPesq, optionPost)
      .pipe(catchError(this.handleError));
  }

  alterarSituacao(id: number, situacao: boolean): Observable<ResponseDto<any>> {
    return this.http.patch<ResponseDto<any>>(`${this.base}/${id}/situacao`, situacao, this.options)
      .pipe(catchError(this.handleError));
  }

  buscarBlocos(id: number): Observable<ResponseDto<Bloco[]>> {
    return this.http.get<ResponseDto<Bloco[]>>(`${this.base}/${id}/blocos`, this.options)
      .pipe(catchError(this.handleError));
  }

  buscarSindico(id: number): Observable<ResponseDto<Proprietario>> {
    return this.http.get<ResponseDto<Proprietario>>(`${this.base}/${id}/sindico`, this.options)
      .pipe(catchError(this.handleError));
  }
}

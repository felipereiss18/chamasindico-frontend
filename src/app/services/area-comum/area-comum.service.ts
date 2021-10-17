import {Injectable} from '@angular/core';
import {BaseService} from "../base-service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AreaComum} from "../../models/area-comum";
import {Observable} from "rxjs";
import {Time} from "@angular/common";
import {ResponsePagination} from "../../interfaces/response-pagination.interface";
import {catchError} from "rxjs/operators";
import {ResponseDto} from "../../interfaces/response-dto.interface";


interface AreaComumPesqReq {
  nome: string | undefined,
  locacao: boolean | undefined,
  tipoReserva: number | undefined,
  tipoConfirmacao: number | undefined;
  situacao: boolean | undefined;
}

export interface AreaComumPesqResp {
  id: number;
  bloco: string;
  nome: string;
  locacao: boolean;
  tipoReserva: string;
  tipoConfirmacao: string;
  diasFuncionamento: number[];
  inicial: Time,
  fim: Time,
  situacao: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AreaComumService extends BaseService<AreaComum, number>{

  constructor(http: HttpClient) {
    super(environment.api+'area-comum', http)
  }

  pesquisar(areaComum: AreaComum): Observable<ResponsePagination<AreaComumPesqResp>>{

    const data = {} as AreaComumPesqReq;
    data.nome = areaComum.nome;
    data.locacao = areaComum.locacao;
    data.tipoReserva = areaComum.tipoReserva;
    data.tipoConfirmacao = areaComum.tipoConfirmacao;
    data.situacao = areaComum.situacao;

    const optionPost = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      paramns: new HttpParams().set('size', '0').set('page', '10')
    }

    return this.http.post<ResponsePagination<AreaComumPesqResp>>(`${this.base}/pesquisa`, data, optionPost)
      .pipe(catchError(this.handleError));
  }

  alterarSituacao(id: number, situacao: boolean): Observable<ResponseDto<any>> {
    return this.http.patch<ResponseDto<any>>(`${this.base}/${id}/situacao`, situacao, this.options)
      .pipe(catchError(this.handleError));
  }
}

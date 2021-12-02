import {Injectable} from '@angular/core';
import {CrudService} from "../crud-service";
import {Ocorrencia} from "../../models/Ocorrencia";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ResponsePagination} from "../../interfaces/response-pagination.interface";
import {catchError} from "rxjs/operators";
import {OcorrenciaPesqReq, OcorrenciaPesqResp} from "../../interfaces/pesquisa/ocorrencia-pesquisa";
import {ResponseDto} from "../../interfaces/response-dto.interface";
import {SituacaoOcorrencia} from "../../models/SituacaoOcorrencia";
import {EstatisticaOcorrencia} from "../../interfaces/relatorio/relatorio-ocorrencia.interface";

@Injectable({
  providedIn: 'root'
})
export class OcorrenciaService extends CrudService<Ocorrencia, number>{

  constructor(http: HttpClient) {
    super(environment.api+'ocorrencia', http);
  }

  public pesquisar(dado: OcorrenciaPesqReq): Observable<ResponsePagination<OcorrenciaPesqResp>> {
    const optionPost = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      paramns: new HttpParams().set('size', '0').set('page', '10')
    }

    return this.http.post<ResponsePagination<OcorrenciaPesqResp>>(`${this.base}/pesquisar`, dado, optionPost)
      .pipe(catchError(this.handleError));
  }

  public buscarSituacoes(): Observable<ResponseDto<SituacaoOcorrencia[]>> {
    return this.http.get<ResponseDto<SituacaoOcorrencia[]>>(`${this.base}/situacoes`, this.options)
      .pipe(catchError(this.handleError));
  }

  public colocarEmAnalise(id: number): Observable<ResponseDto<any>> {
    return this.http.patch<ResponseDto<any>>(`${this.base}/${id}/analisar`, null, this.options)
      .pipe(catchError(this.handleError));
  }

  public concluir(id: number, resposta: string): Observable<ResponseDto<any>> {
    return this.http.patch<ResponseDto<any>>(`${this.base}/${id}/concluir`, resposta, this.options)
      .pipe(catchError(this.handleError));
  }

  public buscarMinhas(): Observable<ResponseDto<Ocorrencia[]>> {
    return this.http.get<ResponseDto<Ocorrencia[]>>(`${this.base}/minhas`, this.options)
      .pipe(catchError(this.handleError));
  }

  public buscarAbertaAnalise(): Observable<ResponseDto<Ocorrencia[]>> {
    return this.http.get<ResponseDto<Ocorrencia[]>>(`${this.base}/aberta-analise`, this.options)
      .pipe(catchError(this.handleError));
  }

  public buscarParaMim(): Observable<ResponseDto<Ocorrencia[]>> {
    return this.http.get<ResponseDto<Ocorrencia[]>>(`${this.base}/para-mim`, this.options)
      .pipe(catchError(this.handleError));
  }

  public relatorioTipo(inicio: Date | undefined, fim: Date | undefined): Observable<ResponseDto<EstatisticaOcorrencia[]>> {
    const body = {inicio: inicio, fim: fim};
    return this.http.post<ResponseDto<EstatisticaOcorrencia[]>>(`${this.base}/relatorio/tipo`, body, this.options)
      .pipe(catchError(this.handleError));
  }

  public relatorioSituacao(inicio: Date | undefined, fim: Date | undefined): Observable<ResponseDto<EstatisticaOcorrencia[]>> {
    const body = {inicio: inicio, fim: fim};
    return this.http.post<ResponseDto<EstatisticaOcorrencia[]>>(`${this.base}/relatorio/situacao`, body, this.options)
      .pipe(catchError(this.handleError));
  }
}

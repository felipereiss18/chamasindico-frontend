import {Injectable} from '@angular/core';
import {BaseService} from "../base-service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ResponsePagination} from "../../interfaces/response-pagination.interface";
import {catchError} from "rxjs/operators";
import {ComunicadoPesqReq, ComunicadoPesqResp} from "../../interfaces/pesquisa/comunicado-pesquisa";
import {Comunicado} from "../../models/Comunicado";
import {ResponseDto} from "../../interfaces/response-dto.interface";

@Injectable({
  providedIn: 'root'
})
export class ComunicadoService extends BaseService<Comunicado, number>{

  constructor(http: HttpClient) {
    super(environment.api+'comunicado', http);
  }

  public pesquisar(dado: ComunicadoPesqReq): Observable<ResponsePagination<ComunicadoPesqResp>> {
    const optionPost = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      paramns: new HttpParams().set('size', '0').set('page', '10')
    }

    return this.http.post<ResponsePagination<ComunicadoPesqResp>>(`${this.base}/pesquisar`, dado, optionPost)
      .pipe(catchError(this.handleError));
  }

  public enviar(id: number): Observable<ResponseDto<any>> {
    return this.http.post<ResponseDto<any>>(`${this.base}/${id}/enviar`, null, this.options)
      .pipe(catchError(this.handleError))
  }

  public buscarAtivos(): Observable<ResponseDto<ComunicadoPesqResp[]>> {
    return this.http.get<ResponseDto<ComunicadoPesqResp[]>>(`${this.base}/ativos`, this.options)
      .pipe(catchError(this.handleError))
  }
}

import {Injectable} from '@angular/core';
import {CrudService} from "../crud-service";
import {Correspondencia} from "../../models/correspondencia";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ResponsePagination} from "../../interfaces/response-pagination.interface";
import {catchError} from "rxjs/operators";
import {ResponseDto} from "../../interfaces/response-dto.interface";
import {CorrespondenciaPesqReq, CorrespondenciaPesqResp} from "../../interfaces/pesquisa/correspondencia-pesquisa";

@Injectable({
  providedIn: 'root'
})
export class CorrespondenciaService extends CrudService<Correspondencia, number>{

  constructor(http: HttpClient) {
    super(environment.api+'correspondencia', http);
  }

  public pesquisar(dado: CorrespondenciaPesqReq): Observable<ResponsePagination<CorrespondenciaPesqResp>> {
    const optionPost = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      paramns: new HttpParams().set('size', '0').set('page', '10')
    }

    return this.http.post<ResponsePagination<CorrespondenciaPesqResp>>(`${this.base}/pesquisar`, dado, optionPost)
      .pipe(catchError(this.handleError));
  }

  public buscarAtivos(): Observable<ResponseDto<CorrespondenciaPesqResp[]>> {
    return this.http.get<ResponseDto<CorrespondenciaPesqResp[]>>(`${this.base}/ativas`, this.options)
      .pipe(catchError(this.handleError))
  }

  public entregar(id: number): Observable<ResponseDto<any>> {
    return this.http.patch<ResponseDto<any>>(`${this.base}/${id}/entregar`, this.options)
      .pipe(catchError(this.handleError));
  }
}

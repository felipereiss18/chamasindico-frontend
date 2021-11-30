import {Injectable} from '@angular/core';
import {CrudService} from "../crud-service";
import {Visitante} from "../../models/visitante";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ResponsePagination} from "../../interfaces/response-pagination.interface";
import {catchError} from "rxjs/operators";
import {VisitantePesquisa} from "../../interfaces/pesquisa/visitante-pesquisa";
import {ResponseDto} from "../../interfaces/response-dto.interface";
import {Visita} from "../../models/visita";

@Injectable({
  providedIn: 'root'
})
export class VisitanteService extends CrudService<Visitante, string> {

  constructor(http: HttpClient) {
    super(environment.api+'visitante', http);
  }

  public pesquisar(dado: VisitantePesquisa): Observable<ResponsePagination<Visitante>> {
    const optionPost = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      paramns: new HttpParams().set('size', '0').set('page', '10')
    }

    return this.http.post<ResponsePagination<Visitante>>(`${this.base}/pesquisar`, dado, optionPost)
      .pipe(catchError(this.handleError));
  }

  public visitar(documento: string, visita: Visita): Observable<ResponseDto<any>> {
    return this.http.post<ResponseDto<any>>(`${this.base}/${documento}/visitar`, visita, this.options)
      .pipe(catchError(this.handleError));
  }

  public excluirVisita(documento: string, data: Date): Observable<ResponseDto<any>> {
    return this.http.delete<ResponseDto<any>>(`${this.base}/${documento}/visita/${data}`, this.options)
      .pipe(catchError(this.handleError));
  }
}

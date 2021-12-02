import {Injectable} from '@angular/core';
import {CrudService} from "../crud-service";
import {Agenda} from "../../models/agenda";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ResponseDto} from "../../interfaces/response-dto.interface";
import {AgendaPesquisa} from "../../interfaces/pesquisa/agenda-pesquisa";
import {catchError} from "rxjs/operators";
import {EstatisticaAgendamento} from "../../interfaces/relatorio/relatorio.interface";

@Injectable({
  providedIn: 'root'
})
export class AgendaService extends CrudService<Agenda, number>{

  constructor(http: HttpClient) {
    super(environment.api+'agenda', http)
  }

  public buscarPorData(data: Date): Observable<ResponseDto<AgendaPesquisa[]>> {
    const dado: string = data.toISOString().substring(0, data.toISOString().length-1);
    return this.http.get<ResponseDto<AgendaPesquisa[]>>(`${this.base}/${dado}/agendamentos`, this.options)
      .pipe(catchError(this.handleError));
  }

  public confirmar(id: number): Observable<ResponseDto<any>> {
    return this.http.patch<ResponseDto<any>>(`${this.base}/${id}/confirmar`, null, this.options)
      .pipe(catchError(this.handleError));
  }

  public buscarConfirmacaoPendente(): Observable<ResponseDto<AgendaPesquisa[]>> {
    return this.http.get<ResponseDto<AgendaPesquisa[]>>(`${this.base}/confirmacao-pendente`, this.options)
      .pipe(catchError(this.handleError));
  }

  public relatorioAreaComum(inicio: Date | undefined, fim: Date | undefined): Observable<ResponseDto<EstatisticaAgendamento[]>> {
    const body = {inicio: inicio, fim: fim};
    return this.http.post<ResponseDto<EstatisticaAgendamento[]>>(`${this.base}/relatorio/area-comum`, body, this.options)
      .pipe(catchError(this.handleError));
  }
}

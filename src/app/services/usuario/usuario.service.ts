import {Injectable} from "@angular/core";
import {BaseService} from "../base-service";
import {Usuario} from "../../models/usuario";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ResponsePagination} from "../../interfaces/response-pagination.interface";
import {catchError} from "rxjs/operators";
import {Perfil} from "../../core/auth/user/perfil";
import {ResponseDto} from "../../interfaces/response-dto.interface";

export interface UsuarioPesquisa {
  usuario: string;
  situacao: string;
  perfil: Perfil;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseService<Usuario, number> {

  constructor(http: HttpClient) {
    super(environment.api+'usuario', http)
  }

  pesquisar(usuario: UsuarioPesquisa): Observable<ResponsePagination<Usuario>> {

    const optionPost = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      paramns: new HttpParams().set('size', '0').set('page', '10')
    }

    return this.http.post<ResponsePagination<Usuario>>(this.base + '/pesquisar', usuario, optionPost)
      .pipe(catchError(this.handleError));
  }

  alterarSituacao(id: number, situacao: boolean): Observable<ResponseDto<any>> {
    return this.http.patch<ResponseDto<any>>(`${this.base}/${id}/situacao`, situacao, this.options)
      .pipe(catchError(this.handleError));
  }
}

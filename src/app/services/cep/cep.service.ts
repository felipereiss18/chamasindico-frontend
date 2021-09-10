import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {BaseService} from "../base-service";

interface Endereco {
  cep: string,
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,
  ibge: string,
  gia: string,
  ddd: string,
  siafi: string
}

@Injectable({
  providedIn: 'root'
})
export class CepService extends BaseService<Endereco, string>{

  constructor(
    http: HttpClient
  ) {
    super(environment.apiCep, http);
  }

  getCep(cep: string): Observable<Endereco> {

    cep = cep.replace('-', '').trim();

    return this.http.get<Endereco>(`${this.base}${cep}/json`).pipe(catchError(this.handleError));
  }
}
